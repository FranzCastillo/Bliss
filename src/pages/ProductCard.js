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
    
    const imageURL = process.env.REACT_APP_STORAGE_URL + product.imageUrl + ".png"
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
            <Card className='img-card' sx={{ boxShadow: 'none' }}>
                <CardMedia
                    component="img"
                    className='product-img'
                    sx={{ objectFit: 'contain' }}
                    image={imageURL}
                    alt={product.name}
                    onClick={handleProductClick}
                />
            </Card>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" align='left'>
                    {product.name}
                    <FormControl >
                        <FormLabel  id="demo-radio-buttons-group-label" style={{ fontSize: '14px', color: '#201B40' }} >
                            Talla
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={product.sizes[1]}
                            name="radio-buttons-group"
                            style={{ fontSize: '12px' }} 
                            onChange={handleSelectSize}
                        >
                        {product.sizes.slice(1).map((talla) => (
                            <FormControlLabel
                                key={talla}
                                value={talla}
                                control={<Radio 
                                    sx={{
                                        '& .MuiSvgIcon-root': {
                                        fontSize: 18,
                                        color: '#201B40',
                                        },
                                    }}
                                
                                />}
                                label={talla.toString()}
                            />
                        ))}

                        </RadioGroup>
                </FormControl>
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
