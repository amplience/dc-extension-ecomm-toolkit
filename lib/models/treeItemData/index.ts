
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
    ampSDK: any
}
