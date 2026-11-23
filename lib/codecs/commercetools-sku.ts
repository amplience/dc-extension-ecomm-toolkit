import type { CommerceAPI, GetProductsArgs, Product } from '@amplience/dc-integration-middleware'

/** CommerceTools allows up to 500 results per request; stay well inside the URL limit too. */
const SKU_BATCH_SIZE = 100

/** The parts of the commercetools codec's raw product projection this module reads. */
type RawVariant = { sku?: string }
type RawProduct = { masterVariant: RawVariant; variants: RawVariant[] }

const quote = (value: string) => `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`

/**
 * Finds the products that contain each SKU, in the order of `skus`, with `null` for
 * a SKU that matches nothing. Each result is narrowed to the one variant that has
 * the SKU, so the codec maps it exactly as it would a single-variant product.
 */
const findBySku = async (codec: any, skus: string[]): Promise<(RawProduct | null)[]> => {
    const found: RawProduct[] = []

    for (let i = 0; i < skus.length; i += SKU_BATCH_SIZE) {
        const batch = skus.slice(i, i + SKU_BATCH_SIZE)
        const filter = `filter=variants.sku:${batch.map(quote).join(',')}`
        found.push(
            ...(await codec.fetch(
                `/product-projections/search?${filter}&limit=${batch.length}`
            ))
        )
    }

    return skus.map((sku) => {
        for (const product of found) {
            const variant = [product.masterVariant, ...(product.variants ?? [])].find(
                (v) => v.sku === sku
            )

            if (variant) {
                return { ...product, masterVariant: variant, variants: [] }
            }
        }

        return null
    })
}

/**
 * Wraps the commercetools commerce API so products are identified by SKU rather than
 * by commercetools product ID: `productIds` are read as SKUs, and every product
 * returned has its first variant's SKU as its `id`. The extension stores whatever `id`
 * it is given, so no other part of it needs to know which identifier is in use.
 *
 * Products with no SKU are left out, since they could not be found again.
 */
export const withSkuIdentifiers = (codec: CommerceAPI): CommerceAPI => {
    const wrapped = Object.create(codec)

    // The stock lookup only filters on product ID. Everything else (keyword, category
    // and the mapping to `Product`) is left to the stock codec.
    wrapped.getRawProducts = async (args: GetProductsArgs, method?: string) =>
        args.productIds
            ? findBySku(codec, args.productIds.split(','))
            : (codec as any).getRawProducts(args, method)

    wrapped.getProducts = async (args: GetProductsArgs): Promise<Product[]> =>
        ((await (codec as any).getProducts.call(wrapped, args)) as (Product | null)[])
            .filter((product) => !product || product.variants[0]?.sku)
            .map((product) =>
                product ? { ...product, id: product.variants[0].sku as string } : product
            ) as Product[]

    return wrapped
}
