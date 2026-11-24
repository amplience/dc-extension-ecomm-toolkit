import { middleware, CommerceAPI, getCommerceAPI as integrationGetCommerceAPI } from '@amplience/dc-integration-middleware'
import { withSkuIdentifiers } from '../../lib/codecs/commercetools-sku'

// add the /api route
export default middleware

let configuredApi: CommerceAPI
const initCommerceApi = async (config: any) => {
    if (!configuredApi) {
        // Either beside `vendor` or inside `codec_params`, like the other settings.
        const identifier = config.identifier ?? config.codec_params?.identifier

        if (identifier !== undefined && !['id', 'sku'].includes(identifier)) {
            throw new Error(`Unsupported identifier "${identifier}": expected "id" or "sku".`)
        }

        const api = await integrationGetCommerceAPI(config)
        configuredApi = config.vendor === 'commercetools' && identifier === 'sku' ? withSkuIdentifiers(api) : api
    }
    return configuredApi
}

export { initCommerceApi }