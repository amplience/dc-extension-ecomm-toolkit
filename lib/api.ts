import { CodecConfiguration } from "@amplience/dc-demostore-integration";
import { stringify } from "querystring";
import _ from 'lodash'

const fetchApi = (path: string) => async (installParams: CodecConfiguration) => {
    return await (await fetch(`/api?operation=${path}&${stringify(JSON.parse(JSON.stringify(installParams)))}`)).json()
}

export const getCategories = fetchApi('categories')
export const getMegaMenu = fetchApi('megaMenu')
export const getCustomerGroups = fetchApi('customerGroups')