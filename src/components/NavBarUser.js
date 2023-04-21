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
                            <Button onClick={() => window.location.href = '/'} className="navbar-link">
                                <img src={logo} alt="Logo" style={{height: '50px'}}/>
                            </Button>
                            <Button onClick={() => window.location.href = '/'} className="navbar-link">
                                <Typography variant="h6" style={{marginLeft: "590px"}}>
                                    Inicio
                                </Typography>
                            </Button>
                            <Button onClick={() => window.location.href = '/productos'} className="navbar-link">
                                <Typography variant="h6" style={{marginLeft: "40px"}}>
                                    Productos
                                </Typography>
                            </Button>
                            <Button onClick={handleOpen} className="navbar-link">
                                <Typography variant="h6" style={{marginLeft: "40px"}}>
                                    Carrito
                                </Typography>
                            </Button>
                            <Button onClick={() => window.location.href = '/login'} className="navbar-link">
                                <Typography variant="h6" style={{marginLeft: "40px"}}>
                                    Cerrar Sesión
                                </Typography>
                            </Button>
                            <Button onClick={() => window.location.href = '/perfil'} className="navbar-link">
                                <img src={user} alt="User" style={{marginLeft: "40px", height: '45px'}}/>
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
