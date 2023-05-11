import React from 'react'
import {getProductData} from "../../../fetchProducts";
import Container from "@mui/material/Container";
import "./CartProductCard.scss"
import Button from "@mui/material/Button";

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
        color: "#201b40",
    }

    const buttonStyle = {
        backgroundColor: "#201b40",
        color: "#d2d1d9",
        borderRadius: "50%",
        fontSize: "20px",
        fontWeight: "bold",
        width: "20px",
        height: "20px",
        minWidth: "unset",
        minHeight: "unset",
        padding: 0,
        display: "flex", // Add display: flex
        alignItems: "center", // Center vertically
        justifyContent: "center", // Center horizontally
    };


    return (
        <Container fixed minWidth={"sm"} sx={cardStyle} disableGutters={true}>
            <img className={"product-image"} src={product.imageUrl} alt={"Product image"}/>
            <div className={"product-info"}>
                <h1>{product.name}</h1>
                <h4>Código: {product.code}</h4>
                <h4>Precio Unitario: Q.{product.price}</h4>
            </div>
            <div className={"quantity"}>
                <h1>Cantidad</h1>
                <div className={"buttons"}>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        style={buttonStyle}
                    >
                        -
                    </Button>

                    <h3>{quantity}</h3>

                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        style={buttonStyle}
                    >
                        +
                    </Button>
                </div>
            </div>
            <div className={"product-total"}>
                <h1>Q.{product.price * quantity}</h1>
            </div>
        </Container>
    )
}

export default CartProductCard;