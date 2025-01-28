import React, { useState } from "react";
import { Autocomplete, TextField } from '@mui/material';
import { AmpSDKProps } from "../../lib/models/treeItemData";

const AutoCompleteSingle: React.FC<AmpSDKProps> = ({ ampSDK }) => {
  const [value, setValue] = useState(ampSDK.getValue())
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={ampSDK.getValues()}
      getOptionLabel={(option) => option.name || ''}
      sx={{ width: '100%', marginTop: '6px', "& label":{color: '#597681'},"& fieldset": { borderColor: '#b4c0f2', borderRadius: '.5rem' }, "& fieldset:hover": { borderColor: '#b4bef2' } }}
      value={value}
      onChange={(event, val) => {
        if(val !== null){
          ampSDK.setValue({...val, name: val.name.replace(/\(.*\)\s/, '')})
          setValue(val)
        }else{
          ampSDK.clearValue()
          setValue({ name: '', id: '' })
        }
      }}
      onClose={() => {
        ampSDK.setHeight(130)
      }}
      onOpen={() => {
        ampSDK.setHeight(540)
      }}
      renderInput={(params) => <TextField {...params} label={ampSDK.label} />}
    />
  )
};

export default AutoCompleteSingle;