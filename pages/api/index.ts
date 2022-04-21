import { CommerceAPI, flattenCategories, getCommerceAPI, getCommerceAPIFromConfig } from "@amplience/dc-demostore-integration";

export default async function handler(req, res) {
    let commerceAPI: CommerceAPI
    if (req.query.config_locator) {
        commerceAPI = await getCommerceAPI(req.query.config_locator)
    }
    else {
        commerceAPI = await getCommerceAPIFromConfig(req.query)
    }

    if (req.query.operation === 'categories') {
        let megaMenu = await commerceAPI.getMegaMenu({})
        res.status(200).json(flattenCategories(megaMenu).map(cat => ({ name: `(${cat.slug}) ${cat.name}`, id: cat.id })))
    }
    else if (req.query.operation === 'megaMenu') {
        res.status(200).json(await commerceAPI.getMegaMenu({}))
    }
    else if (req.query.operation === 'customerGroups') {
        res.status(200).json(await commerceAPI.getCustomerGroups({}))
    }
}