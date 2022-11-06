/* eslint-disable react/jsx-no-comment-textnodes */
import React, {useRef} from 'react'
import {Box, ImageListItem, Typography, IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled'
import { useDrag, useDrop } from "react-dnd";

const StyledItem = styled(Box)`
    cursor: pointer;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    img {
        ratio: 1;
        height: 100%;
        filter: grayscale(0%);
        transition: all 0.8s ease;
    }
    .close-button {
        position: absolute;
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
        borderRadius: 6px;
        display: inline-block;
        padding: 6px 10px;
        transition: all 0.8s ease;
        background: rgba(255, 255, 255, 0.5);
        z-index: 1;
    }
    &:hover {
        text-decoration: none;
        h2 {
            //text-decoration: underline;
        }
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
    product: any;
    index: number;
    size: number;
    selectProduct?: Function;
    removeProduct?: Function;
    moveTile?: Function;
}

const ProductTile = (
    {
        product,
        index,
        size,
        selectProduct = undefined,
        removeProduct = undefined,
        moveTile = undefined
    }: ProductTileProps) => {

    const imageURL = product.variants[0].images[0].url
    const ref = useRef(null);

    const handleClick = () => {
        if(selectProduct !== undefined) {
            selectProduct(product)
        }
    }

    const close = () => {
        if(removeProduct !== undefined){
            return (
                <IconButton
                    className='close-button'
                    onClick={closeClick}
                    aria-label="delete"
                    size="small"
                >
                    <DeleteIcon />
                </IconButton>
            )    
        }
    }

    const closeClick = () => {
        if(removeProduct !== undefined){
            removeProduct(product)
        }
    }

    /* const [, drop] = useDrop({
        accept: dragType,
        hover(item) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Move the content
            if(moveTile !== undefined){
                moveTile(dragIndex, hoverIndex);
            }
            // Update the index for dragged item directly to avoid flickering when half dragged
            item.index = hoverIndex;
        },
    }) */

    /* const [{ isDragging }, drag] = useDrag(() => ({
        type: dragType,
        item: { id: product.id, index },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            };
        },
    })); */

    //drag(drop(ref));
    
    return (
        <StyledItem height={size}>
            {close()}
            <ImageListItem ref={ref} onClick={handleClick}>
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={`${imageURL}?w=${size}&h=${size}&fit=crop&auto=format`}
                    srcSet={`${imageURL}?w=${size}&h=${size}&fit=crop&auto=format&dpr=2 2x`}
                    alt={imageURL}
                    loading="lazy"
                />
                <div className='text-box'>
                    <Typography variant="h3" fontSize={'10px'}>
                        {product.name} 
                    </Typography>
                </div>
            </ImageListItem>
        </StyledItem>
    )
}

export default ProductTile
