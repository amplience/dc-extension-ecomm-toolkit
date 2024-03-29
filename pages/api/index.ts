import { middleware, CommerceAPI, getCommerceAPI as integrationGetCommerceAPI } from '@amplience/dc-integration-middleware'

// add the /api route
export default middleware

let configuredApi: CommerceAPI
const initCommerceApi = async (config: any) => {
    return configuredApi = configuredApi || await integrationGetCommerceAPI(config)
}

export { initCommerceApi }