import { Identifiable, paginator } from "@amplience/dc-demostore-integration";
import { ContentFieldExtension, init } from 'dc-extensions-sdk';
import { DynamicContent } from "dc-management-sdk-js";
import { getMegaMenu, getCategories, getCustomerGroups } from "./api";
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

    // let's try to figure out what schema these parameters match, if any.
    const dc = new DynamicContent({}, {}, sdk.client);
    const hub = await dc.hubs.get(sdk.hub.id)
    const schemas = await paginator(hub.related.contentTypeSchema.list, { status: 'ACTIVE' })

    // schemas.forEach(schema => {
    //     if (schema.schemaId.indexOf('/site/integration') > -1) {
    //         let body = JSON.parse(schema.body)
    //         if (body.properties) {
    //             let missingKeys = _.difference(Object.keys(body.properties), Object.keys(installation))
    //             if (missingKeys.length === 0) {
    //                 installation = {
    //                     ...installation,
    //                     _meta: {
    //                         schema: schema.schemaId,
    //                         deliveryId: schema.id
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // })

    if (instance.data === 'category') {
        if (instance.view === 'tree') {
            values = await getMegaMenu(installation)
        }
        else { // a.view === 'single'
            values = await getCategories(installation)
            value = instance.type === 'string' && value ? values.find(opt => cleanValue(value) == opt.id) : value
        }
    }
    else { // a.data === 'customerGroups'
        values = await getCustomerGroups(installation)
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