import React, {useEffect, useState} from 'react'
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import {supabase} from "../../supabase/client";
import {Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select} from "@mui/material";

const getUserEmail = () => {
    return supabase.auth.getSession().then((session) => {
        if (session) {
            return session.data.session.user.email;
        } else {
            return null;
        }
    });
};

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

const handleSubmit = (event) => {
    event.preventDefault();

    // Retrieve the form values
    const { email } = event.target.elements;
};

function PlaceOrder() {
    const [email, setEmail] = useState('');
    const [hasSalesPerson, setHasSalesPerson] = useState(true);
    const [address, setAddress] = useState('');
    const [salesPerson, setSalesPerson] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(3);

    const handleSalesPersonCheckbox = (event) => {
        setHasSalesPerson(!event.target.checked);
    }

    const handleSalesPersonChange = (event) => {
        setSalesPerson(event.target.value);
    }

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    }

    useEffect(() => {
        getUserEmail().then((email) => {
            setEmail(email || '');
            getUserAddress(email).then((address) => {
                setAddress(address);
            })
        });
    }, []);

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
                                xs={8}
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
                                control={<Checkbox />}
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
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Método de Pago</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
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
            </Box>
        </Container>
    )
}

export default PlaceOrder