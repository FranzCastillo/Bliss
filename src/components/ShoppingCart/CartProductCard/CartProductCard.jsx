import React, {useEffect, useState} from 'react'
import {getProductData} from "../../../fetchProducts";
import Container from "@mui/material/Container";
import "./CartProductCard.scss"
import Button from "@mui/material/Button";
import {ShoppingCartContext} from "../../../contexts/ShoppingCartContext";

/**
 * Card for each product in the cart
 * @param id
 * @param quantity
 * @param size
 * @param style
 * @returns CartProductCard
*/
const CartProductCard = ({id, quantity, size, style}) => {
    
    const [product, setProduct] = useState([]);
    const [imageURL, setImage] = useState(' ')
    
    // Fetches the product data
    useEffect(() => {
        async function fetchData() {
            const fetchedProduct = await getProductData(id)
            setProduct(fetchedProduct)
        }

        fetchData()
    }, []);

    // Sets the image url
    useEffect(() => {
        const img = import.meta.env.VITE_STORAGE_URL + product.imageUrl + ".png"
        setImage(img)
    }, [product]);

    // Styles
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

    const buttonStyleLeft = {
        backgroundColor: "#201b40",
        color: "#d2d1d9",
        fontSize: "20px",
        fontWeight: "bold",
        width: "20px",
        height: "26px",
        borderRadius: "5px 0 0 5px",
        minWidth: "unset",
        minHeight: "unset",
        padding: 0,
        display: "flex", // Add display: flex
        alignItems: "center", // Center vertically
        justifyContent: "center", // Center horizontally
    };

    const buttonStyleRight = {
        backgroundColor: "#201b40",
        color: "#d2d1d9",
        fontSize: "20px",
        fontWeight: "bold",
        width: "20px",
        height: "26px",
        borderRadius: "0 5px 5px 0",
        minWidth: "unset",
        minHeight: "unset",
        padding: 0,
        display: "flex", // Add display: flex
        alignItems: "center", // Center vertically
        justifyContent: "center", // Center horizontally
    };

    // Context
    const cart = React.useContext(ShoppingCartContext);

    return (
        <Container fixed minWidth={"sm"} className={style} disableGutters={true}>
            <div className='img-container'>
                <img
                    className={"product-image"}
                    src={imageURL}
                    alt={"Product image"}
                />
            </div>

            <div className={"product-info"}>
                <h1>{product.name}</h1>
                <h4>Código: {product.code}</h4>
                <h4>Precio Unitario: Q.{product.price}</h4>
                <h4>Talla: {size}</h4>
                <br/>
            </div>
            <div className={"quantity"}>
                <h1>Cantidad</h1>
                <div className={"buttons"}>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        style={buttonStyleLeft}
                        onClick={() => {
                            cart.removeOneProduct(id);
                        }}
                    >
                        -
                    </Button>

                    <h3>{quantity}</h3>

                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        style={buttonStyleRight}
                        onClick={() => {
                            cart.addOneProduct(id);
                        }}
                    >
                        +
                    </Button>
                </div>
            </div>
            <div className={"product-total"}>
                {/*Formats to 2 decimals*/}
                <h1>Q.{(product.price * quantity).toFixed(2)}</h1>
            </div>
        </Container>
    )
}

export default CartProductCard;