import '../styles/details.scss';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Grid} from '@mui/material/';
import LateralCart from "../components/LateralCart/LateralCart";

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
            <div
                className="principal"
                style={{ height: "0px", display: "flex" }}
            >
                
                <div
                    className="secondary"
                    style={{ width: "150%", display: "flex" }}
                >
                    <Grid container 
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        style={{ 
                            borderTop: '100px solid transparent',
                        }}
                        >
                        <Grid container item xs={9} spacing={0} className='container'
                            style={{ 
                                border: '2px solid #312D4F',
                                paddingBottom: '50px',
                            }}
                        >
                            <Grid item xs={6} className='image'>
                                <br/>
                                <img 
                                    src={imageURL} 
                                    alt={"Product image"}
                                    style={{ width: "350px", height: "auto"}}
                                />                    
                            </Grid>

                            <Grid item xs={5} className='details'>       
                                <div style={{ textAlign: 'left' }}>
                                    <h1 style={{ color: '#201B40' }}>{product.name}</h1>
                                    <hr />
                                    <p style={{ color: '#201B40', fontSize: '16px' }}>
                                        Precio: <span style={{ color: '#E35358', fontSize: '20px', fontWeight: 'bold' }}> 
                                                    Q{product.price} 
                                                </span>
                                    </p>
                                </div>

                                <div style={{ textAlign: 'left' }}>
                                    <FormControl >
                                        <FormLabel id="demo-radio-buttons-group-label" style={{ fontSize: '16px', color: '#201B40' }} >
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
                                                {product.sizes.map((talla) => (
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
                                    </div>
                                <br />
                                <br />
                                <br />
                                <Button
                                        variant="contained"
                                        sx={{   
                                            backgroundColor: '#E35358', 
                                            '&:hover': {
                                                backgroundColor: '#201B40',
                                            },
                                            textTransform: 'none',
                                            fontSize: '18px',
                                        }}
                                        onClick={handleAddToCart}
                                    >
                                        Agregar al carrito ‎ 
                                        <AddShoppingCartIcon />
                                </Button>   
                            </Grid>
                        </Grid>
                    </Grid>
                </div>

                <div className="third" style={{ width: "20%", display: "flex" }}>
                    <LateralCart />
                </div>

                <div className='secondary' style={{height: "100px"}}> </div>

            </div>
        
        </>
    );
};

export default ProductDetails;