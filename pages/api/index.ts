import { apiRouteHandler, CommerceAPI, getCommerceAPI as integrationGetCommerceAPI, Config } from '@amplience/dc-demostore-integration'

// add the /api route
export default apiRouteHandler

let configuredApi: CommerceAPI
const initCommerceApi = async (config: Config) => {
    return configuredApi = configuredApi || await integrationGetCommerceAPI(config)
}

// const getCommerceApi = async (config: Config): Promise<CommerceAPI> => {
//     return await initCommerceAPI(config)
//     // return {
//     //     getProduct: async function (args: GetCommerceObjectArgs): Promise<Product> {
//     //         return await commerceApi.getProduct(args)
//     //     },
//     //     getProducts: async function (args: GetProductsArgs): Promise<Product[]> {
//     //         return await commerceApi.getProducts(args)
//     //     },
//     //     getCategory: async function (args: GetCommerceObjectArgs): Promise<Category> {
//     //         return await commerceApi.getCategory(args)
//     //     },
//     //     getMegaMenu: async function (args: CommonArgs): Promise<Category[]> {
//     //         return await commerceApi.getMegaMenu(args)
//     //     },
//     //     getCustomerGroups: async function (args: CommonArgs): Promise<CustomerGroup[]> {
//     //         return await commerceApi.getCustomerGroups(args)
//     //     }
//     // }
// }

export { initCommerceApi }
