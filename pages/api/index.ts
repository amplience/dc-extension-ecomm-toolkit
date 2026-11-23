import { middleware, CommerceAPI, getCommerceAPI as integrationGetCommerceAPI } from '@amplience/dc-integration-middleware'
import { withSkuIdentifiers } from '../../lib/codecs/commercetools-sku'

// add the /api route
export default middleware

let configuredApi: CommerceAPI
const initCommerceApi = async (config: any) => {
    if (!configuredApi) {
        if (config.identifier !== undefined && !['id', 'sku'].includes(config.identifier)) {
            throw new Error(`Unsupported identifier "${config.identifier}": expected "id" or "sku".`)
        }

        const api = await integrationGetCommerceAPI(config)
        configuredApi = config.vendor === 'commercetools' && config.identifier === 'sku' ? withSkuIdentifiers(api) : api
    }
    return configuredApi
}

export { initCommerceApi }