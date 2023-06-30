import { Identifiable } from '@amplience/dc-integration-middleware'
import { SFCCTreeItemData } from "../models/treeItemData";
import { CodecErrorType } from '@amplience/dc-integration-middleware';
export module Utils {

    export function flatten (node: any, key = 'categories') : Identifiable[]  {
        const children = (node[key] || []).reduce((a: any, b: any) => {
            return Array.isArray(b[key]) && !!b[key].length
                ? {...a, ...flatten(b, key)}
                : {...a, [b.id]: b}
        }, {})
    
        return {
            [node.id]: node,
            ...children
        }
    }

    // Add level
    export function flatCategoryOptions(array: any){
        const arr: any = [];
        (function recurrence(array) {
            Array.from(array, (item: any) => {
            arr.push({ name: '(' +item.parent_category_id + ') - ' + item.name, id: item.id });
            if (item.categories) {
                recurrence(item.categories);
            }
            });
        })(array);
        return arr;
    }

    /**
     * conforms SFCC category tree to the tree structure required by @MUI tree component 
     * @param tree 
     * @returns 
     */
    export function catToChild(tree: SFCCTreeItemData[]): any{
        return tree.map((itemData: any) => {
            let children = undefined;
            if(itemData.categories && itemData.categories.length > 0){
                children = catToChild(itemData.categories)
            }

            if(children === undefined){
                return {
                    id: itemData.id,
                    name: itemData.name
                }    
            }else {
                return {
                    id: itemData.id,
                    name: itemData.name,
                    children: children
                }
            }
        })
    }

    export function segmentForm(array: any){
        const arr: any = [];
        for (let i = 0; i < array.length; i++) {
            arr.push({name: array[i].id, id: array[i].id});
        }
        return arr;
    }

    export function errorToString(e: any) {
        const docsUrl = 'https://github.com/amplience/dc-extension-ecomm-toolkit/blob/main/docs/errors.md'

        if (e.type) {
            switch (e.type) {
                case CodecErrorType.Cors:
                    return `Cross-Origin Request Blocked. Make sure that you have properly configured your vendor to accept requests from ${window.location.origin}.\n\nSee ${docsUrl}#cors for more information.`
                case CodecErrorType.NotAuthenticated:
                case CodecErrorType.AuthError:
                case CodecErrorType.AuthUnreachable:
                    return `Authentication error, make sure your authentication params are properly configured.\n\nSee ${docsUrl}#authentication-error for more information.\n\n${e.message}`
                case CodecErrorType.ApiError:
                case CodecErrorType.ApiGraphQL:
                    return `API Error, make sure your params are properly configured.\n\nSee ${docsUrl}#api-error for more information.\n\n${e.message}`
                case CodecErrorType.NotSupported:
                    return `Method not supported by vendor.\n\nSee ${docsUrl}#not-supported for more information.\n\n${e.message}`
            }

            return `Encountered error '${CodecErrorType[e.type]}'. See ${docsUrl}#other for more information.\n\n${e.message}`;
        } else {
            return e.toString();
        }
    }
}