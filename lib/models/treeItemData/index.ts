import { CommerceAPI } from "@amplience/dc-demostore-integration";
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
        getValue: () => any
        getValues: () => any
        getStoredValue: () => any
        setValue: (value: any) => void
        setHeight: (height: number) => void
        isEnforced: () => boolean
        clearValue: () => void
        enforceValue: (value: any) => string
        commerceApi: CommerceAPI
    }
}
