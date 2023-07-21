import React, { useContext, useEffect, useState } from 'react';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartProductCard from "../../components/ShoppingCart/CartProductCard/CartProductCard";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import {supabase} from "../../supabase/client";

const getUserEmail = async () => {
    return await supabase.auth.getSession().then((session) => {
        if (session) {
            return session.data.session.user.email;
        } else {
            return null;
        }
    });
};

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

function PlaceOrder() {
    const navigate = useNavigate();
    const cart = useContext(ShoppingCartContext);

    const [email, setEmail] = useState('');
    const [hasSalesPerson, setHasSalesPerson] = useState(true);
    const [address, setAddress] = useState('');
    const [salesPerson, setSalesPerson] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(3);

    const saveOrderInDB = async () => {
        const userId = await getUserId();
        // Create the registry in the database
        const { data, error } = await supabase
            .from('pedidos')
            .insert([{
                usuario_id: userId,
                fecha: new Date(),
                estado: 'Pendiente',
                direccion: address,
                pago_id: paymentMethod,
            }]);

        // Gets the id of the new registry
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

        // saves the products in the database
        const promises = cart.items.map(async (item) => {
            await supabase.from('productos_del_pedido').insert([
                {
                    pedido_id: orderId,
                    producto_id: item.id,
                    cantidad: item.quantity,
                },
            ]);
        });

        await Promise.all(promises);

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        saveOrderInDB();
        // navigate('/order-placed');
    };


    const handleSalesPersonCheckbox = (event) => {
        setHasSalesPerson(!event.target.checked);
    }

    const handleSalesPersonChange = (event) => {
        setSalesPerson(event.target.value);
    }

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    }

    const productCards = {
        padding: "25px",
        border: "1px solid #e0e0e0",
    }

    useEffect(() => {
        getUserEmail().then((email) => {
            setEmail(email || '');
            getUserAddress(email).then((address) => {
                setAddress(address);
            })
        });
    }, []);

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
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Nombre del Vendedor"
                                name="salesman"
                                onChange={handleSalesPersonChange}
                                value={hasSalesPerson ? salesPerson : ''}
                                disabled={!hasSalesPerson}
                            />
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