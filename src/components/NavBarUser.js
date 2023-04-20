import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { Link } from 'react-router-dom';
import logo from '../media/Bliss-Logo.png';
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
            <AppBar position="static" className="my-app-bar">
                <Toolbar>
                    <img src={logo} alt="Logo" style={{ height: '50px' }} />
                    <Typography variant="h6" style={{marginLeft: "590px"}}>
                        Inicio
                    </Typography>
                    <Typography variant="h6" style={{marginLeft: "40px" }}>
                        Productos
                    </Typography>
                    <Typography variant="h6" style={{marginLeft: "40px" }}>
                        Carrito
                    </Typography>
                    <Typography variant="h6" style={{marginLeft: "40px" }}>
                        Cerrar Sesión
                    </Typography>
                    <img src={user} alt="User" style={{ marginLeft: "40px", height: '50px' }} />
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    </div>
  )
}

export default NavBarUser