import { Identifiable, flattenCategories } from "@amplience/dc-demostore-integration";
import { ContentFieldExtension, init } from 'dc-extensions-sdk';
import { initCommerceApi } from "../pages/api";
import { ExtParameters, FieldModel } from "./models/extensionParams";
import _ from 'lodash'

export type ValueType = Identifiable | Identifiable[] | string | string[] | null

const amplienceSDK = async () => {
    const isEnforced = () => {
        return sdk.field.schema?.pattern
    }

    const cleanValue = (value: any) => {
        return isEnforced() ? value.split('/').pop() : value
    }

    const enforceValue = (value: any) => {
        let val = value

        if (typeof value !== 'string') {
            val = value.id
        }
        if(isEnforced()) {
            let pattern = sdk.field.schema?.pattern.split('/')
            pattern.pop()
            return `${pattern.join('/')}/${val}`
        }else{
            return val
        }
    }

    // data members
    let sdk: ContentFieldExtension = await init<ContentFieldExtension<FieldModel, ExtParameters>>({ debug: true })
    let value: any = await sdk.field.getValue()
    let storedVal: any = await sdk.field.getValue()
    let values: any[] = []
    // end

    let { instance, installation } = sdk.params as ExtParameters
    let commerceApi = await initCommerceApi(installation) 

    if (instance.data === 'category') {
        if (instance.view === 'tree') {
            values = await commerceApi.getMegaMenu({})
        }
        else { // a.view === 'single'
            let megaMenu: any[] = await commerceApi.getMegaMenu({})
            values = flattenCategories(megaMenu).map(cat => ({ name: `(${cat.slug}) ${cat.name}`, slug: cat.slug, id: cat.id }))
            value = instance.type === 'string' && value ? values.find(opt => cleanValue(value) == opt.id) : value
        }
    }else if(instance.data === 'product'){
        let megaMenu: any[] = await commerceApi.getMegaMenu({})
        values = flattenCategories(megaMenu).map(cat => ({ name: `(${cat.slug}) ${cat.name}`, slug: cat.slug, id: cat.id }))
        value = instance.type === 'string' && value ? values.find(opt => cleanValue(value) == opt.id) : value
    }
    else { // a.data === 'customerGroups'
        values = await commerceApi.getCustomerGroups({})
        value = instance.type === 'string' && value ? values.filter(opt => value.includes(opt.id)) : value
    }

    let ampSDK = {
        ...instance,
        getValue: () => value,
        getValues: () => values,
        getStoredValue: () => storedVal,

        setValue: async (newValue: ValueType) => {
            if (newValue) {
                let v: any = newValue
                if (instance.type === 'string') {
                    if (Array.isArray(newValue)) {
                        v = newValue.map(enforceValue)
                    }
                    else {
                        v = enforceValue(newValue)
                    }
                }
                await sdk.field.setValue(v)
                value = newValue
            }
        },

        clearValue: async () => {
            await sdk.field.setValue('')
            value = { name: '', id: '' }
        },

        setHeight: (height) => {
            sdk.frame.setHeight(height)
        },

        isEnforced: () => {
            return sdk.field.schema?.pattern
        },

        commerceApi: commerceApi,
        maxItems: sdk.field.schema?.maxItems
    }

    return ampSDK
}
export default amplienceSDK