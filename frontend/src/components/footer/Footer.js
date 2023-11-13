import { Box, Container, List, ListItem, Typography} from '@mui/material'
import React from 'react'
import theme from '../theme'
import { makeStyles } from '@mui/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {Link} from 'react-router-dom'

const styles = makeStyles((theme)=>({
    footerContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgb(0,0,0,0.7)',
        borderRadius: '5px',
        padding: '2rem'



    },
    left: {
        flexGrow: 1,
        textAlign: 'left',


    },
    right: {
        flexGrow: 1,
        textAlign: 'left'
    },
    text: {
        color: 'white'
    },
    icon: {
        marginRight: '1rem'
    }
}))


function Footer() {
    const classes = styles(theme)
  return (
    <Container
    sx = {{width: 'match-parent', backgroundColor: 'rgb(0,0,0,0.7)'}}
    className = {classes.footerContainer}
    >
    <Box
    sx = {{height: 'fit-content',width: 'match-parent',display: 'flex', flexDirection: 'row'}}
    >
        <Box className = {classes.left}>
            <Typography variant = 'h5' color='white'>
                Some Links
            </Typography>
            <List>
                <ListItem className={classes.text}>
                 <Link to="/">
                  {'Item1'}
                 </Link>
                </ListItem>
                <ListItem className={classes.text}>
                    <Link to="/">
                    {'Item2'}
                    </Link>
                </ListItem>
                <ListItem className={classes.text}>
                    <Link to="/">
                    {'Item3'}
                    </Link>
                </ListItem>
                <ListItem className={classes.text}>
                    <Link to="/">
                    {'Item4'}
                    </Link>
                </ListItem>
            </List>
        </Box>
        <Box className = {classes.right}>
        <Typography variant = 'h5' color='white' >
            Social Media
        </Typography>
        <List>
                <ListItem className={classes.text}>
                    <FacebookIcon className={classes.icon}/>
                 <Link to="/">
                    {'Facebook'}
                 </Link>
                </ListItem>
                <ListItem className={classes.text}>
                    <InstagramIcon className={classes.icon}/>
                    <Link to="/">
                    {'Instagram'}
                    </Link>
                </ListItem>
                <ListItem className={classes.text}>
                    <YouTubeIcon className={classes.icon}/>
                    <Link to="/">
                    {'Youtube'}
                    </Link>
                </ListItem>
            </List>
        </Box>
    </Box>
    </Container>
  )
}

export default Footer
