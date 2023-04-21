import React from 'react'
import {Box, Button} from "@mui/material";
import {fetchProducts} from "../fetchProducts";
import {ShoppingCartContext} from "../contexts/ShoppingCartContext";

function Products() {
    const cart = React.useContext(ShoppingCartContext);

    return (
        <Box>
            {console.log("CARRITO: ", cart.items)}
            <h1>Productos</h1>
            {fetchProducts().map((product) => {
                console.log(product.name, cart.getProductQuantity(product.id));
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