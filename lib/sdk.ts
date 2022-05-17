import { Identifiable, flattenCategories, getCommerceAPI } from "@amplience/dc-demostore-integration";
import { ContentFieldExtension, init } from 'dc-extensions-sdk';
import { ExtParameters, FieldModel } from "./models/extensionParams";
import _ from 'lodash'

export type ValueType = Identifiable | Identifiable[] | string | string[] | null

const amplienceSDK = async () => {
    const isEnforced = () => {
        return sdk.field.schema?.pattern
    }

    const cleanValue = (value: any) => {
        return isEnforced() ? value.split('/')[1] : value
    }

    const enforceValue = (value: any) => {
        let val = value
        if (typeof value !== 'string') {
            val = value.id
        }
        return isEnforced() ? `${sdk.field.schema?.pattern.split('/')[0]}/${val}` : val
    }

    // data members
    let sdk: ContentFieldExtension = await init<ContentFieldExtension<FieldModel, ExtParameters>>({ debug: true })
    let value: any = await sdk.field.getValue()
    let values: any[] = []
    // end

    let { instance, installation } = sdk.params as ExtParameters
    const commerceAPI = getCommerceAPI(installation)

    if (instance.data === 'category') {
        if (instance.view === 'tree') {
            values = await commerceAPI.getMegaMenu({})
        }
        else { // a.view === 'single'
            let megaMenu: any[] = await commerceAPI.getMegaMenu({})
            values = flattenCategories(megaMenu).map(cat => ({ name: `(${cat.slug}) ${cat.name}`, id: cat.id }))
            value = instance.type === 'string' && value ? values.find(opt => cleanValue(value) == opt.id) : value
        }
    }
    else { // a.data === 'customerGroups'
        values = await commerceAPI.getCustomerGroups({})
        value = instance.type === 'string' && value ? values.filter(opt => value.includes(opt.id)) : value
    }

    let ampSDK = {
        ...instance,
        getValue: () => value,
        getValues: () => values,

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
        }
    }

    return ampSDK
}
export default amplienceSDK