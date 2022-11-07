import React, { useState, useCallback, useEffect } from "react";
import {
    ImageList
} from "@mui/material";
import {Card} from "./Card";
import update from "immutability-helper"
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend"

export interface Item {
	id: number
	product: any
}

const SortableList = ({ selectedProducts, updateSelected, removeProduct = undefined }) => {

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

    useEffect(() => {
        updateSelected(cards)
    }, [cards, updateSelected])

    return (
        <>
            {cards.length ?
                <>
                    <ImageList sx={{ width: '100%', height: 240 }} cols={5} rowHeight={120}>
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
                                    size={120}
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
