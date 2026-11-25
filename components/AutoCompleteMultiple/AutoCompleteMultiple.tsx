import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from '@mui/material';
import { AmpSDKProps } from "../../lib/models/treeItemData";

const AutoCompleteMultiple: React.FC<AmpSDKProps> = ({ ampSDK }) => {
  const [value, setValue] = useState(ampSDK.getValue())

  // The frame has no height until it's set, so size it before the first open.
  useEffect(() => {
    ampSDK.setHeight(160)
  }, [ampSDK])

  return (
    <Autocomplete
      multiple
      id="tags-standard"
      options={ampSDK.getValues()}
      getOptionLabel={(option) => option.name}
      value={value}
      ChipProps={{color:'secondary'}}
      sx={{ width: '99%', "& label":{color: '#597681'} }}
      onChange={(event, val) => {
        ampSDK.setValue(val)
        setValue(val) 
      }}
      onClose={() => {
        ampSDK.setHeight(160)
      }}
      onOpen={() => {
        ampSDK.setHeight(540)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={ampSDK.label}
        />
      )}
    />
  )
};

export default AutoCompleteMultiple;