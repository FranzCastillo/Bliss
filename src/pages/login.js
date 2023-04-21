import * as React from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
  //Function that handles the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      //email data
      email: data.get('email'),
      //password data
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {/*Form container*/}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/*Avatar*/}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {/*Title*/}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {/*Form*/}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {/*Form inputs*/}
            <Grid container spacing={2}>
              {/*Mail field*/}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
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
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            {/*Submit button*/}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/*Sign up redirect*/}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Not have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/*Copyright element*/}
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}