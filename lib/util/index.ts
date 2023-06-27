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
        if (e.type) {
            switch (e.type) {
                case CodecErrorType.Cors:
                    return `Cross-Origin Request Blocked. Make sure that you have properly configured your vendor to accept requests from ${window.location.origin}.`
                case CodecErrorType.NotAuthenticated:
                    return `Authentication error, make sure your authentication params are properly configured.\n\n${e.message}`
                case CodecErrorType.ApiError:
                    return `API Error, make sure your params are properly configured.\n\n${e.message}`
            }

            return e.message;
        } else {
            return e.toString();
        }
    }
}