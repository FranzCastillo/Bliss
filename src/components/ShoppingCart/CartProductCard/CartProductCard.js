import React from 'react'
import {getProductData} from "../../../fetchProducts";
import Container from "@mui/material/Container";
import "./CartProductCard.scss"

const CartProductCard = ({id, quantity}) => {
    const product = getProductData(id);
    console.log(product)

    const cardStyle = {
        backgroundColor: "#d2d1d9",
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        borderRadius: "10px",
        paddingLeft: 0,
        marginBottom: "15px",
        color: "#201b40"
    }

    return (
        <Container fixed minWidth={"sm"} sx={cardStyle} disableGutters={true}>
            <img className={"product-image"} src={product.imageUrl} alt={"Product image"}/>
            <div className={"product-info"}>
                <h1>{product.name}</h1>
                <h4>{product.code}</h4>
            </div>
            <div className={"product-buttons"}>
            </div>
        </Container>
    )
}

export default CartProductCard;