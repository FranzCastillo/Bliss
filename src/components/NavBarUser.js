import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { Link } from 'react-router-dom';
import logo from '../media/Logo.png';
import user from '../media/Account.png';

function NavBarUser() {
    const theme = createTheme({
        typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        }
    });

  return (
    <div>
        <ThemeProvider theme={theme}>
            <AppBar position="static" className="navbar" >
                <Toolbar>
                    <Link to="/" className="navbar-link">
                        <img src={logo} alt="Logo" style={{ height: '50px' }} />
                    </Link>
                    <Link to="/" className="navbar-link">
                        <Typography variant="h6" style={{marginLeft: "590px"}}>
                            Inicio
                        </Typography>
                    </Link>
                    <Link to="/productos" className="navbar-link">
                        <Typography variant="h6" style={{marginLeft: "40px" }}>
                            Productos
                        </Typography>
                    </Link>
                    <Link to="/carrito" className="navbar-link">
                        <Typography variant="h6" style={{marginLeft: "40px" }}>
                            Carrito
                        </Typography>
                    </Link>
                    <Link to="/login" className="navbar-link">
                        <Typography variant="h6" style={{marginLeft: "40px" }}>
                            Cerrar Sesión
                        </Typography>
                    </Link>
                    <Link to="/perfil" className="navbar-link">
                        <img src={user} alt="User" style={{ marginLeft: "40px", height: '45px' }} />
                    </Link>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    </div>
  )
}

export default NavBarUser