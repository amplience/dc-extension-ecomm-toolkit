import { Identifiable } from '@amplience/dc-demostore-integration'
import { SFCCTreeItemData } from "../models/treeItemData";
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
}