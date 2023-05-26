import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@mui/material/';

const ProductDetails = () => {
    const cart = useContext(ShoppingCartContext);
    const location = useLocation();
    const product = location.state?.product;

    const handleAddToCart = () => {
        cart.addOneProduct(product.id);
    };

    if (!product) {
        return <div>No se encontró información del producto</div>;
    }

    return (
        <>
            <div>
                <br/>
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div>
                <h2>{product.name}</h2>
                <p>{product.detail}</p>
                <p>Código: {product.code}</p>
                <p>Precio: Q{product.price}</p>
            </div>
            <FormControl>
            <FormLabel id="demo-talla">Talla</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-talla"
                name="demo-talla"
            >
                <FormControlLabel value="35" control={<Radio />} label="35" />
                <FormControlLabel value="36" control={<Radio />} label="36" />
                <FormControlLabel value="37" control={<Radio />} label="37" />
                <FormControlLabel value="38" control={<Radio />} label="38" />
                <FormControlLabel value="39" control={<Radio />} label="39" />
                
            </RadioGroup>
            </FormControl>
            <br />
            <Button
                    variant="contained"
                    sx={{ backgroundColor: '#312D4F' }}
                    onClick={handleAddToCart}
                >
                    Agregar al carrito
                    <AddShoppingCartIcon />
            </Button>
            <br/> <br/>
        </>
    );
};

export default ProductDetails;