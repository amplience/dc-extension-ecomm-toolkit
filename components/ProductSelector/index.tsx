import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
    Autocomplete,
    TextField,
    Typography,
    Dialog,
    Card,
    CardContent,
    Backdrop,
    CircularProgress,
    IconButton,
    ImageList,
    Pagination,
    Tabs,
    Tab,
    Box
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ProductTile from '../ProductTile'
import SortableList from '../SortableList'
import { AmpSDKProps } from '../../lib/models/treeItemData'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    )
}

const ProductSelector: React.FC<AmpSDKProps> = ({ ampSDK }) => {
    const [storedValue] = useState(ampSDK.getStoredValue())
    const [mode, setMode] = useState(0)
    const [keyword, setKeyword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [results, setResults] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])
    const keywordInput = useRef(null)
    const container = useRef(null)
    const [height, setHeight] = useState(200)

    const itemsPerPage = 12
    const [page, setPage] = React.useState(1)
    const [noOfPages, setNoOfPages] = React.useState(
        Math.ceil(results.length / itemsPerPage)
    )

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    const tabChange = (event: React.SyntheticEvent, newValue: number) => {
        setMode(newValue)
    }

    const searchByCategory = async (catSlug: string) => {
        setResults([])
        setLoading(true)
        if (catSlug !== '') {
            const p = await ampSDK.commerceApi.getCategory({ slug: catSlug })
            setResults(p.products)
        }
        setLoading(false)
    }

    const searchByKeyword = async () => {
        setResults([])
        setLoading(true)
        if (keywordInput.current.value !== '') {
            const p = await ampSDK.commerceApi.getProducts({
                keyword: keywordInput.current.value
            })
            setResults(p)
        }
        setLoading(false)
    }

    const handleKeyWordKeydown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.keyCode === 13) {
            searchByKeyword()
            return false
        } else if (event.keyCode === 27) {
            setKeyword('')
            setResults([])
        }
    }

    const handleKeywordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setKeyword(event.target.value)
    }

    const selectProduct = (product: any) => {
        if (
            (ampSDK?.type === 'objects' || ampSDK?.type === 'strings') &&
            ampSDK.maxItems &&
            selectedProducts.length >= ampSDK.maxItems
        ) {
            setAlertMessage(
                "You've reached the maximum amount of selectable items"
            )
            setShowAlert(true)
        } else {
            // TODO: [NOVADEV-980] Update UX to validate if user wants to add variants of a master
            const match = selectedProducts.find(
                (p) => p.selectedVariant.sku === product.variants[0].sku
            )
            if (match) {
                setAlertMessage("You've already selected this item")
                setShowAlert(true)
            } else if (ampSDK?.type === 'string' || ampSDK?.type === 'object') {
                // For single selection, replace the selected product.
                setSelectedProducts((selectedProducts) => [
                    {
                        ...product,
                        deleteKey: selectedProducts.length,
                        selectedVariant: product.variants[0]
                    }
                ])
            } else {
                setSelectedProducts((selectedProducts) => [
                    ...selectedProducts,
                    {
                        ...product,
                        deleteKey: selectedProducts.length,
                        selectedVariant: product.variants[0]
                    }
                ])
            }
        }
    }

    const removeProduct = (productTile: any) => {
        setSelectedProducts(
            selectedProducts.filter(
                (p) => p.deleteKey !== productTile.deleteKey
            )
        )
    }

    const getContainerHeight = useCallback(() => {
        const newHeight = container.current.clientHeight
        setHeight(newHeight)
    }, [container])

    const updateSelected = useCallback(
        (selectedProducts) => {
            if (selectedProducts.length) {
                switch (ampSDK?.type) {
                    case 'string':
                        const formStr = selectedProducts.map((prod) => prod.id)
                        ampSDK.setValue(formStr[0])
                        break
                    case 'strings':
                        const formStrs = selectedProducts.map((prod) => prod.id)
                        ampSDK.setValue(formStrs)
                        break
                    case 'object':
                        const formVal = {
                            id: selectedProducts[0].id,
                            variant: selectedProducts[0].selectedVariant?.sku
                        }
                        ampSDK.setValue(formVal)
                        break
                    case 'objects':
                        const formVals = selectedProducts.map((prod) => ({
                            id: prod.id,
                            variant: prod.selectedVariant?.sku
                        }))
                        ampSDK.setValue(formVals)
                        break

                    default:
                        break
                }
            } else {
                ampSDK.clearValue()
            }
        },
        [ampSDK]
    )

    useEffect(() => {
        if (!mode) keywordInput.current.value = ''
        setResults([])
    }, [mode])

    useEffect(() => {
        setPage(1)
        setNoOfPages(Math.ceil(results.length / itemsPerPage))
    }, [results])

    useEffect(() => {
        setTimeout(() => {
            getContainerHeight()
        }, 100)
    }, [results, selectedProducts, getContainerHeight])

    useEffect(() => {
        window.addEventListener('resize', getContainerHeight)

        return () => {
            window.removeEventListener('resize', getContainerHeight)
        }
    }, [getContainerHeight])

    useEffect(() => {
        ampSDK.setHeight(height + 20)
    }, [height, ampSDK])

    // Whenever selectedProducts list changes, save to dc form
    useEffect(() => {
        updateSelected(selectedProducts)
    }, [selectedProducts, ampSDK, updateSelected])

    // Process values stored in the dc form to put into selecteProducts
    useEffect(() => {
        const getProducts = async (ids) => {
            if (ids === '') { 
                return []
            }
            const p = await ampSDK.commerceApi.getProducts({
                productIds: ids
            })
            return p
        }
        // form comma-delim ID string
        if (storedValue != undefined) {
            let Ids: string
            switch (ampSDK?.type) {
                case 'string':
                    Ids = ampSDK.isEnforced()
                        ? storedValue.split('/').pop()
                        : storedValue
                    break
                case 'strings':
                    Ids = storedValue.join(',')
                    break
                case 'object':
                    Ids = storedValue.id
                    break
                case 'objects':
                    Ids = storedValue.map((prod: any) => prod.id).join(',')
                    break
                default:
                    break
            }
            setLoading(true)
            getProducts(Ids).then((res) => {
                setLoading(false)
                let prod = res.map((item: any, index: number) => {
                    const selVar = item.variants.find(
                        (v: any) => v.id === storedValue.variant
                    )
                    return {
                        ...item,
                        deleteKey: index,
                        selectedVariant:
                            selVar !== undefined ? selVar : item.variants[0]
                    }
                })

                setSelectedProducts(prod)
            })
        }
    }, [storedValue, ampSDK])

    return (
        <div ref={container}>
            <Dialog open={showAlert} onClose={() => setShowAlert(false)}>
                <Card variant='outlined'>
                    <CardContent>{alertMessage}</CardContent>
                </Card>
            </Dialog>
            <Backdrop
                sx={{
                    color: '#77f',
                    backgroundColor: 'rgba(200,200,200,0.6)',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                open={loading}
            >
                <CircularProgress color='inherit' />
            </Backdrop>

            {/* Sortable Selected Products */}
            {selectedProducts.length ? (
                <>
                    <Typography
                        mt={1}
                        variant='h3'
                        fontSize={'12px'}
                        fontWeight={'normal'}
                        color='#666'
                    >
                        Selected Products
                    </Typography>
                    <SortableList
                        selectedProducts={selectedProducts}
                        dataType={ampSDK?.type}
                        updateSelected={updateSelected}
                        removeProduct={removeProduct}
                    />
                </>
            ) : (
                <></>
            )}

            {/* Dual Mode Search */}

            <Tabs
                value={mode}
                onChange={tabChange}
                aria-label='search mode tabs'
                sx={{ marginBottom: '14px' }}
            >
                <Tab label='Keyword Search' />
                <Tab label='Category Search' />
            </Tabs>
            <TabPanel value={mode} index={0}>
                <Box sx={{ display: 'flex' }}>
                    <TextField
                        inputRef={keywordInput}
                        size='small'
                        sx={{ ml: 1, flex: 1 }}
                        label='Keyword Search (esc. to clear)'
                        variant='outlined'
                        inputProps={{
                            'aria-label': 'keyword search (escape key to clear)'
                        }}
                        onKeyDown={handleKeyWordKeydown}
                        onChange={handleKeywordChange}
                        value={keyword}
                    />
                    <IconButton
                        type='button'
                        onClick={searchByKeyword}
                        sx={{ ml: '5px', p: '8px' }}
                        aria-label='search'
                    >
                        <SearchIcon />
                    </IconButton>
                </Box>
            </TabPanel>
            <TabPanel value={mode} index={1}>
                <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    size='small'
                    options={ampSDK.getValues()}
                    getOptionLabel={(option) => option.name || ''}
                    sx={{
                        width: '100%',
                        marginTop: '0',
                        paddingLeft: '8px'
                    }}
                    value={storedValue}
                    onChange={(event, val) => {
                        if (val !== null) {
                            console.log("VALUE", val)
                            searchByCategory(val.slug)
                        }
                    }}
                    onClose={() => {
                        ampSDK.setHeight(200)
                    }}
                    onOpen={() => {
                        ampSDK.setHeight(540)
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label={ampSDK.label} />
                    )}
                />
            </TabPanel>

            {/* Search Results */}
            {results.length ? (
                <>
                    <Typography
                        mt={2}
                        variant='h3'
                        fontSize={'12px'}
                        fontWeight={'normal'}
                        color='#666'
                    >
                        Search Results
                    </Typography>
                    <ImageList
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexWrap: 'wrap'
                        }}
                        rowHeight={140}
                    >
                        {results
                            .slice(
                                (page - 1) * itemsPerPage,
                                page * itemsPerPage
                            )
                            .map((product: any, index: number) => {
                                return (
                                    <ProductTile
                                        key={
                                            index +
                                            page * itemsPerPage +
                                            product.id
                                        }
                                        dataType={ampSDK?.type}
                                        size={140}
                                        product={product}
                                        selectProduct={selectProduct}
                                    />
                                )
                            })}
                    </ImageList>
                    {noOfPages > 1 && (
                        <Pagination
                            count={noOfPages}
                            page={page}
                            onChange={handlePageChange}
                            defaultPage={1}
                        />
                    )}
                </>
            ) : (
                <></>
            )}
        </div>
    )
}

export default ProductSelector
