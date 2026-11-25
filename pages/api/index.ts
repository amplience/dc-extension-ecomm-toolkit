import { middleware, CommerceAPI, getCommerceAPI as integrationGetCommerceAPI } from '@amplience/dc-integration-middleware'
import { withSkuIdentifiers } from '../../lib/codecs/commercetools-sku'

// add the /api route
export default middleware

/** An installation setting, read from beside `vendor` or inside `codec_params`, like the other settings. */
const setting = (config: any, name: string, allowed: string[]): string => {
    const value = config[name] ?? config.codec_params?.[name] ?? allowed[0]
    if (!allowed.includes(value)) {
        throw new Error(`Unsupported ${name} "${value}": expected ${allowed.map((v) => `"${v}"`).join(' or ')}.`)
    }
    return value
}

/** What a category field stores: the platform's category `id` (default) or its `slug`. */
const categoryIdentifier = (config: any) => setting(config, 'categoryIdentifier', ['id', 'slug'])

let configuredApi: CommerceAPI
const initCommerceApi = async (config: any) => {
    if (!configuredApi) {
        const productIdentifier = setting(config, 'productIdentifier', ['id', 'sku'])
        categoryIdentifier(config) // reject a bad value on load, not on first use

        const api = await integrationGetCommerceAPI(config)
        configuredApi = config.vendor === 'commercetools' && productIdentifier === 'sku' ? withSkuIdentifiers(api) : api
    }
    return configuredApi
}

export { categoryIdentifier, initCommerceApi }