import React, { useState } from "react";
import { Typography } from '@mui/material';
import { AmpSDKProps, TreeItemData } from "../../lib/models/treeItemData";
import { TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const getTreeItemsFromData = (treeItems: TreeItemData[]) => {
  return treeItems.map((treeItemData: any) => {
    let children = undefined;
    if (treeItemData.children && treeItemData.children.length > 0) {
      children = getTreeItemsFromData(treeItemData.children);
    }
    return (
      <TreeItem
        key={treeItemData.id}
        nodeId={treeItemData.id}
        label={treeItemData.name}>
        {children}
      </TreeItem>
    );
  });
};

const TreeViewSingle: React.FC<AmpSDKProps> = ({ ampSDK }) => {
  const [value, setValue] = useState(ampSDK.getValue())
  return (
    <>
      <Typography variant="body1" component="p">
        Selected category: {value}
        {
          value != '' ? 
          <IconButton aria-label="delete" onClick={() => {
            console.log('set val')
            setValue('')
            ampSDK.clearValue()
          }}>
            <DeleteIcon />
          </IconButton>
          : '' 
        }
      </Typography>

      <div className="tree-contain">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          onNodeSelect={(event, val) => { 
            ampSDK.setValue(val) 
            setValue(val)
          }}
          selected={value}>
          {getTreeItemsFromData(ampSDK.getValues())}
        </TreeView>
      </div>
    </>
  )
};

export default TreeViewSingle;
