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
import {signUpUser} from "../supabase/supabaseUtils.js";

/**
 * Copyrigth element
 * @param {*} props
 * @returns Copyright element
 */
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit"
                  href="https://catalogodigital.co/app/app/bliss_guatemala_/calzado_?fbclid=IwAR2HhULr6oFCv6I1jJAQYJx0BmpIIMU20_VEcwOZ_feHVKjFV7UaCSFy-AA">
                Bliss
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();
/**
 * Signup form page
 * @returns Signup form
 */
export default function Signup() {
    const navigate = useNavigate();
    const location = useLocation();
    const [invalid, setInvalid] = React.useState();

    // Funtion to register a user
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const {user, error} = await signUpUser(
            data.get('firstName'),
            data.get('lastName'),
            data.get('email'),
            data.get('phone'),
            data.get('address'),
            data.get('password')
        );

        if (error) {
            setInvalid(error.message);
        } else {
            navigate("/");
        }
    };

    // Function to redirect to home if user is logged in
    useEffect(() => {
        const {data: authListener} = supabase.auth.onAuthStateChange((event, session) => {
            if (location.pathname === "/signup" && session) {
                navigate('/');
            }
        });
        return () => {
            authListener.subscription.unsubscribe()
        };
    }, [])

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
                        Sign up
                    </Typography>
                    {/*Form*/}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        {/*Form inputs*/}
                        <Grid container spacing={2}>
                            {/*First name field*/}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            {/*Last name field*/}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                />
                            </Grid>
                            {/*Mail field*/}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                />
                            </Grid>
                            {/*Phone field*/}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone number"
                                    name="phone"
                                />
                            </Grid>
                            {/*Direction field*/}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
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
                                />
                            </Grid>
                        </Grid>
                        {/*Submit button*/}
                        {invalid && (
                            <Typography component="p" color="red">
                                {"*" + invalid}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        {/*Sign in redirect*/}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={() => navigate('/login')} sx={{cursor: 'pointer'}} variant="body2">
                                    Already have an account? Sign in
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
