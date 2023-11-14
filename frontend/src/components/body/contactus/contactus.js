import React from 'react'
import {motion} from 'framer-motion'
import { createStyles,ThemeProvider } from '@mui/material/styles'
import theme from '../../theme'
import {TextField, Typography,Alert,Snackbar } from '@mui/material'
import StyledButton from '../../styledComponents/styledButton'
import Grid from '@mui/material/Unstable_Grid2'

const styles = createStyles(()=>({
    container: {
        display: 'flex',
        height: 'fit-content',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        alignItems: 'center',
        },
}))
const handleSubmit=(setSnackbarOpen,name,email,message,setEmptyInfo) => {
    if (name.length=== 0 || email.length === 0 || message.length === 0){
        setSnackbarOpen(false)
        setEmptyInfo(true)
    }
    else {
        setSnackbarOpen(true)
        setEmptyInfo(false)
    }
}
function Contactus() {
    const classes = styles(theme)
    const [snackbarOpen,setSnackbarOpen] = React.useState(false)
    const [emptyInfo,setEmptyInfo] = React.useState(false)
    const [name,setName] = React.useState('')
    const [email,setEmail] = React.useState('')
    const [message,setMessage] = React.useState('')
  return (
    <ThemeProvider theme = {theme}>
        <motion.div
            className={classes.container}
            initial={{ y: 200,opacity: 0 }}
            transition={{ duration: 0.5 }}
            whileInView={{ y: 0, opacity: 1 }}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
        <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx = {{
            marginTop: '7rem',
            padding: '1rem',
            paddingBottom: '3rem',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: '5px',
            marginX: '30px',
            width: 'fit-content',
            height: 'fit-content',
        }}
        >
            <Grid
            // xl={3}
            // md={4}
            // xs={6}
            // sm ={5}
            justifyContent="center"
            sx={{
                width: 'fit-content',
                height: 'fit-content',
              }}
            >
                <Typography variant="h5" sx = {{color: 'white'}}>
                    contact us
                </Typography>
                <TextField
                margin="normal"
                name = "fullname"
                required
                fullWidth
                autoFocus
                label="Full Name"
                variant="filled"
                InputLabelProps={{
                    style: {
                        color: 'white'
                    }
                }}
                onChange={event => setName(event.target.value)}
                error = {(name==='' && emptyInfo===true) ? true : false}
                helperText={(name==='' && emptyInfo===true) ? "required": ""}
                />
                <TextField
                margin="normal"
                required
                name = "email address"
                variant = "filled"
                InputLabelProps={{
                    style: {
                        color: 'white'
                    }
                }}
                label="Email Address"
                onChange={event => setEmail(event.target.value)}
                error = {(email==='' && emptyInfo===true) ? true : false}
                helperText={(email==='' && emptyInfo===true) ? "required": ""}
                fullWidth
                />
                <TextField
                margin="normal"
                name = "message"
                label="Message"
                fullWidth
                variant = "filled"
                InputLabelProps={{
                    style: {
                        color: 'white'
                    }
                }}
                multiline
                rows={3}
                onChange={event => setMessage(event.target.value)}
                error = {(message==='' && emptyInfo===true) ? true : false}
                helperText={(message==='' && emptyInfo===true) ? "required" : ""}
                />
                <StyledButton onClick={()=>handleSubmit(setSnackbarOpen,name,email,message,setEmptyInfo)}>
                    Submit
                </StyledButton>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={()=>setSnackbarOpen(false)}>
                    <Alert onClose={()=>setSnackbarOpen(false)} severity="success">
                        Message Submitted Successfully
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>
        </motion.div>
    </ThemeProvider>
  )
}

export default Contactus
