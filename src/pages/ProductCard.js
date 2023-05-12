import React from 'react';
import {Card, CardMedia, CardContent, Typography, Button} from "@mui/material";
import {ShoppingCartContext} from "../contexts/ShoppingCartContext";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductCard = ({product}) => {

    const cart = React.useContext(ShoppingCartContext);

    return (
        <Card sx={{maxWidth: 800, width: '70%'}}>
            <CardMedia
                component="img"
                height="140"
                image={product.imageUrl}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" align='left'>
                    {product.name}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div" align='left'>
                    {product.detail}
                </Typography>
                <Typography variant="body2" color="text.secondary" align='right'>
                    {product.code}
                </Typography>
                <Typography variant="h6" color="text.primary" align='right'>
                    ${product.price}
                </Typography>
                <br/>
                <Button variant="contained" color="success" onClick={() => {cart.addOneProduct(product.id)}}>Agregar al carrito<AddShoppingCartIcon/></Button>
                
            </CardContent>
        </Card>
    );
};

export default ProductCard;