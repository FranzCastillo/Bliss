import '../styles/navbar.scss';
import React, {useEffect, useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import {Badge, Button} from "@mui/material";
import logo from '../media/Logo.png';
import CartModal from './ShoppingCart/CartModal';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../supabase/client';
import {ShoppingCartContext} from "../contexts/ShoppingCartContext";
import Swal from "sweetalert2";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

/**
 * Navbar component
 * @returns Navbar
*/
function NavBarUser() {

    const navigate = useNavigate();

    /**
     * Variable to get the number of products in the cart from the context, using function getTotalQuantity from ShoppingCartContext
     * @type {number}
     */
    const cart = React.useContext(ShoppingCartContext);
    const totalQuantity = cart.getTotalQuantity();

    const StyledBadge = styled(Badge)(({theme}) => ({
        '& .MuiBadge-badge': {
            right: 15,
            top: 5,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const theme = createTheme({
        typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        }
    });

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleLogOut = async () => {
        Swal.fire({
            title: 'Estás a punto de cerrar sesión',
            text: "¿Estás seguro que quieres cerrar sesión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#201b40',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Sesión cerrada',
                    'Tu sesión ha sido cerrada',
                    'success'
                )
                try {
                    await supabase.auth.signOut().then(
                        window.localStorage.removeItem('cart'),
                        window.localStorage.removeItem('user'),
                        cart.clearCart(),
                        navigate("/login")
                    );
                } catch (error) {
                    console.log('Error signing out:', error.message);
                }
            }
        })
    }
    const [securityLevel, setSecurityLevel] = useState()
    useEffect(() => {
        async function getUserMail() {
            const userData = await supabase.auth.getUser()
            if (userData) {
                const {
                    data,
                    error
                } = await supabase.from("usuarios").select("rol_id").eq("email", userData.data.user.email)
                if (data) {
                    setSecurityLevel(data[0].rol_id)
                }
                if (error) {
                    console.log(error)
                }
            }
        }

        getUserMail()
    })
    const isSeller = securityLevel === 2
    const isManager = securityLevel === 3
    const isAdmin = securityLevel === 4


    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleSideOpen = () => setDrawerOpen(true);
    const handleSideClose = () => setDrawerOpen(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 810);

    // This effect will run once on component mount and whenever window is resized
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 810);
        };

        // Attach the event listener
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderNormalMenu = () => {
        return (
            <>
                <div style={{width: '80%'}}> </div>
                {/* Order hyperlink (for admins only) */}
                {isAdmin && (
                    <Button onClick={() => navigate('/all-orders')} className="navbar-button" id="ords"
                            data-testid="ords">
                        <Typography variant="h6" style={{}}>
                            Ordenes
                        </Typography>
                    </Button>
                )}
                {isManager && (
                    <Button onClick={() => navigate('/all-orders')} className="navbar-button" id="ords"
                            data-testid="ords">
                        <Typography variant="h6" style={{}}>
                            Ordenes
                        </Typography>
                    </Button>
                )}
                {/* My order hyperlink (for sellers only) */}
                {isSeller && (
                    <Button onClick={() => navigate('/my-orders')} className="navbar-button" id="ords"
                            data-testid="ords">
                        <Typography variant="h6" style={{}}>
                            Mis Ordenes
                        </Typography>
                    </Button>
                )}

                {/*
                <Button onClick={() => navigate('/grid')} className="navbar-button" id="prods" data-testid="prods">
                    <Typography variant="h6" style={{}}>
                        Productos
                    </Typography>
                </Button>
                */}

                {/* Products hyperlink (for all users) */}
                <Button onClick={() => navigate('/grid')} className="navbar-button" id="prods" data-testid="prods">
                    <svg width="28px" height="28px" viewBox="0 0 24 24">
                        <title>Productos</title>
                        <path d="M21.6167,9.0879l-1.4287-5A1.5067,1.5067,0,0,0,18.7456,3H5.2544A1.5067,1.5067,0,0,0,3.812,4.0879l-1.4287,5A1.5,1.5,0,0,0,3.8257,11H4v7.5A2.503,2.503,0,0,0,6.5,21h7a.5.5,0,0,0,0-1h-7A1.5017,1.5017,0,0,1,5,18.5V11H19v3.5a.5.5,0,0,0,1,0V11h.1743a1.5,1.5,0,0,0,1.4424-1.9121Zm-1.043.7134A.4969.4969,0,0,1,20.1743,10H3.8257a.4993.4993,0,0,1-.48-.6377l1.4287-5A.5011.5011,0,0,1,5.2544,4H18.7456a.5011.5011,0,0,1,.48.3623l1.4287,5A.4961.4961,0,0,1,20.5737,9.8013Z" stroke="#201B40" strokeWidth="0.8"></path> 
                        <path d="M19.3535,19.6465l-1.77-1.77a2.5074,2.5074,0,1,0-.707.707l1.77,1.77a.5.5,0,0,0,.707-.707ZM14,16.5a1.5,1.5,0,1,1,2.5709,1.0471c-.0043.004-.01.0053-.0143.0095s-.0055.01-.0095.0143A1.4977,1.4977,0,0,1,14,16.5Z" stroke="#201B40" strokeWidth="0.8"></path> 
                    </svg>
                </Button>                            

                {/*
                <Button onClick={() => navigate('/')} className="navbar-button" id="home1">
                    <svg fill="#201B40" width="25px" height="25px" viewBox="0 0 92 92">
                        <path id="XMLID_100_" d="M88,49c-1,0-2-0.4-2.8-1.1L46,9.6L6.8,47.9c-1.6,1.5-4.1,1.5-5.7-0.1c-1.5-1.6-1.5-4.1,0.1-5.7l42-41
                        c1.6-1.5,4-1.5,5.6,0l42,41c1.6,1.5,1.6,4.1,0.1,5.7C90.1,48.6,89,49,88,49z M79.2,88V48.9c0-2.2-1.8-4-4-4c-2.2,0-4,1.8-4,4V84
                        H58.7V62.6c0-2.9-2.4-5.3-5.3-5.3H38.6c-2.9,0-5.3,2.4-5.3,5.3V84H20.8V48.9c0-2.2-1.8-4-4-4s-4,1.8-4,4V88c0,2.2,1.8,4,4,4h20.5
                        c2.2,0,4-1.8,4-4V65.3h9.5V88c0,2.2,1.8,4,4,4h20.5C77.5,92,79.2,90.2,79.2,88z"/>
                    </svg>
                </Button>
                */}

                {/* Cart hyperlink (for all users) */}
                <StyledBadge badgeContent={totalQuantity} color='primary'>
                    <Button onClick={handleOpen} className="navbar-button" id="cart">
                        <svg fill="#201B40" width="25px" height="25px" viewBox="0 0 92 92">
                            <title>Carrito</title>
                            <path id="XMLID_1732_" d="M91.8,27.3L81.1,61c-0.8,2.4-2.9,4-5.4,4H34.4c-2.4,0-4.7-1.5-5.5-3.7L13.1,19H4c-2.2,0-4-1.8-4-4
                                s1.8-4,4-4h11.9c1.7,0,3.2,1.1,3.8,2.7L36,57h38l8.5-27H35.4c-2.2,0-4-1.8-4-4s1.8-4,4-4H88c1.3,0,2.5,0.7,3.2,1.7
                                C92,24.7,92.2,26.1,91.8,27.3z M36.4,70.3c-1.7,0-3.4,0.7-4.6,1.9c-1.2,1.2-1.9,2.9-1.9,4.6c0,1.7,0.7,3.4,1.9,4.6
                                c1.2,1.2,2.9,1.9,4.6,1.9s3.4-0.7,4.6-1.9c1.2-1.2,1.9-2.9,1.9-4.6c0-1.7-0.7-3.4-1.9-4.6C39.8,71,38.1,70.3,36.4,70.3z M72.3,70.3
                                c-1.7,0-3.4,0.7-4.6,1.9s-1.9,2.9-1.9,4.6c0,1.7,0.7,3.4,1.9,4.6c1.2,1.2,2.9,1.9,4.6,1.9c1.7,0,3.4-0.7,4.6-1.9
                                c1.2-1.2,1.9-2.9,1.9-4.6c0-1.7-0.7-3.4-1.9-4.6S74,70.3,72.3,70.3z"/>
                        </svg>
                    </Button>
                </StyledBadge>

                {/*
                <Button onClick={() => navigate('/perfil')} className="navbar-button">
                    <svg fill="#201B40" width="25px" height="25px" viewBox="0 0 92 92" >
                        <path d="M46,57.1c14.8,0,26.9-12.1,26.9-27C72.9,15.1,60.8,3,46,3S19.1,15.1,19.1,30C19.1,45,31.2,57.1,46,57.1z
                            M46,11c10.4,0,18.9,8.5,18.9,19c0,10.5-8.5,19-18.9,19s-18.9-8.5-18.9-19C27.1,19.5,35.6,11,46,11z M58.5,59.7
                            c-1.3-0.4-2.8-0.1-3.8,0.8L46,67.9l-8.7-7.4c-1.1-0.9-2.5-1.2-3.8-0.8C27.9,61.5,0,71.1,0,85c0,2.2,1.8,4,4,4h84c2.2,0,4-1.8,4-4
                            C92,71.1,64.1,61.5,58.5,59.7z M10.1,81c4.4-4.7,15-9.9,23.8-12.9l9.5,8.1c1.5,1.3,3.7,1.3,5.2,0l9.5-8.1
                            c8.8,3.1,19.4,8.3,23.8,12.9H10.1z"/>
                    </svg>
                </Button>
                */}

                {/* Sign off hyperlink (for all users) */}
                <Button onClick={handleLogOut} className="navbar-button" id="logout">
                    <svg fill="#201B40" width="25px" height="25px" viewBox="0 0 92 92">
                        <title>Cerrar Sesión</title>
                        <path d="M60,60.7V79c0,2.2-1.6,4-3.8,4H4c-2.2,0-4-1.8-4-4V13c0-2.2,1.8-4,4-4h52.2c2.2,0,3.8,1.8,3.8,4v18.3 c0,2.2-1.8,4-4,4s-4-1.8-4-4V17H8v58h44V60.7c0-2.2,1.8-4,4-4S60,58.5,60,60.7z M90.8,43L75.2,27.2c-1.6-1.6-4.1-1.6-5.7,0 c-1.6,1.6-1.6,4.1,0,5.7l8.9,9L29.9,42c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c0,0,0,0,0,0l48.5-0.1l-8.9,9c-1.6,1.6-1.5,4.1,0,5.7 c0.8,0.8,1.8,1.2,2.8,1.2c1,0,2.1-0.4,2.8-1.2l15.7-15.8C92.4,47.1,92.4,44.6,90.8,43z"/>
                    </svg>
                </Button>

            </>
        );
    };

    {/* Mobile navbar for adaptability */}
    const renderMobileMenu = () => {
        
        const toggleDrawer = (open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }
            setDrawerOpen(open);
        };
    
        const list = () => (
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <List style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <div>
                        <ListItem  onClick={() => navigate('/')} className="navbar-button" id="home" data-testid="home">
                            <ListItemIcon>
                                <svg fill="#201B40" width="25px" height="25px" viewBox="0 0 50 50">
                                    <polygon points="35,10 15,25 35,40"/>
                                </svg>
                            </ListItemIcon>
                            <ListItemText primary={'Regresar'}/>
                        </ListItem>
                    </div>
                    
                    <Divider />

                    <div>
                        {/* Orders hyperlink (for admins only) */}
                        {isAdmin && (
                            <ListItem  onClick={() => navigate('/all-orders')} className="navbar-button" id="ords" data-testid="ords">
                                <ListItemIcon>
                                    <svg fill="#201B40" width="25px" height="25px" viewBox="0 0 92 92" >
                                        <path d="M46,57.1c14.8,0,26.9-12.1,26.9-27C72.9,15.1,60.8,3,46,3S19.1,15.1,19.1,30C19.1,45,31.2,57.1,46,57.1z
                                            M46,11c10.4,0,18.9,8.5,18.9,19c0,10.5-8.5,19-18.9,19s-18.9-8.5-18.9-19C27.1,19.5,35.6,11,46,11z M58.5,59.7
                                            c-1.3-0.4-2.8-0.1-3.8,0.8L46,67.9l-8.7-7.4c-1.1-0.9-2.5-1.2-3.8-0.8C27.9,61.5,0,71.1,0,85c0,2.2,1.8,4,4,4h84c2.2,0,4-1.8,4-4
                                            C92,71.1,64.1,61.5,58.5,59.7z M10.1,81c4.4-4.7,15-9.9,23.8-12.9l9.5,8.1c1.5,1.3,3.7,1.3,5.2,0l9.5-8.1
                                            c8.8,3.1,19.4,8.3,23.8,12.9H10.1z"/>
                                    </svg>
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'}/>
                            </ListItem>
                        )}
                        
                        {isManager && (
                            <ListItem onClick={() => navigate('/all-orders')} className="navbar-button" id="ords" data-testid="ords">
                                <ListItemIcon>
                                    <svg fill="#201B40" width="25px" height="25px" viewBox="0 0 92 92" >
                                        <path d="M46,57.1c14.8,0,26.9-12.1,26.9-27C72.9,15.1,60.8,3,46,3S19.1,15.1,19.1,30C19.1,45,31.2,57.1,46,57.1z
                                            M46,11c10.4,0,18.9,8.5,18.9,19c0,10.5-8.5,19-18.9,19s-18.9-8.5-18.9-19C27.1,19.5,35.6,11,46,11z M58.5,59.7
                                            c-1.3-0.4-2.8-0.1-3.8,0.8L46,67.9l-8.7-7.4c-1.1-0.9-2.5-1.2-3.8-0.8C27.9,61.5,0,71.1,0,85c0,2.2,1.8,4,4,4h84c2.2,0,4-1.8,4-4
                                            C92,71.1,64.1,61.5,58.5,59.7z M10.1,81c4.4-4.7,15-9.9,23.8-12.9l9.5,8.1c1.5,1.3,3.7,1.3,5.2,0l9.5-8.1
                                            c8.8,3.1,19.4,8.3,23.8,12.9H10.1z"/>
                                    </svg>
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'}/>
                            </ListItem>
                        )}
                        
                        {/* My orders hyperlink (for sellers only) */}
                        {isSeller && (
                            <ListItem onClick={() => navigate('/my-orders')} className="navbar-button" id="ords" data-testid="ords">
                                <ListItemIcon>
                                    <svg fill="#201B40" width="25px" height="25px" viewBox="0 0 92 92" >
                                        <path d="M46,57.1c14.8,0,26.9-12.1,26.9-27C72.9,15.1,60.8,3,46,3S19.1,15.1,19.1,30C19.1,45,31.2,57.1,46,57.1z
                                            M46,11c10.4,0,18.9,8.5,18.9,19c0,10.5-8.5,19-18.9,19s-18.9-8.5-18.9-19C27.1,19.5,35.6,11,46,11z M58.5,59.7
                                            c-1.3-0.4-2.8-0.1-3.8,0.8L46,67.9l-8.7-7.4c-1.1-0.9-2.5-1.2-3.8-0.8C27.9,61.5,0,71.1,0,85c0,2.2,1.8,4,4,4h84c2.2,0,4-1.8,4-4
                                            C92,71.1,64.1,61.5,58.5,59.7z M10.1,81c4.4-4.7,15-9.9,23.8-12.9l9.5,8.1c1.5,1.3,3.7,1.3,5.2,0l9.5-8.1
                                            c8.8,3.1,19.4,8.3,23.8,12.9H10.1z"/>
                                    </svg>
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'}/>
                            </ListItem>
                        )}
                        
                        {/* Products hyperlink (for all users) */}
                        <ListItem onClick={() => navigate('/grid')} className="navbar-button" id="prods" data-testid="prods">
                            <ListItemIcon>
                                <svg width="28px" height="28px" viewBox="0 0 24 24">
                                    <title>Productos</title>
                                    <path d="M21.6167,9.0879l-1.4287-5A1.5067,1.5067,0,0,0,18.7456,3H5.2544A1.5067,1.5067,0,0,0,3.812,4.0879l-1.4287,5A1.5,1.5,0,0,0,3.8257,11H4v7.5A2.503,2.503,0,0,0,6.5,21h7a.5.5,0,0,0,0-1h-7A1.5017,1.5017,0,0,1,5,18.5V11H19v3.5a.5.5,0,0,0,1,0V11h.1743a1.5,1.5,0,0,0,1.4424-1.9121Zm-1.043.7134A.4969.4969,0,0,1,20.1743,10H3.8257a.4993.4993,0,0,1-.48-.6377l1.4287-5A.5011.5011,0,0,1,5.2544,4H18.7456a.5011.5011,0,0,1,.48.3623l1.4287,5A.4961.4961,0,0,1,20.5737,9.8013Z" stroke="#201B40" strokeWidth="0.8"></path> 
                                    <path d="M19.3535,19.6465l-1.77-1.77a2.5074,2.5074,0,1,0-.707.707l1.77,1.77a.5.5,0,0,0,.707-.707ZM14,16.5a1.5,1.5,0,1,1,2.5709,1.0471c-.0043.004-.01.0053-.0143.0095s-.0055.01-.0095.0143A1.4977,1.4977,0,0,1,14,16.5Z" stroke="#201B40" strokeWidth="0.8"></path> 
                                </svg>
                            </ListItemIcon>
                            <ListItemText primary={'Productos'}/>
                        </ListItem>
                        
                        {/* Cart hyperlink (for all users) */}
                        <ListItem onClick={handleOpen} className="navbar-button" id="cart">
                            <ListItemIcon>
                                <StyledBadge badgeContent={totalQuantity} color='primary'>
                                    <svg fill="#201B40" width="25px" height="25px" viewBox="0 0 92 92">
                                        <title>Carrito</title>
                                        <path id="XMLID_1732_" d="M91.8,27.3L81.1,61c-0.8,2.4-2.9,4-5.4,4H34.4c-2.4,0-4.7-1.5-5.5-3.7L13.1,19H4c-2.2,0-4-1.8-4-4
                                            s1.8-4,4-4h11.9c1.7,0,3.2,1.1,3.8,2.7L36,57h38l8.5-27H35.4c-2.2,0-4-1.8-4-4s1.8-4,4-4H88c1.3,0,2.5,0.7,3.2,1.7
                                            C92,24.7,92.2,26.1,91.8,27.3z M36.4,70.3c-1.7,0-3.4,0.7-4.6,1.9c-1.2,1.2-1.9,2.9-1.9,4.6c0,1.7,0.7,3.4,1.9,4.6
                                            c1.2,1.2,2.9,1.9,4.6,1.9s3.4-0.7,4.6-1.9c1.2-1.2,1.9-2.9,1.9-4.6c0-1.7-0.7-3.4-1.9-4.6C39.8,71,38.1,70.3,36.4,70.3z M72.3,70.3
                                            c-1.7,0-3.4,0.7-4.6,1.9s-1.9,2.9-1.9,4.6c0,1.7,0.7,3.4,1.9,4.6c1.2,1.2,2.9,1.9,4.6,1.9c1.7,0,3.4-0.7,4.6-1.9
                                            c1.2-1.2,1.9-2.9,1.9-4.6c0-1.7-0.7-3.4-1.9-4.6S74,70.3,72.3,70.3z"/>
                                    </svg>
                                </StyledBadge>
                            </ListItemIcon>
                            <ListItemText primary={'Carrito'}/>
                        </ListItem>

                    </div>

                    <Divider />
                    
                    {/* Sign off hyperlink (for all users) */}
                    <div>
                        <ListItem onClick={handleLogOut} className="navbar-button" id="logout">
                            <ListItemIcon>
                                <svg fill="#201B40" width="25px" height="25px" viewBox="0 0 92 92">
                                    <title>Cerrar Sesión</title>
                                    <path d="M60,60.7V79c0,2.2-1.6,4-3.8,4H4c-2.2,0-4-1.8-4-4V13c0-2.2,1.8-4,4-4h52.2c2.2,0,3.8,1.8,3.8,4v18.3 c0,2.2-1.8,4-4,4s-4-1.8-4-4V17H8v58h44V60.7c0-2.2,1.8-4,4-4S60,58.5,60,60.7z M90.8,43L75.2,27.2c-1.6-1.6-4.1-1.6-5.7,0 c-1.6,1.6-1.6,4.1,0,5.7l8.9,9L29.9,42c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c0,0,0,0,0,0l48.5-0.1l-8.9,9c-1.6,1.6-1.5,4.1,0,5.7 c0.8,0.8,1.8,1.2,2.8,1.2c1,0,2.1-0.4,2.8-1.2l15.7-15.8C92.4,47.1,92.4,44.6,90.8,43z"/>
                                </svg>
                            </ListItemIcon>
                            <ListItemText primary={'Cerrar Sesion'} />
                        </ListItem>
                    </div>
                </List>
            </Box>
        );
    
        return (
            <div>
                <React.Fragment>
                    <Button onClick={handleSideOpen} className="navbar-button" id="menu">
                        <svg fill="#201B40" width="25px" height="25px" viewBox="0 0 24 24">
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                        </svg>
                    </Button>
                    <Drawer anchor="left" open={drawerOpen} onClose={handleSideClose}>
                        {list()}
                    </Drawer>
                </React.Fragment>
            </div>
        );
    };

    return (
        <>
            <div>
                <ThemeProvider theme={theme}>
                    <AppBar position="static" className="navbar" name={"navbar"}>
                        <Toolbar>
                            <img
                                onClick={() => navigate('/')}
                                src={logo} alt="Logo"
                                style={{height: '50px'}}
                                className="navbar-logo"
                                id="home"
                            />
                            
                            {isMobile ? (
                                renderMobileMenu()
                            ) : (
                                renderNormalMenu()
                            )}
                            
                        </Toolbar>
                    </AppBar>
                    <CartModal open={open} handleClose={handleClose}/>
                </ThemeProvider>
                <div className='separator'></div>
            </div>
        </>
    )
}

export default NavBarUser
