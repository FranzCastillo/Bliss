import React from 'react'
import {getProductData} from "../../../fetchProducts";
import "./LateralCartCard.scss"
import {useEffect, useState} from 'react';

const CartProductCard = ({id, quantity, size}) => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const fetchedProduct = await getProductData(id)
            setProduct(fetchedProduct)
        }
        fetchData()
    }, []);

    const imageURL = process.env.REACT_APP_STORAGE_URL + product.imageUrl + ".png"

    return (
        <div className='card-container' >
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
            </div>
            <div className={"product-total"}>
                {/*Formats to 2 decimals*/}
                <h1>Q.{(product.price * quantity).toFixed(2)}</h1>
            </div>
        </div>
    )
}

export default CartProductCard;