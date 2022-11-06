import React, { useState, useRef, useEffect } from "react";
import {
    Autocomplete,
    TextField,
    Typography,
    Paper,
    Box,
    Backdrop,
    CircularProgress,
    ToggleButton,
    IconButton,
    ImageList
} from "@mui/material";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import ProductTile from "../ProductTile";
import {AmpSDKProps} from "../../lib/models/treeItemData";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import update from "immutability-helper";

const ProductSelector: React.FC<AmpSDKProps> = ({ ampSDK }) => {
    const [storedValue, setStoredValue] = useState(ampSDK.getStoredValue())
    const [mode, setMode] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])
    const keywordInput = useRef(null)

    const searchByCategory = async (catId: string) => {
        setResults([])
        setLoading(true)
        const p = await ampSDK.commerceApi.getCategory({ slug: catId });
        setResults(p.products)
        setLoading(false)
    };

    const searchByKeyword = async () => {
        setResults([])
        setLoading(true)
        const p = await ampSDK.commerceApi.getProducts({
            keyword: keywordInput.current.value,
        })
        setLoading(false)
        setResults(p)
    };

    const handleKeyWordKeydown = (event: React.KeyboardEvent<HTMLElement>) => {
        if(event.keyCode === 13){
            searchByKeyword()
            return false
        }else if(event.keyCode === 27){
            setKeyword('')
        }
    }

    const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    const selectProduct = (product: any) => {
        setSelectedProducts(selectedProducts => [...selectedProducts, {...product, index: selectedProducts.length}])
    }

    const removeProduct = (productTile: any) => {
        setSelectedProducts(selectedProducts.filter(p => p.index !== productTile.index))
    }

    const moveTile = (dragIndex, hoverIndex) => {
        const draggedTile = selectedProducts[dragIndex];
        setSelectedProducts(
            update(selectedProducts, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, draggedTile]]
            })
        );
    };

    useEffect(() => {
        if(!mode) keywordInput.current.value = ''
    }, [mode])

    useEffect(() => {
        console.log('results: ', results)
        if(results.length) {ampSDK.setHeight(640)}
        else if(results.length && selectedProducts.length){ampSDK.setHeight(880)}
        else if(selectedProducts.length){ampSDK.setHeight(340)}
    }, [results, ampSDK, selectedProducts])

    // Whenever selectedProducts list changes, save to dc form
    useEffect(() => {
        //console.log('selected: ', selectedProducts)
        if(selectedProducts.length){
            switch (ampSDK?.type) {
                case 'string':
                    const formStr = selectedProducts.map(prod => (prod.id))
                    //console.log('single string: ', formStr[0])
                    ampSDK.setValue(formStr[0])
                    break;
                case 'strings':
                    const formStrs = selectedProducts.map(prod => (prod.id))
                    //console.log('strings: ', formStrs)
                    ampSDK.setValue(formStrs)
                    break;
                case 'object':
                    const formVal = selectedProducts.map(prod => ({id: prod.id, cid: 'todo'}))
                    //console.log('object: ', formVal[0])
                    ampSDK.setValue(formVal[0])
                    break;
                case 'objects':
                    const formVals = selectedProducts.map(prod => ({id: prod.id, cid: 'todo'}))
                    //console.log('objects: ', formVals)
                    ampSDK.setValue(formVals)
                    break;
            
                default:
                    break;
            }
        }else{
            ampSDK.clearValue()
        }
    }, [selectedProducts, ampSDK])

    // Process values stored in the dc form to put into selecteProducts
    useEffect( () => {
        console.log('stored vals:', storedValue)

        const getProducts = async(ids) => {
            const p = await ampSDK.commerceApi.getProducts({
                productIds: ids,
            })
            return p
        }
        // form comma-delim ID string
        if(storedValue != undefined){
            let Ids: string;
            switch (ampSDK?.type) {
                case 'string':
                    Ids = storedValue
                    break;
                case 'strings':
                    Ids = storedValue.join(',')
                    break;
                case 'object':
                    Ids = storedValue.id
                    break;
                case 'objects':
                    Ids = storedValue.map(prod => (prod.id)).join(',')
                    break;
                default:
                    break;
            }
            getProducts(Ids).then( res => setSelectedProducts(res))
        }
    }, [storedValue, ampSDK])

    return (
        <>
            <Backdrop
                sx={{ color: '#77f', backgroundColor: 'rgba(200,200,200,0.6)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Typography variant="h2" fontSize={'12px'} fontWeight={'bold'} fontStyle={'italic'} textTransform={'uppercase'}>
                Product Selector
            </Typography>
            <Paper
                elevation={0}
                component="form"
                sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
            >
                <ToggleButton
                    value="check"
                    selected={mode}
                    sx={{padding: '6px 14px'}}
                    onChange={() => {
                        setMode(!mode)
                    }}
                >
                    Mode
                </ToggleButton>
                {mode === false ? (
                <>
                    <TextField
                        inputRef={keywordInput}
                        size='small'
                        sx={{ ml: 1, flex: 1}}
                        label="Keyword Search (esc. to clear)"
                        variant="outlined"
                        inputProps={{ "aria-label": "keyword search (escape key to clear" }}
                        onKeyDown={handleKeyWordKeydown}
                        onChange={handleKeywordChange}
                        value={keyword}
                    />
                    <IconButton
                    type="button"
                    onClick={searchByKeyword}
                    sx={{ p: "10px" }}
                    aria-label="search"
                    >
                    <SearchIcon />
                    </IconButton>
                </>
                ) : (
                <></>
                )}
                {mode === true ? (
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size="small"
                    options={ampSDK.getValues()}
                    getOptionLabel={(option) => option.name || ""}
                    sx={{ width: "100%", marginTop: "0", paddingLeft: '8px' }}
                    value={storedValue}
                    onChange={(event, val) => {
                    if (val !== null) {
                        searchByCategory(val.id);
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
                    renderInput={(params) => (
                        <TextField {...params} label={ampSDK.label} />
                    )}
                />
                ) : (
                <></>
                )}
            </Paper>
            {selectedProducts.length ?
                <>
                    <Typography variant="h3" fontSize={'10px'} fontWeight={'bold'} textTransform={'uppercase'}>
                        Selected Products
                    </Typography>
                    <ImageList sx={{ width: '100%', height: 240 }} cols={5} rowHeight={120}>
                        {selectedProducts.map((product: any, index: number) => {
                            return (
                                <ProductTile
                                    key={index}
                                    index={index}
                                    product={product}
                                    size={120}
                                    moveTile={moveTile}
                                    removeProduct={removeProduct} />
                            )
                        })} 
                    </ImageList>
                </>
                : 
                <></>
            }
            {results.length ?
                <>
                    <Typography variant="h3" fontSize={'10px'} fontWeight={'bold'} textTransform={'uppercase'}>
                        Search Results
                    </Typography>
                    <ImageList sx={{ width: '100%', height: 450 }} cols={4} rowHeight={158}>
                        {results.map((product: any, index: number) => {
                            return <ProductTile key={index} size={158} index={index} product={product} selectProduct={selectProduct} />
                        })} 
                    </ImageList>
                </>
                :   
                <></>
            }
        </>
    );
};

export default ProductSelector;
