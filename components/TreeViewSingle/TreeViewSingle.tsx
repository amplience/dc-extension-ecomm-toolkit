import React, { useState, createRef, useEffect } from "react";
import { Typography } from '@mui/material';
import { AmpSDKProps, TreeItemData } from "../../lib/models/treeItemData";
import { TreeItem, SimpleTreeView } from "@mui/x-tree-view";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

let mapping: { id: any; name: any; }[] = [];

const getTreeItemsFromData = (treeItems: TreeItemData[]) => {
  return treeItems.map((treeItemData: any) => {
    let children = undefined;
    if (treeItemData.children && treeItemData.children.length > 0) {
      children = getTreeItemsFromData(treeItemData.children);
    }
    mapping.push({id:treeItemData.id, name:treeItemData.name})
    return (
      <TreeItem
        key={treeItemData.id}
        id={treeItemData.id}
        itemId={treeItemData.id}
        label={treeItemData.name}>
        {children}
      </TreeItem>
    );
  });
};

const TreeViewSingle: React.FC<AmpSDKProps> = ({ ampSDK }) => {
  const ref = createRef<HTMLDivElement>()
  const [value, setValue] = useState(ampSDK.getValue())
  const [totalHeight, setTotalHeight] = useState(200)
  const [trigger, setTrigger] = useState(0.1)

  const handleItemSelectionToggle = (
    event: React.SyntheticEvent,
    itemId: string,
    isSelected: boolean,
  ) => {
    if (isSelected) {
      ampSDK.setValue(itemId) 
      setValue(itemId)
    }
  };

  const updateHeight = () => {
    setTimeout(()=> {
      setTrigger(Math.random())
    }, 300)
  }
  useEffect(() => {
    const { current } = ref
    setTotalHeight(current.clientHeight + 100)
    if(ampSDK !== undefined){
      ampSDK.setHeight(current.clientHeight + 100)
    }
  }, [trigger])

  let displayValue = value;
  const match = mapping?.find(x => x.id === value)
  if(match) displayValue = `${match.name} (${match.id})`
  

  return (
    <>
      <div ref={ref}>
        <Typography variant="body1" component="p">
          Selected category: {displayValue}
          {
            value != '' ? 
            <IconButton aria-label="delete" onClick={() => {
              setValue('')
              ampSDK.clearValue()
            }}>
              <DeleteIcon />
            </IconButton>
            : '' 
          }
        </Typography>
        <SimpleTreeView
          onItemSelectionToggle={handleItemSelectionToggle}
          checkboxSelection={true}
          onClick={updateHeight}
          selectedItems={value}>
          {getTreeItemsFromData(ampSDK.getValues())}
        </SimpleTreeView>
      </div>
    </>
  )
};

export default TreeViewSingle;
