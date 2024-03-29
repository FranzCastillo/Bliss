import React, { useContext, useEffect, useState } from 'react';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, Button, TextField, Grid, Typography, Avatar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartProductCard from "../../components/ShoppingCart/CartProductCard/CartProductCard";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import {supabase} from "../../supabase/client";

// Function to get the user email
const getUserEmail = async () => {
    return await supabase.auth.getSession().then((session) => {
        if (session) {
            return session.data.session.user.email;
        } else {
            return null;
        }
    });
};

// Function to get the user id
const getUserId = async () => {
    const email = await getUserEmail();

    const { data, error } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', email);

    if (error) {
        alert(error.message);
    } else {
        return data[0].id;
    }
}

// Function to get the user address
const getUserAddress = async (email) => {
    const { data, error } = await supabase
        .from('usuarios')
        .select('direccion')
        .eq('email', email);

    if (error) {
        alert(error.message);
    } else {
        return data[0].direccion;
    }
};

// Function to get the sellers
const getUserSellers = async () => {
    const { data, error } = await supabase
        .from('usuarios')
        .select('id, nombre, apellido')
        .or('rol_id.eq.2,rol_id.eq.3,rol_id.eq.4');

    if (error) {
        alert(error.message);
        return [];
    } else {
        return data.map(item => ({ id: item.id, nombre: item.nombre, apellido: item.apellido }));
    }
};

/**
 * PlaceOrder page
 * @returns PlaceOrder page
 */
function PlaceOrder() {
    const navigate = useNavigate();
    const cart = useContext(ShoppingCartContext);

    const [names, setNames] = useState([]);

    const [email, setEmail] = useState('');
    const [hasSalesPerson, setHasSalesPerson] = useState(true);
    const [address, setAddress] = useState('');
    const [salesPerson, setSalesPerson] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(3);

    const saveOrderInDB = async () => {
        const userId = await getUserId();

        // Save the order in the database
        const { data, error } = await supabase
            .from('pedidos')
            .insert([{
                usuario_id: userId,
                fecha: new Date(),
                estado: 'Pendiente',
                direccion: address,
                pago_id: paymentMethod,
                    vendedor_id: salesPerson,
            }]);

        // Get the id of the order
        let orderId = 0;
        await supabase
            .from('pedidos')
            .select('id')
            .eq('usuario_id', userId)
            .order('id', { ascending: false })
            .limit(1)
            .then((data) => {
                orderId = data.data[0].id;
            });

        // Save the products of the order in the database
        const promises = cart.items.map(async (item) => {
            await supabase.from('productos_del_pedido').insert([
                {
                    pedido_id: orderId,
                    producto_id: item.id,
                    cantidad: item.quantity,
                    talla: item.size,
                },
            ]);
        });

        await Promise.all(promises);
    }

    // Function to clear the cart in the database
    const clearCartInDb = async () => {
        const user = window.localStorage.getItem('user');
        const {data:userData, error:userError} = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', user)
        if (userData){
            const {error:CartError} = await supabase
            .from('productos_en_carrito')
            .delete()
            .eq('usuario_id', userData[0].id)
            if (CartError){
                console.log(CartError.message)
            }
        }
    }

    // Function to clear the cart in the context
    const handleSubmit = (event) => {
        event.preventDefault()
        cart.clearCart()
        localStorage.removeItem('cart')
        clearCartInDb()
        saveOrderInDB().then(r => navigate('/order-placed'));
    };

    const handleSalesPersonCheckbox = (event) => {
        setHasSalesPerson(!event.target.checked);
    }

    const handleSalesPersonChange = (event) => {
        const selectedNames = event.target.value; 
        setSalesPerson(selectedNames);
    }

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    }

    const productCards = {
        padding: "25px",
        border: "1px solid #e0e0e0",
        marginTop: "25px"
    }

    // Get the user email and address
    useEffect(() => {
        getUserEmail().then((email) => {
            setEmail(email || '');
            getUserAddress(email).then((address) => {
                setAddress(address);
            })
        });
    }, []);

    const [securityLevel, setSecurityLevel] = useState();

    // Get the sellers
    useEffect(() => {
        getUserSellers().then((sellerNames) => {
            setNames(sellerNames);
        });
    }, []);

    // Get the security level of the user
    useEffect(() => {
        async function getUserMail() {
        const userData = await supabase.auth.getUser();
        if (userData) {
            const { data, error } = await supabase
            .from("usuarios")
            .select("rol_id")
            .eq("email", userData.data.user.email);
            if (data) {
            setSecurityLevel(data[0].rol_id);
            }
            if (error) {
            console.log(error);
            }
        }
        }

        getUserMail();
    }, []);

    // Check if the user cart is empty
    useEffect(() => {
        if (cart.getTotal() === 0) {
            navigate('/grid');
        }
    }, [cart.getTotal()]);


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <ShoppingCartCheckoutIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Detalles de la Orden
                </Typography>
                {/*Form*/}
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                        
                        <FormControl fullWidth required>
                            <InputLabel id="demo-simple-select-label">Vendedor</InputLabel>
                                <Select
                                    labelId="salesman-selection-label"
                                    id="salesman-selection"
                                    label="PaymentMethod"
                                    value={salesPerson}
                                    onChange={handleSalesPersonChange}
                                    disabled={!hasSalesPerson}
                                >
                                    {names.map((seller) => (
                                        <MenuItem
                                            key={`${seller.id}`}
                                            value={`${seller.id}`}
                                        >
                                            {`${seller.nombre} ${seller.apellido}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControlLabel
                                value="bottom"
                                control={<Checkbox/>}
                                label="No tengo vendedor"
                                labelPlacement="bottom"
                                onChange={handleSalesPersonCheckbox}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="address"
                                label="Dirección de Entrega"
                                name="address"
                                onChange={(event) => setAddress(event.target.value)}
                                value={address}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel id="demo-simple-select-label">Método de Pago</InputLabel>
                                <Select
                                    labelId="payment-method-label"
                                    id="payment-method"
                                    value={paymentMethod}
                                    label="PaymentMethod"
                                    onChange={handlePaymentMethodChange}
                                >
                                    <MenuItem value={1}>Efectivo</MenuItem>
                                    <MenuItem value={2}>Depósito Bancario</MenuItem>
                                    <MenuItem value={3}>Crédito</MenuItem>
                                    <MenuItem value={4}>Tarjeta de Crédito</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Confirmar Orden
                    </Button>
                </Box>
                <div className={"product-cards"} style={productCards}>
                    <div className={"text"}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6" component="h2"
                        >
                            Mi Carrito
                        </Typography>
                        <Typography>
                            Total: Q.{cart.getTotal()}
                        </Typography>
                    </div>
                    <Stack>
                        {cart.items.map((item) => {
                            return (
                                <CartProductCard
                                    key={item.id}
                                    id={item.id}
                                    quantity={item.quantity}
                                    size={item.size}
                                    style="order"
                                />
                            );
                        })}
                    </Stack>
                </div>
            </Box>
        </Container>
    )
}

export default PlaceOrder