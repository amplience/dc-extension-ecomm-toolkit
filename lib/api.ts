import { CodecConfiguration, CommerceAPI, getResponse, isServer } from "@amplience/dc-demostore-integration";
import { stringify } from "querystring";

const fetchApi = (operation: string) => async (installParams: CodecConfiguration) => {
    if (isServer()) {
        return await getResponse({ ...installParams, operation })
    }
    return await (await fetch(`/api?operation=${operation}&${stringify(JSON.parse(JSON.stringify(installParams)))}`)).json()
}

const api: CommerceAPI = {
    getProduct:         fetchApi('getProduct'),
    getProducts:        fetchApi('getProducts'),
    getCategory:        fetchApi('getCategory'),
    getMegaMenu:        fetchApi('getMegaMenu'),
    getCustomerGroups:  fetchApi('getCustomerGroups')
}
export default api