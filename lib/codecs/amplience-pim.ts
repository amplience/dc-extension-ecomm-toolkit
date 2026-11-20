import {
    Category,
    CodecPropertyConfig,
    CommerceAPI,
    CommerceCodec,
    CommerceCodecType,
    CommonArgs,
    GetProductsArgs,
    Identifiable,
    Product,
    getCodecs,
    getProductsArgError,
    mapIdentifiers,
    registerCodec
} from '@amplience/dc-integration-middleware'

const API_URL = 'https://api.amplience.net/v2/content'
const FACET_PAGE_SIZE = 100
const FETCH_BATCH_SIZE = 10

/**
 * The picker keeps every product in memory, so the catalogue is capped.
 * Amplience PIM is intended for small catalogues.
 */
export const MAX_PRODUCTS = 200

/**
 * The part of the extension SDK's `client` this codec needs. It makes
 * Management API requests as the logged-in user.
 */
export interface AmplienceClient {
    request(config: {
        url: string
        method: any
        data?: any
        headers?: any
    }): Promise<{ status: number; data: any }>
}

type Entry = {
    product: Product
    /** Lower-cased text that keyword search matches against. */
    text: string
}

/** The first value of a localized-value field. */
const firstValue = (field: any): string => field?.values?.[0]?.value ?? ''

const mapImage = (media: any): { url: string } | null => {
    if (media?.mediaType === 'DynamicImage') {
        const image = media.image?.image
        if (image?.defaultHost && image?.endpoint && image?.name) {
            return {
                url: `https://${image.defaultHost}/i/${image.endpoint}/${encodeURIComponent(image.name)}`
            }
        }
        return null
    }

    return media?.image?.src ? { url: media.image.src } : null
}

const mapCategory = (id: string): Category => ({
    id,
    name: id,
    slug: id,
    children: [],
    products: [],
    showInMenu: true
})

/**
 * Map the body of a Frontend Starter Product content item to a product.
 * The SKU is used as the product ID, so that is what the picker stores.
 */
export const toEntry = (body: any): Entry | null => {
    const sku: string = body?.sku
    if (!sku) {
        return null
    }

    const name = firstValue(body.name)
    const price = body.prices?.[0]
    const formattedPrice = price ? `${price.amount}` : ''
    const images = (body.images ?? []).map(mapImage).filter(Boolean)
    const categories: string[] = body.categories ?? []

    const product: Product = {
        id: sku,
        name,
        slug: body._meta?.deliveryKeys?.values?.[0]?.value ?? sku,
        shortDescription: firstValue(body.shortDescription),
        categories: categories.map(mapCategory),
        variants: [
            {
                id: sku,
                sku,
                listPrice: formattedPrice,
                salePrice: formattedPrice,
                defaultImage: images[0],
                images,
                attributes: {}
            }
        ]
    }

    const text = [name, sku, body.brand, ...(body.tags ?? []), ...categories]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

    return { product, text }
}

/** Return one page of a list, and report the total back through the arguments. */
const getPage = (list: Product[], args: GetProductsArgs): Product[] => {
    const pageSize = Number(args.pageSize ?? 20)
    const pageNum = Number(args.pageNum ?? 0)

    args.pageSize = pageSize
    args.pageNum = pageNum
    args.total = list.length

    return list.slice(pageNum * pageSize, (pageNum + 1) * pageSize)
}

/**
 * Commerce codec type for Amplience PIM: products authored in Amplience as
 * Frontend Starter `Product` content items.
 */
export class AmplienceCommerceCodecType extends CommerceCodecType {
    constructor(private client: AmplienceClient, private hubId: string) {
        super()
    }

    get vendor(): string {
        return 'amplience'
    }

    get properties() {
        return {
            productSchemaUri: {
                title: 'Product content type schema URI',
                type: 'string' as const
            }
        }
    }

    async getApi(config: CodecPropertyConfig<any>): Promise<CommerceAPI> {
        return await new AmplienceCommerceCodec(config, this.client, this.hubId).init(this)
    }
}

