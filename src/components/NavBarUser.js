import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Button, Box, Modal} from "@mui/material";
import logo from '../media/Logo.png';
import user from '../media/Account.png';
import CartModal from './CartModal';

function NavBarUser() {
    const theme = createTheme({
        typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        }
    });

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div>
                <ThemeProvider theme={theme}>
                    <AppBar position="static" className="navbar">
                        <Toolbar>
                            <Button onClick={() => window.location.href = '/'} className="navbar-button">
                                <img src={logo} alt="Logo" style={{height: '50px'}}/>
                            </Button>
                            <div style={{width: '49%'}}  >
                                
                            </div>
                            <Button onClick={() => window.location.href = '/'} className="navbar-button">
                                <Typography variant="h6" style={{}}>
                                    Inicio
                                </Typography>
                            </Button>
                            <Button onClick={() => window.location.href = '/grid'} className="navbar-button">
                                <Typography variant="h6" style={{}}>
                                    Grid
                                </Typography>
                            </Button>
                            <Button onClick={() => window.location.href = '/productos'} className="navbar-button">
                                <Typography variant="h6" style={{}}>
                                    Productos
                                </Typography>
                            </Button>
                            <Button onClick={handleOpen} className="navbar-button">
                                <Typography variant="h6" style={{}}>
                                    Carrito
                                </Typography>
                            </Button>
                            <Button onClick={() => window.location.href = '/login'} className="navbar-button">
                                <Typography variant="h6" style={{}}>
                                    Cerrar Sesión
                                </Typography>
                            </Button>
                            <Button onClick={() => window.location.href = '/perfil'} className="navbar-button">
                                <img src={user} alt="User" style={{ height: '45px'}}/>
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <CartModal open={open} handleClose={handleClose} />
                </ThemeProvider>
            </div>
        </>
    )
}

export default NavBarUser
