import {Snackbar,Alert,CardHeader,Box,Typography,Card, Grid, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import theme from '../theme'
import {makeStyles, ThemeProvider} from '@mui/styles'
import StyledButton from '../styledComponents/styledButton'
import { useSelector,useDispatch } from 'react-redux'
import { Link,useNavigate} from 'react-router-dom'



const handleBuyingMembership=(loginStatus,setSnackbarOpen,navigate,tier_name)=>{

    loginStatus? navigate(`/${tier_name}/dateselection`):setSnackbarOpen(true)
}
const createstyle = makeStyles((theme) => ({

    card: {
        width: 'match-parent',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'red',
    },
    borderStyle: {
        borderBottom: '1px solid #e0e0e0'

    },
    greenBorderStyle: {
        width: 'fit-content',
        borderBottom: '1px solid green'
    },

}))

function StyledPricingCard({item}) {
    const navigate = useNavigate()
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)
    const loginStatus = useSelector(state=>state.login)
    const classes = createstyle(theme)
    const dispatch= useDispatch()
    return (
            <Grid
            item
            xs={8}
            sm={7}
            md={4}
            lg={4} key={item.id}
            xl={4}
            >
            <Card variant="outlined" key={item.id} className={classes.card} sx ={{height: '100%',backgroundColor: 'white'}}>
                <CardHeader
                className={classes.borderStyle}
                 title={item.tier_name}
                 subheader={item.duration}
                />
                    <List>
                    <ListItemText align='left' primary='services' className={classes.greenBorderStyle}/>
                        {item.tier.map((service)=>{
                            return <ListItem
                            // incrementing the id so that each child has unique id
                            key = {item.id++}
                            className={classes.borderStyle}
                            >
                                {String(service)}
                            </ListItem>
                        })}
                    </List>

                    <Box>
                        <Typography variant="h5">
                            {item.price}
                        </Typography>
                        <StyledButton onClick={()=>{
                            handleBuyingMembership(loginStatus,setSnackbarOpen,navigate,item.tier_name);
                            }}>
                                Join
                        </StyledButton>
                    </Box>
            </Card>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={()=>setSnackbarOpen(false)}>
                    <Alert onClose={()=>setSnackbarOpen(false)} severity="error">
                    Please Login!
                    <Link to='/'>
                    <StyledButton
                    sx = {{
                        mt: '0px',
                        ml: '5px',
                        height: '25px',
                        border: '1px solid green',
                        '&:hover': {
                        backgroundColor: 'green'
                        }
                    }}
                    onClick={()=>dispatch({type: 0})}
                    >
                        Login
                    </StyledButton>
                    </Link>
                </Alert>
            </Snackbar>
        </Grid>
    )
}

export default StyledPricingCard
