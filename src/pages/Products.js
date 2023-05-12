import React from 'react'
import {Box, Button} from "@mui/material";
import {FetchProducts} from "../fetchProducts";
import {ShoppingCartContext} from "../contexts/ShoppingCartContext";
import {useEffect, useState} from 'react';

function Products() {
    const cart = React.useContext(ShoppingCartContext);

    const [fetchedProducts, setFetchedProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
        const fetchedData = await FetchProducts();
        setFetchedProducts(fetchedData);
        }
        fetchData();
    }, []);

    return (
        <Box>
            <h1>Productos</h1>
            {fetchedProducts.map((product) => {
                return (
                    <Box key={product.id}>
                        <Button variant="contained" color="primary" onClick={() => {}}>
                            {product.name}
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => {cart.removeOneProduct(product.id)}}>
                            -
                        </Button>
                        <Button variant="contained" color="success" onClick={() => {cart.addOneProduct(product.id)}}>
                            +
                        </Button>
                    </Box>
                );
            })}
        </Box>
    );

}

export default Products