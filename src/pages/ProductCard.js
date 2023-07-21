import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/productcard.scss';
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductCard = ({ product }) => {
    const cart = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate(`/product/${product.id}`, { state: { product } });
    };

    const handleAddToCart = () => {
        cart.addOneProduct(product.id);
    };

    return (
        <Card sx={{ width: '250px', height: '100%' }}>
            <Card className='img-card' sx={{ boxShadow: 'none' }}>
                <CardMedia
                    component="img"
                    className='product-img'
                    sx={{ objectFit: 'contain' }}
                    image={product.imageUrl}
                    alt={product.name}
                    onClick={handleProductClick}
                />
            </Card>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" align='left'>
                    {product.name}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div" align='left'>
                    {product.detail}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div" align='left'>
                    lolol
                </Typography>
                <Typography variant="body2" color="text.secondary" align='right'>
                    {product.code}
                </Typography>
                <Typography variant="h6" color="text.primary" align='right'>
                    Q{product.price}
                </Typography>
                <br />
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#312D4F' }}
                    onClick={handleAddToCart}
                >
                    Agregar al carrito
                    <AddShoppingCartIcon />
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
