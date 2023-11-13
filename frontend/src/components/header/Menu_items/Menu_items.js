import * as React from 'react';
import Button from '@mui/material/Button';
import { Menu, MenuItem,AppBar,Toolbar, Typography, Tab, Tabs, Drawer} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import StyledButton from '../../styledComponents/styledButton';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

// styles
const useStyles = makeStyles((theme)=> ({
    toolbar : {
        backgroundColor:'black'
    },
    appbar : {
        opacity: 0.7
    },
    singup: {
        marginTop: '-1rem'
    },
    tabItem:{
        transition: '0.5s',
        color:'black',
        width:'100%',
        textAlign:'left',
        '&:hover': {
            borderBottom: '1px solid black',
            color: 'white',backgroundColor: 'black'
        }

    }
}));


export default function Menu_items() {
    const loginStatus = useSelector(state => state.login)
    const profileMenuStatus = useSelector(state => state.profileMenu)
    const tabMenuFocusValue = useSelector(state => state.tabMenu)
    const dispatch = useDispatch()
    const classes = useStyles()
    const theme = useTheme();
    const matchesMobileSize = useMediaQuery(theme.breakpoints.down('md'));
    const handleChange = (e,value) => {
        dispatch({type: value})
    }
    const handleProfileMenuClose = () => {
        dispatch({type: 'closeProfileMenu'})
    }
    const handleProfileMenuOpen= (e) => {
        setProfileMenuAnchorEl(e.target)
        dispatch({type: 'openProfileMenu'})
    }
    const handleMenuItemClick = (event) => {
        dispatch({type: 'closeProfileMenu'})
        switch(event.target.textContent){
            case 'My Membership':
                console.log('my membership');
                break;
            case 'Logout':
                dispatch({type: 'logout'})
                dispatch({type: 0})
                console.log('logged out');
                break;
        }
    }
    const handleMenuIconClick = () => {
        setDrawerOpen(true)
    }

    const handleDrawerClose = () => {
        setDrawerOpen(false)
    }
    const handleSignup = ()=>{
        dispatch({type: 0})
    }
    // const [tabMenuFocusValue,setTabMenuFocusValue]=React.useState(0)
    const [profileMenuAnchorEl,setProfileMenuAnchorEl] = React.useState(null)
    const [drawerOpen,setDrawerOpen] = React.useState(null)

    return <>
        <Drawer open = {drawerOpen} anchor={'left'} onClose={handleDrawerClose}>
            <div style={{display:'flex',flexDirection:'column'}}>
                <Tab label="Home" className={classes.tabItem}  onClick = {handleDrawerClose} component={Link} to='/'/>
                <Tab label="Classes" className={classes.tabItem} component={Link} onClick = {handleDrawerClose} to='/classes'/>
                <Tab label="Pricing" className={classes.tabItem} component={Link} onClick = {handleDrawerClose} to='/pricing'/>
                <Tab label="About Us" className={classes.tabItem} component={Link} onClick = {handleDrawerClose}to='/aboutus'/>
                <Tab label="Contact Us" className={classes.tabItem} component={Link} onClick = {handleDrawerClose} to='contactus/'/>
                <Tab label="Blog" className={classes.tabItem} component={Link} onClick = {handleDrawerClose} to='/blog'/>
            </div>
        </Drawer>
        <AppBar position="static" className={classes.appbar} >
            <Toolbar className={classes.toolbar}>
            {matchesMobileSize!==true? null : <MenuIcon onClick = {handleMenuIconClick}/>}
            { matchesMobileSize ? null : <>
                <FitnessCenterIcon/>
                <Tabs value = {tabMenuFocusValue} onChange={handleChange}>
                    <Tab label="Home" sx={{color:'white'}} component={Link} to='/' onClick={()=>{setDrawerOpen(false)}}/>
                    <Tab label="Classes" sx={{color:'white'}} component={Link} to='/classes'/>
                    <Tab label="Pricing" sx={{color:'white'}} component={Link} to='/pricing'/>
                    <Tab label="About Us" sx={{color:'white'}} component={Link} to='/aboutus'/>
                    <Tab label="Contact Us" sx={{color:'white'}} component={Link} to='/contactus'/>
                    <Tab label="Blog" sx={{color:'white'}} component={Link} to='/blog'/>
                    <Tab label=''/>
                </Tabs>
                </>
            }
                <div style={{display:'flex',marginLeft:'auto'}}>
                    {
                    !loginStatus?
                        <StyledButton
                        sx = {{
                            mt: '0',
                            mr: '1rem',
                            color:'black',
                            border: '1px solid white'
                            }}
                            component={Link}
                            to='/signup'
                            onClick={handleSignup}
                            >
                            SignUp
                        </StyledButton>: null
                        }

                        {
                        loginStatus?
                        <StyledButton
                        variant="outlined"
                        endIcon={<ArrowDropDownIcon/>}
                        onClick={handleProfileMenuOpen}
                        sx = {{mt: '0',mr: '1rem',color:'black', border: '1px solid white'}}>
                            <AccountBoxIcon/></StyledButton>:
                            null
                            }
                <Menu
                 id="profileMenu"
                 anchorEl={profileMenuAnchorEl}
                 open={profileMenuStatus}
                 onClose={handleProfileMenuClose}
                 >
                    <Link to="/membership" style={{ textDecoration: 'none', color: 'black' }}>
                        <MenuItem onClick={handleMenuItemClick}>My Membership</MenuItem>
                    </Link>
                    <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                        <MenuItem onClick={handleMenuItemClick}>Logout</MenuItem>
                    </Link>
                </Menu>
                </div>
                </Toolbar>
    </AppBar>
    </>
}
