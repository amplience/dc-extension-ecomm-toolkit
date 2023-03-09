/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react'
import {
    Avatar,
    Box,
    ImageListItem,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    Skeleton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import styled from '@emotion/styled'

const StyledItem = styled(Box)`
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #ddd;
    overflow: hidden;
    position: relative;
    img {
        ratio: 1;
        height: 100%;
        opacity: 1;
        filter: grayscale(0%);
        transition: all 0.8s ease;
        &.hidden {
            opacity: 0;
        }
    }
    .skel {
        display: none;
        position: absolute;
        top: 0;
        &.loading {
            display: inline-block;
        }
    }
    .actions {
        color: #f11;
        position: absolute;
        display: flex;
        flex-direction: column;
        top: 0;
        right: 0;
        z-index: 1;
        fill: none;
        outline: 2;
    }
    .text-box {
        position: absolute;
        bottom: 9px;
        left: 0;
        right: 0;
        margin: 0 9px;
        borderradius: 6px;
        display: inline-block;
        padding: 6px 10px;
        transition: all 0.8s ease;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.75);
        z-index: 1;
    }
    &:hover {
        text-decoration: none;
        img {
            filter: grayscale(65%);
        }
        .text-box {
            background: rgba(255, 255, 255, 0.95);
            border-color: #aaa;
        }
    }
`
const dragType = 'StyledItem'

interface ProductTileProps {
    product: any
    size: number
    dataType: string
    selectProduct?: Function
    removeProduct?: Function
    updateCard?: Function
}

const ProductTile = ({
    product,
    size,
    selectProduct = undefined,
    removeProduct = undefined,
    updateCard = undefined
}: ProductTileProps) => {
    const [variant, setVariant] = useState(
        product.selectedVariant ? product.selectedVariant : product.variants[0]
    )
    const [showSelectVariant, setShowSelectVariant] = useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const ref = useRef(null)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imgUrl, setImgUrl] = useState((variant.images && variant.images[0].url) || null)

    const handleClick = () => {
        if (selectProduct !== undefined) {
            selectProduct(product)
        }
    }

    const handleLoaded = () => {
        setImageLoaded(true)
    }

    useEffect(() => {
        const vari = product.selectedVariant
            ? product.selectedVariant
            : product.variants[0]
        setVariant(vari)
        if (vari.images && imgUrl !== vari.images[0].url) {
            setImageLoaded(false)
            setImgUrl(vari.images[0].url)
        }
    }, [product, imgUrl])

    const selectVariant = (variant: any, index: number) => {
        setVariant(variant)
        setSelectedIndex(index)
        product.selectedVariant = variant
        if (updateCard !== undefined) updateCard(product)
    }

    const actions = () => {
        // if removeProduct is present, it means we are in the SortableList
        if (removeProduct !== undefined) {
            return (
                <div className='actions'>
                    <IconButton
                        onClick={removeClick}
                        aria-label='delete'
                        size='small'
                    >
                        <DeleteIcon fontSize='inherit' />
                    </IconButton>
                    {/* TODO - revisit selecting product variants*/}
                    {/* {dataType === 'object' || dataType === 'objects' ? 
                        <IconButton
                            onClick={edit}
                            aria-label="delete"
                            size="small"
                        >
                            <EditIcon fontSize='inherit' />
                        </IconButton>
                        : 
                        <></>
                    } */}
                </div>
            )
        }
    }

    const edit = () => {
        setShowSelectVariant(true)
    }

    const closeEdit = () => {
        setShowSelectVariant(false)
    }

    const removeClick = () => {
        if (removeProduct !== undefined) {
            removeProduct(product)
        }
    }

    return (
        <>
            <Dialog
                fullWidth={true}
                maxWidth={'xl'}
                open={showSelectVariant}
                onClose={closeEdit}
            >
                <DialogTitle>Select Variant</DialogTitle>
                <List sx={{ width: '100%', maxWidth: 600 }}>
                    {product.variants.map((variant: any, index: number) => {
                        return (
                            <ListItemButton
                                key={index}
                                alignItems='flex-start'
                                selected={selectedIndex === index}
                                onClick={() => selectVariant(variant, index)}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        variant='square'
                                        alt={product.name}
                                        src={(variant.images && variant.images[0].url) || null}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={variant.sku}
                                ></ListItemText>
                            </ListItemButton>
                        )
                    })}
                </List>
            </Dialog>
            <StyledItem
                height={size}
                width={size}
                sx={removeProduct !== undefined ? { cursor: 'move' } : {}}
            >
                {actions()}
                <ImageListItem ref={ref} onClick={handleClick}>
                    <img
                        onLoad={handleLoaded}
                        className={!imageLoaded ? 'hidden' : ''}
                        src={`${(variant.images && variant.images[0].url)}?sw=${
                            size * 2
                        }&fit=crop&auto=format`}
                        srcSet={`${(variant.images && variant.images[0].url)}?sw=${
                            size * 2
                        }&fit=crop&auto=format&dpr=2 2x`}
                        alt={product.name}
                    />
                    <Skeleton
                        className={!imageLoaded ? 'loading skel' : 'skel'}
                        variant='rounded'
                        width={'100%'}
                        height={size}
                    />
                    <div className='text-box'>
                        <Typography mb={0.5} variant='h3' fontSize={'10px'}>
                            {product.name}
                        </Typography>
                        <Typography
                            variant='h4'
                            fontStyle={'italic'}
                            fontSize={'10px'}
                        >
                            ({product.id})
                        </Typography>
                    </div>
                </ImageListItem>
            </StyledItem>
        </>
    )
}

export default ProductTile