/**
 * Commerce codec for Amplience PIM. Loads the hub's active Product content
 * items once, then searches them in memory.
 */
export class AmplienceCommerceCodec extends CommerceCodec {
    private entries: Entry[] = []

    constructor(config: CodecPropertyConfig<any>, private client: AmplienceClient, private hubId: string) {
        super(config)
    }

    private async request(method: string, url: string, data?: any): Promise<any> {
        const response = await this.client.request({
            url,
            method,
            data,
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.status >= 400) {
            throw new Error(`Amplience request failed (HTTP ${response.status}): ${url}`)
        }

        return typeof response.data === 'string' ? JSON.parse(response.data) : response.data
    }

    private async fetchProductIds(): Promise<string[]> {
        const query = `contentType:"${(this.config as any).productSchemaUri}" status:"ACTIVE"`
        const ids: string[] = []

        for (let page = 0; ; page++) {
            const result = await this.request(
                'POST',
                `${API_URL}/hubs/${this.hubId}/content-items/facet?query=${encodeURIComponent(query)}&size=${FACET_PAGE_SIZE}&page=${page}&sort=label,asc`,
                { returnEntities: true, fields: [{ facetAs: 'ENUM', field: 'schema', name: 'schema' }] }
            )

            if (result.page.totalElements > MAX_PRODUCTS) {
                throw new Error(
                    `Amplience PIM supports up to ${MAX_PRODUCTS} products, but this hub has ${result.page.totalElements}.`
                )
            }

            ids.push(...(result._embedded?.['content-items'] ?? []).map((item: any) => item.id))

            if (page + 1 >= result.page.totalPages) {
                return ids
            }
        }
    }

    /**
     * @inheritdoc
     */
    async cacheCategoryTree(): Promise<void> {
        const ids = await this.fetchProductIds()
        const entries: Entry[] = []

        // The facet response has no item bodies, so fetch them in small batches.
        for (let i = 0; i < ids.length; i += FETCH_BATCH_SIZE) {
            const items = await Promise.all(
                ids.slice(i, i + FETCH_BATCH_SIZE).map((id) => this.request('GET', `${API_URL}/content-items/${id}`))
            )

            for (const item of items) {
                const entry = toEntry(item.body)
                if (entry) {
                    entries.push(entry)
                }
            }
        }

        this.entries = entries

        // Categories are plain strings with no hierarchy, so the tree is flat.
        const categoryIds: string[] = []
        entries.forEach((entry) =>
            entry.product.categories.forEach((category) => {
                if (!categoryIds.includes(category.id)) {
                    categoryIds.push(category.id)
                }
            })
        )

        this.categoryTree = categoryIds.sort().map(mapCategory)
    }

    /**
     * @inheritdoc
     */
    async getProducts(args: GetProductsArgs): Promise<Product[]> {
        await this.ensureCategoryTree()

        const products = this.entries.map((entry) => entry.product)

        if (args.productIds) {
            return mapIdentifiers(args.productIds.split(','), products)
        } else if (args.keyword) {
            const terms = args.keyword.toLowerCase().split(/\s+/)
            return getPage(
                this.entries
                    .filter((entry) => terms.every((term) => entry.text.includes(term)))
                    .map((entry) => entry.product),
                args
            )
        } else if (args.category) {
            return getPage(
                products.filter((product) => product.categories.some((category) => category.id === args.category.id)),
                args
            )
        }

        throw getProductsArgError('getProducts')
    }

    /**
     * @inheritdoc
     */
    async getRawProducts(args: GetProductsArgs): Promise<any[]> {
        return await this.getProducts(args)
    }

    /**
     * @inheritdoc
     */
    async getCustomerGroups(args: CommonArgs): Promise<Identifiable[]> {
        return []
    }
}

/**
 * Make the `amplience` vendor available. It needs the extension SDK's client,
 * so it cannot be registered by the middleware itself.
 */
export const registerAmplienceCodec = (client: AmplienceClient, hubId: string) => {
    if (!getCodecs().some((codec) => codec.vendor === 'amplience')) {
        registerCodec(new AmplienceCommerceCodecType(client, hubId))
    }
}
