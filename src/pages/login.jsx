import * as React from 'react';
import {useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useLocation, useNavigate} from 'react-router-dom';
import {supabase} from "../supabase/client.js"
import {ShoppingCartContext} from "../contexts/ShoppingCartContext";
import { signInWithEmailAndPassword, getUserDataByEmail, getCartDataByUserId} from "../supabase/supabaseUtils.js";

/**
 *
 * @param {*} props
 * @returns Copyright element
 */
function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://catalogodigital.co/app/app/bliss_guatemala_/calzado_?fbclid=IwAR2HhULr6oFCv6I1jJAQYJx0BmpIIMU20_VEcwOZ_feHVKjFV7UaCSFy-AA">
          Bliss
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
const theme = createTheme();
/**
 *
 * @returns Signin form
 */ 
export default function Login() {
    const cart = React.useContext(ShoppingCartContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [invalid, setInvalid] = React.useState();
  
    const setUser = (user) => {
      window.localStorage.setItem('user', user);
    }
  
    const setCart = async (user) => {
      try {
        const { data: userDataByEmail, error: userError } = await getUserDataByEmail(user);
        if (userDataByEmail) {
          const userId = userDataByEmail[0].id;
  
          const { data: cartData } = await getCartDataByUserId(userId);
          if (cartData) {
            cartData.forEach((item) => {
              cart.addMultipleProducts(item.producto_id, item.talla, item.cantidad);
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
  
      try {
        if (data.get("email").trim() !== "" || data.get("password").trim() !== "") {
          const email = data.get("email");
          const password = data.get("password");
  
          const { data: userData, error: userError } = await signInWithEmailAndPassword(
            email,
            password
          );
  
          if (userError) {
            setInvalid(userError.message);
          } else {
            setUser(email);
            setCart(email);
            navigate('/');
          }
        } else {
          setInvalid("Email and password are required");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        if (location.pathname === "/login" && session) {
          navigate('/');
        }
      });
      return () => {
        authListener.subscription.unsubscribe();
      };
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {/*Form container*/}
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
                    {/*Avatar*/}
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    {/*Title*/}
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {/*Form*/}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        {/*Form inputs*/}
                        <Grid container spacing={2}>
                            {/*Mail field*/}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    data-testid="email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            {/*Password field*/}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    data-testid="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        {invalid && (
                            <Typography component="p" color="red">
                                {"*" + invalid}
                            </Typography>
                        )}
                        {/*Submit button*/}
                        <Button
                            type="submit"
                            data-testid="sign-in-button"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        {/*Sign up redirect*/}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={() => navigate('/signup')} sx={{cursor: 'pointer'}} variant="body2"
                                      name="to-register">
                                    Not have an account? Sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/*Copyright element*/}
                <Copyright sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    );
}
