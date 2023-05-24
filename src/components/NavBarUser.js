import '../styles/navbar.css';
import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Button} from "@mui/material";
import logo from '../media/Logo.png';
import CartModal from './ShoppingCart/CartModal';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../supabase/client';


function NavBarUser() {

    const navigate = useNavigate();

    const theme = createTheme({
        typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        }
    });

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleLogOut = async () => {
        try {
            navigate("/login")
            await supabase.auth.signOut();
        } catch (error) {
            console.log('Error signing out:', error.message);
        }

    }

    return (
        <>
            <div>
                <ThemeProvider theme={theme}>
                    <AppBar position="static" className="navbar">
                        <Toolbar>
                            <img 
                                onClick={() => window.location.href = '/'} 
                                src={logo} alt="Logo" 
                                style={{height: '50px'}}
                                className="navbar-logo"
                            />
                            
                            <div style={{width: '70%'}}> </div>

                            <Button onClick={() => navigate('/grid')} className="navbar-button">
                                <Typography variant="h6" style={{}}>
                                    Productos
                                </Typography>
                            </Button>

                            <Button onClick={handleOpen} className="navbar-button">
                                <svg fill="#201B40" width="25px" height="25px" viewBox="0 0 92 92">
                                    <path id="XMLID_1732_" d="M91.8,27.3L81.1,61c-0.8,2.4-2.9,4-5.4,4H34.4c-2.4,0-4.7-1.5-5.5-3.7L13.1,19H4c-2.2,0-4-1.8-4-4
                                        s1.8-4,4-4h11.9c1.7,0,3.2,1.1,3.8,2.7L36,57h38l8.5-27H35.4c-2.2,0-4-1.8-4-4s1.8-4,4-4H88c1.3,0,2.5,0.7,3.2,1.7
                                        C92,24.7,92.2,26.1,91.8,27.3z M36.4,70.3c-1.7,0-3.4,0.7-4.6,1.9c-1.2,1.2-1.9,2.9-1.9,4.6c0,1.7,0.7,3.4,1.9,4.6
                                        c1.2,1.2,2.9,1.9,4.6,1.9s3.4-0.7,4.6-1.9c1.2-1.2,1.9-2.9,1.9-4.6c0-1.7-0.7-3.4-1.9-4.6C39.8,71,38.1,70.3,36.4,70.3z M72.3,70.3
                                        c-1.7,0-3.4,0.7-4.6,1.9s-1.9,2.9-1.9,4.6c0,1.7,0.7,3.4,1.9,4.6c1.2,1.2,2.9,1.9,4.6,1.9c1.7,0,3.4-0.7,4.6-1.9
                                        c1.2-1.2,1.9-2.9,1.9-4.6c0-1.7-0.7-3.4-1.9-4.6S74,70.3,72.3,70.3z"/>
                                </svg>
                            </Button>

                            <Button onClick={() => navigate('/perfil')} className="navbar-button">
                                <svg fill="#201B40" width="25px" height="25px" viewBox="0 0 92 92" >
                                    <path d="M46,57.1c14.8,0,26.9-12.1,26.9-27C72.9,15.1,60.8,3,46,3S19.1,15.1,19.1,30C19.1,45,31.2,57.1,46,57.1z
                                        M46,11c10.4,0,18.9,8.5,18.9,19c0,10.5-8.5,19-18.9,19s-18.9-8.5-18.9-19C27.1,19.5,35.6,11,46,11z M58.5,59.7
                                        c-1.3-0.4-2.8-0.1-3.8,0.8L46,67.9l-8.7-7.4c-1.1-0.9-2.5-1.2-3.8-0.8C27.9,61.5,0,71.1,0,85c0,2.2,1.8,4,4,4h84c2.2,0,4-1.8,4-4
                                        C92,71.1,64.1,61.5,58.5,59.7z M10.1,81c4.4-4.7,15-9.9,23.8-12.9l9.5,8.1c1.5,1.3,3.7,1.3,5.2,0l9.5-8.1
                                        c8.8,3.1,19.4,8.3,23.8,12.9H10.1z"/>
                                </svg>
                            </Button>

                            <Button onClick={handleLogOut} className="navbar-button">
                                <svg fill="#201B40" width="25px" height="25px" viewBox="0 0 92 92">
                                    <path d="M60,60.7V79c0,2.2-1.6,4-3.8,4H4c-2.2,0-4-1.8-4-4V13c0-2.2,1.8-4,4-4h52.2c2.2,0,3.8,1.8,3.8,4v18.3 c0,2.2-1.8,4-4,4s-4-1.8-4-4V17H8v58h44V60.7c0-2.2,1.8-4,4-4S60,58.5,60,60.7z M90.8,43L75.2,27.2c-1.6-1.6-4.1-1.6-5.7,0 c-1.6,1.6-1.6,4.1,0,5.7l8.9,9L29.9,42c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c0,0,0,0,0,0l48.5-0.1l-8.9,9c-1.6,1.6-1.5,4.1,0,5.7 c0.8,0.8,1.8,1.2,2.8,1.2c1,0,2.1-0.4,2.8-1.2l15.7-15.8C92.4,47.1,92.4,44.6,90.8,43z"/>
                                </svg>
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <CartModal open={open} handleClose={handleClose}/>
                </ThemeProvider>
            </div>
        </>
    )
}

export default NavBarUser
