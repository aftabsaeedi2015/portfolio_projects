import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, FormControl, TextField, Typography,Card} from '@mui/material'
import {useTheme,ThemeProvider} from '@mui/material/styles';
import theme from '../theme';
import { makeStyles } from '@mui/styles';
import StyledButton from './styledButton';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    boxContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        width: '30vw',
        height: 'fit-content',
        // paddingBottom: '2rem',
        // padding: '1rem',
        marginBottom : '2rem',

        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flexGrow: 0,
      [useTheme().breakpoints.down('md')]: {
        width: 'fit-content',
        // marginTop: '2rem'
      },


      [useTheme().breakpoints.down('sm')]: {
        marginLeft: '0rem',
        marginTop: '2rem'
      },
      [useTheme().breakpoints.down('xs')]: {
        marginLeft: '0rem',
        marginTop: '0rem'
      },
    },
    homeHeading: {
      display: 'block',
      fontSize: '4rem',
      marginBottom: '3rem',
      fontFamily: 'serif',
      color: 'white', // Adjust the font size for mobile screens
      [useTheme().breakpoints.down('sm')]: {
        fontSize: '1rem', // Further reduce the font size for smaller screens
      },
      [useTheme().breakpoints.down('md')]: {
        fontSize: '1rem', // Further reduce the font size for smaller screens
      },
      [useTheme().breakpoints.down('lg')]: {
        fontSize: '3rem', // Further reduce the font size for smaller screens
      }
    },
    homePara: {
      fontsize: '20px',
      color: 'white',
      marginBottom: '3rem',
    },
    homePageParentContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '80vh',
      justifyContent: 'start',
      [useTheme().breakpoints.up('md')]: {
        justifyContent: 'center',
      }


    },
    homePage1ContentContainer:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: 'fit-content',
        // height: '50vh',
        marginTop : '2rem',
        borderRadius : '5px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        [useTheme().breakpoints.up('md')]: {
          padding: '3rem'
        },

        [useTheme().breakpoints.down('sm')]: {
          marginLeft: '0',
          marginTop: '0rem',
          flexDirection: 'column',
          height: 'fit-content',
          paddingBottom: '1rem'
        },
        [useTheme().breakpoints.down('md')]: {
          marginLeft: '0',
          marginTop: '0rem',
          flexDirection: 'column',
          // height: '130vh'
        }
    },
    customFocused: {
      '& .css-1ff8729-MuiInputBase-root-MuiFilledInput-root:after': {
        borderBottom: '2px solid white', // Change this to your desired color
      },
    },
    homePageForm: {
      display: 'flex',
      alignItems: 'center',
    },
  }));

const loginTheUser = false
const handleLogin = (credentials,dispatch,setIncorrectCredentialsMessage,userId)=>{
  axios.post('http://localhost:4000/login',credentials)
  .then(response=>{
    if(Object.keys(response.data).length != 0){
      dispatch({type: 'login'});
      localStorage.setItem('userId', response.data[0]._id);
      localStorage.setItem('classes', response.data[0].classes)
      localStorage.setItem('plan', response.data[0].plan)
    }
    else{
      setIncorrectCredentialsMessage(true)
    }
  })
  .catch(err=>console.log(err.message))

}
function LoginForm() {
    const loginStatus = useSelector(state => state.login)
    const [incorrectCredentialsMessage,setIncorrectCredentialsMessage] = React.useState(false)
    const classes = useStyles(theme);
    const dispatch = useDispatch()
    const [credentials,setCredentials] = React.useState({username: null,password: null})
    const userId = useSelector(state => state.userId)

  return <Box className={classes.boxContainer}>
            <Box>
            <Typography variant = 'p' className={classes.homeHeading} >
              Already registered ?
            </Typography>
            <Typography variant = 'p' className = {classes.homeHeading}>
              Login
            </Typography>
            </Box>
              <form>
              <FormControl
                className = {classes.homePageForm}>
                <TextField
                  className = {classes.customFocused}
                  sx={{mt: '1rem'}}
                  InputLabelProps={{
                    style: { color: 'white'},
                  }}
                  onChange={(event)=> {
                    setCredentials({...credentials,username: event.target.value});
                    setIncorrectCredentialsMessage(false)
                   }
                  }
                  variant = 'filled'
                  label='Email'
                  placeholder='enter email address'
                  type={'email'}/>
                <TextField
                  error = {incorrectCredentialsMessage}
                  className = {classes.customFocused}
                  InputLabelProps={{
                    style: { color: 'white'},
                  }}
                  onChange={(event)=> {
                    setCredentials({...credentials,password: event.target.value});
                    setIncorrectCredentialsMessage(false)
                      }
                    }
                  variant = 'filled'
                  label='Password'
                  placeholder='enter password'
                  helperText={incorrectCredentialsMessage?"incorrect email or password" : ""}
                  type={'password'}/>
                <StyledButton onClick={()=>{
                  handleLogin(credentials,dispatch,setIncorrectCredentialsMessage,userId);
                  }
                  }>
                  Login
                </StyledButton>
              </FormControl>
            </form>
            </Box>
}

export default LoginForm
