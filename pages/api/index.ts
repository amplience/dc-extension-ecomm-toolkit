import { apiRouteHandler, CommerceAPI, getCommerceAPI as integrationGetCommerceAPI, Category, CommonArgs, CustomerGroup, GetCommerceObjectArgs, GetProductsArgs, Product, Config } from '@amplience/dc-demostore-integration'

// add the /api route
export default apiRouteHandler

let configuredApi: CommerceAPI
const initCommerceAPI = async (config: Config) => {
    return configuredApi = configuredApi || await integrationGetCommerceAPI(config)
}

const getCommerceApi = (config: Config): CommerceAPI => ({
    getProduct: async function (args: GetCommerceObjectArgs): Promise<Product> {
        return await (await initCommerceAPI(config)).getProduct(args)
    },
    getProducts: async function (args: GetProductsArgs): Promise<Product[]> {
        return await (await initCommerceAPI(config)).getProducts(args)
    },
    getCategory: async function (args: GetCommerceObjectArgs): Promise<Category> {
        return await (await initCommerceAPI(config)).getCategory(args)
    },
    getMegaMenu: async function (args: CommonArgs): Promise<Category[]> {
        return await (await initCommerceAPI(config)).getMegaMenu(args)
    },
    getCustomerGroups: async function (args: CommonArgs): Promise<CustomerGroup[]> {
        return await (await initCommerceAPI(config)).getCustomerGroups(args)
    }
})

export { initCommerceAPI, getCommerceApi }
