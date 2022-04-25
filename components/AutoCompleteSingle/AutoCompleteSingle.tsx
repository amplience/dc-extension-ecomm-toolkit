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
      sx={{ width: '100%', marginTop: '6px' }}
      value={value}
      onChange={(event, val) => {
        ampSDK.setValue({...val, name: val.name.replace(/\(.*\)\s/, '')})
        setValue(val)
      }}
      onClose={() => {
        ampSDK.setHeight(70)
      }}
      onOpen={() => {
        ampSDK.setHeight(540)
      }}
      onEmptied={ampSDK.clearValue}
      renderInput={(params) => <TextField {...params} label={ampSDK.label} />}
    />
  )
};

export default AutoCompleteSingle;