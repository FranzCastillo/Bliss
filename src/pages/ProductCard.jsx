import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/productcard.scss';
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const ProductCard = ({ product }) => {
    
    const imageURL = import.meta.env.VITE_STORAGE_URL + product.imageUrl + ".png"
    const cart = useContext(ShoppingCartContext);
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState(product.sizes[1]); 

    const handleProductClick = () => {
        navigate(`/product/${product.id}`, { state: { product } });
    };

    const handleSelectSize = (event) => {
        setSelectedSize(event.target.value); 
    };

    const handleAddToCart = () => {
        cart.addOneProduct(product.id, selectedSize);
    };

    return (
        <Card sx={{ width: '250px', height: '100%' }}>
            <br/>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Card className='img-card' sx={{ boxShadow: 'none', width: '200px' }}>
                    <CardMedia
                        component="img"
                        className='product-img'
                        sx={{ objectFit: 'contain' }}
                        image={imageURL}
                        alt={product.name}
                        onClick={handleProductClick}
                    />
                </Card>
            </div>
            <br/>
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
                    Q{product.price}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
