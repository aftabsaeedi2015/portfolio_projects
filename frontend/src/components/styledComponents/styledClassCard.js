import React from 'react'
import {Typography,Card,CardActions,CardMedia,CardContent, Collapse,Alert,Snackbar } from '@mui/material'
import {makeStyles} from '@mui/styles'
import {useTheme} from '@mui/material/styles';
import StyledButton from './styledButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSelector } from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    card: {
        margin: '2rem',
        flexBasis: 'auto',
        flexShrink: '1',
        height: 'fit-content',

      },
    button: {
        marginLeft: '2rem',
        marginTop: '0rem'
    },
    description: {
        maxWidth: '300px'
    },
    cardAction: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1rem'
    }
    }));

    const handleBuyingClass=(loginStatus,setSnackbarOpen,navigate,session)=>{
      loginStatus? navigate(`/${session}/dateselection`): setSnackbarOpen(true)
  }
function StyledCard(props) {
    const navigate = useNavigate()
    const classes = useStyles()
    const dispatch = useDispatch()
    const [open,setOpen] = React.useState(false)
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)
    const loginStatus = useSelector(state=>state.login)
  return (
    <Card sx={{ minWidth: '300px' }} className={classes.card} variant="outlined">
                  <CardMedia
                    component="img"
                    height="140"
                    image={props.picture}
                    alt="image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                    </Typography>
                    <div>
                        {open==true? <KeyboardArrowDownIcon onClick={() => {setOpen(false)}}/>:<KeyboardArrowUpIcon onClick={() => {setOpen(true)}}/>}
                    </div>
                    <Collapse in={open}>
                        <Typography variant="p" component="div" color="text.secondary" className={classes.description}>
                            {props.description}
                        </Typography>
                    </Collapse>

                  </CardContent>
                  <CardActions className={classes.cardAction}>
                    <Typography variant='p'>30$ aud per week</Typography>
                    <StyledButton
                    className={classes.button}
                    sx = {{mt: '0', ml: '2rem'}}
                    onClick={()=>{
                      handleBuyingClass(loginStatus,setSnackbarOpen,navigate,props.session);
                      }}
                    >
                      Join</StyledButton>
                  </CardActions>
                  <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={6000}
                  onClose={()=>setSnackbarOpen(false)}>
                    <Alert onClose={()=>setSnackbarOpen(false)} severity="error">
                        Please Login!
                        <Link to='/'>
                          <StyledButton
                          onClick={()=>dispatch({type: 0})}
                          sx = {{
                            mt: '0px',
                            ml: '5px',
                            height: '25px',
                            border: '1px solid green',
                            '&:hover': {
                              backgroundColor: 'green'
                            }
                          }}
                          >
                              Login
                          </StyledButton>
                        </Link>
                    </Alert>
                </Snackbar>
              </Card>
  )
}

export default StyledCard
