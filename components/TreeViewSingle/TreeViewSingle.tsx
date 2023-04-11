import React, { useState, createRef, useEffect } from "react";
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
  const ref = createRef<HTMLDivElement>()
  const [value, setValue] = useState(ampSDK.getValue())
  const [totalHeight, setTotalHeight] = useState(200)
  const [trigger, setTrigger] = useState(0.1)

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

  return (
    <>
      <div ref={ref}>
        <Typography variant="body1" component="p">
          Selected category: {value}
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
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          onNodeSelect={(event, val) => { 
            ampSDK.setValue(val) 
            setValue(val)
          }}
          onClick={updateHeight}
          /* onTransitionEnd={()=>{ this does not fire consistently
            console.log('ended')
          }} */
          selected={value}>
          {getTreeItemsFromData(ampSDK.getValues())}
        </TreeView>
      </div>
    </>
  )
};

export default TreeViewSingle;
