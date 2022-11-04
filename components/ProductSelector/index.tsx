import React, { useState, useRef } from "react";
import {
    Autocomplete, 
    TextField,
    Typography, 
    Paper,
    Menu,
    MenuItem,
    Button,
    Fade,
    IconButton 
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import { AmpSDKProps } from "../../lib/models/treeItemData";

const ProductSelector: React.FC<AmpSDKProps> = ({ ampSDK }) => {
    const [value, setValue] = useState(ampSDK.getValue());
    const [type, setType] = useState(0)
    const keywordInput = useRef(null)

    //Menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const modeSelect= (event: React.MouseEvent<HTMLElement>, index: number) => {
        setType(index)
        setAnchorEl(null)
    }



    const searchByCategory = async (catId: string) => {
        console.log('cat ID:', catId)
        const p = await ampSDK.commerceApi.getCategory({slug: catId});
        console.log('products by cat:', p)
    }

    const searchByKeyword = async () => {
        console.log('term:', keywordInput.current.value)
        const p = await ampSDK.commerceApi.getProducts({keyword: keywordInput.current.value});
        console.log('products:', p)
    }

    return (
        <>
            <Typography variant="h2" fontSize={'16px'}>Product Selector</Typography>
            <Paper elevation={0} component="form" sx={{p: '2px 4px', display: 'flex', alignItems: 'center'}}>
                <div>
                    <Button
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={openMenu}
                    >
                        Mode
                    </Button>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={(event) => modeSelect(event, 0)}>by Keyword</MenuItem>
                        <MenuItem onClick={(event) => modeSelect(event, 1)}>by Category</MenuItem>
                    </Menu>
                </div>
                {type === 0 ? 
                    <>
                        <TextField
                            inputRef={keywordInput}
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Keyword Search"
                            inputProps={{ 'aria-label': 'keyword search' }}
                        />
                        <IconButton type="button" onClick={searchByKeyword} sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton> 
                    </>
                    : <></>
                }
                {type === 1 ? 
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={ampSDK.getValues()}
                        getOptionLabel={(option) => option.name || ""}
                        sx={{ width: "100%", marginTop: "0", border: 'none' }}
                        value={value}
                        onChange={(event, val) => {
                            if (val !== null) {
                                searchByCategory(val.id)
                            } else {
                                /* ampSDK.clearValue();
                                setValue({ name: "", id: "" }); */
                            }
                        }}
                        onClose={() => {
                            ampSDK.setHeight(200);
                        }}
                        onOpen={() => {
                            ampSDK.setHeight(540);
                        }}
                        renderInput={(params) => <TextField {...params} label={ampSDK.label} />}
                    />
                    : <></>}
                
            </Paper>
        </>
    );
};

export default ProductSelector;
