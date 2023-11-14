
import * as React from 'react';
import {Link,useNavigate} from 'react-router-dom';

import {Box,
  Typography,
  Grid,Checkbox,
  Container,
  FormControlLabel,
  TextField,CssBaseline,
  Avatar,
  Snackbar,
  Alert
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, rgbToHex, ThemeProvider } from '@mui/material/styles';
import theme from '../../theme'
import { makeStyles, propsToClassKey } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import StyledButton from '../../styledComponents/styledButton';
import {motion} from 'framer-motion'
import axios from 'axios'



const createStyles = makeStyles((theme) => ({
    formContainer: {
        background: 'rgba(0,0,0,0.5)',
        marginTop: '5rem',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
        [useTheme().breakpoints.down('sm')]: {
            marginTop: '0rem'
        }

    },
    signupButton: {
        color: 'black'
    },
    checkbox: {
        '&.Mui-checked': {
            color: 'black',
            '& .MuiSvgIcon-root': {
              fill: 'white',
            },
          },
    },
    customFocused: {
        '& .css-1ff8729-MuiInputBase-root-MuiFilledInput-root:after': {
          borderBottom: '2px solid white',
        },
      },
    alreadyRegistered: {
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
          textDecoration: 'none',
          color: 'gray',
          cursor: 'pointer'
        }
    }
}))
export default function SignUp() {
  const navigate = useNavigate()
  const classes = createStyles(theme)
  const [snackbarOpen,setSnackbarOpen] = React.useState(false)
  const [userInfo,setUserInfo] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSnackBarClose = ()=>{
    setSnackbarOpen(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    var empty_info = false
    for (let key in userInfo){
        const value = userInfo[key];
        if (!value) {
          console.log(key)
          empty_info = true;
          break;
        }
  }
  if (!empty_info) {
    console.log(userInfo)
    const userData = {
      username:userInfo.email,
      password: userInfo.password,
      name: userInfo.firstName+" "+userInfo.lastName,
    classes: [],
    plan: {},
    is_admin: false
    }
    axios.post('http://localhost:4000/signup',userData)
    .then(response=>{
      if(Object.keys(response.data).length != 0){
        console.log('signup successfull')
    }
    else{
      console.log('unsuccessfull signup')
    }
  })
  .catch(err=>console.log(err.message))
    setSnackbarOpen(true);
    navigate('/')
  }
}

  return (
    <ThemeProvider theme={theme}>
      <motion.div
    initial={{ y: -600,opacity: 0 }}
    transition={{ duration: 0.4 }}
    whileInView={{ y: 0, opacity: 1 }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className={classes.formContainer}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" m='10px'>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  className = {classes.customFocused}
                  variant = 'filled'
                  InputLabelProps={{
                    style: { color: 'white'},
                  }}
                  onChange={handleChange}
                  error={userInfo.firstName===''? true : false}
                  helperText= {userInfo.firstName===''? "required" : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  className = {classes.customFocused}
                  variant = 'filled'
                  InputLabelProps={{
                    style: { color: 'white'},
                  }}
                  onChange={handleChange}
                  error={userInfo.lastName===''? true : false}
                  helperText= {userInfo.lastName===''? "required" : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  className = {classes.customFocused}
                  variant = 'filled'
                  InputLabelProps={{
                    style: { color: 'white'},
                  }}
                  onChange={handleChange}
                  error={userInfo.email===''? true : false}
                  helperText= {userInfo.email===''? "required" : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className = {classes.customFocused}
                  variant = 'filled'
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  InputLabelProps={{
                    style: { color: 'white'},
                  }}
                  onChange={handleChange}
                  error={userInfo.password===''? true : false}
                  helperText= {userInfo.password===''? "required" : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary"  className={classes.checkbox}/>}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <StyledButton
              type="submit"
              fullWidth
              className={classes.signupButton}
            >
              Sign Up
            </StyledButton>
            <Typography mt='1rem'>
              <Link to="/" className={classes.alreadyRegistered}>already registered ? login</Link>
            </Typography>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackBarClose}>
              <Alert onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
                signup successfull
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Container>
      </motion.div>
    </ThemeProvider>
  );
}
