import { CommerceAPI } from "@amplience/dc-integration-middleware";
import { InstanceParams } from "../extensionParams";

export interface TreeItemData {
    id: string;
    name: string;
    children: TreeItemData[];
}

export interface SFCCTreeItemData {
    id: string;
    name: string;
    categories: TreeItemData[];
}

export interface DataTreeViewProps {
    treeItems: TreeItemData[];
}

export interface AmpSDKProps {
    ampSDK: InstanceParams & {
        getTitle: () => string
        getDescription: () => string 
        getValue: () => any
        getValues: () => any
        getStoredValue: () => any
        setValue: (value: any) => void
        setHeight: (height: number) => void
        isEnforced: () => boolean
        clearValue: () => void
        enforceValue: (value: any) => string
        commerceApi: CommerceAPI
        maxItems?: number
    }
}
