import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Grid} from '@mui/material/';

const ProductDetails = () => {
    const cart = useContext(ShoppingCartContext);
    const location = useLocation();
    const product = location.state?.product;
    const [selectedSize, setSelectedSize] = useState(product.sizes[1]); 
    const imageURL = import.meta.env.VITE_STORAGE_URL + product.imageUrl + ".png"

    const handleAddToCart = () => {
        cart.addOneProduct(product.id, selectedSize);
    };

    const handleSelectSize = (event) => {
        setSelectedSize(event.target.value); 
    };

    if (!product) {
        return <div>No se encontró información del producto</div>;
    }

    return (
        <>
            <br />
            <br />
            <Grid container 
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                >
                
                <Grid item xs={12}>
                    
                </Grid>
                <Grid item xs={12}>
                    
                </Grid>
                
                <Grid item xs={4} >
                    
                    <div>
                <br/>
                <img 
                    src={imageURL} 
                    alt={"Product image"}
                    style={{ width: "350px", height: "auto" }}
                />
            </div>
                    
                </Grid>
                <Grid item xs={4}>
                    
                    
            <div>
                <h2>{product.name}</h2>
                <p>Código: {product.code}</p>
                <p>Precio: Q{product.price}</p>
                <p>{product.detail}</p>
            </div>
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
            <br />
            <br />
            <br />
            <Button
                    variant="contained"
                    sx={{ backgroundColor: '#312D4F' }}
                    onClick={handleAddToCart}
                >
                    Agregar al carrito
                    <AddShoppingCartIcon />
            </Button>
                    
                </Grid>
                
            </Grid>
        </>
    );
};

export default ProductDetails;