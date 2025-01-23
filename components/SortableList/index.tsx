import React, { useState, useCallback, useEffect } from "react";
import { ImageList } from "@mui/material";
import {Card} from "./Card";
import update from "immutability-helper"
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend"

export interface Item {
    id: number
    product: any
}

const SortableList = ({ selectedProducts, updateSelected, removeProduct, dataType }) => {

    const [cards, setCards] = useState(selectedProducts)

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: Item[]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as Item],
                ],
            }),
        )
    }, [])

    const updateCard = (product: any) => {
        const p = cards.find(prod => prod.id === product.id)
        if(p){
            p.selectedVariant = product.selectedVariant
        }
        updateSelected(cards)
    }

    useEffect(() => {
        updateSelected(cards)
    }, [cards, updateSelected])

    useEffect(() => {
        setCards(selectedProducts)
    }, [selectedProducts])

    return (
        <>
            {cards.length ?
                <>
                    <ImageList 
                        sx={{ width: '100%', display: 'flex', flexWrap: 'wrap'}}
                        rowHeight={140}
                        gap={10}
                    >
                        <DndProvider backend={HTML5Backend}>
                        {cards.map((product: any, index: number) => {
                            return (
                                <Card
                                    key={product.id}
                                    index={index}
                                    id={product.id}
                                    product={product}
                                    moveCard={moveCard}
                                    removeProduct={removeProduct}
                                    updateCard={updateCard}
                                    dataType={dataType}
                                    size={140}
                                />
                            )
                        })} 
                        </DndProvider>
                    </ImageList>
                </>
                : 
                <></>
            }
        </>
    );
};

export default SortableList;
