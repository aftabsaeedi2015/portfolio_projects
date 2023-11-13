import React from 'react'
import StyledPricingCard from '../../styledComponents/styledPricingCard'
import { Snackbar,Alert,CardHeader,Box,Typography,Card, Grid, List, ListItem, ListItemText } from '@mui/material'
import {useTheme} from '@mui/material/styles'
import theme from '../../theme'
import {makeStyles, ThemeProvider} from '@mui/styles'
import {motion} from 'framer-motion'

const premium_tier = [
  'access to gym facilities',
  'use of fitness equipment',
  'group fitness classes',
  'personal training sessions',
  'locker room and shower facilities',
  'towerl services',
  'access to swimming pool, sauna , and other amenities',
  'access to 3 select locations'

]
const standard_tier = [
  'access to gym facilities',
  'use of fitness equipment',
  'locker room and shower facilities',
  'towerl services'
]
const basic_tier= [
  'access to gym facilities',
  'use of fitness equipment'
]

const pricing = [
  {id: 1, tier_name: 'Premium', tier: premium_tier, duration: '1 month', price: '200 $'},
  {id: 2, tier_name: 'Standard', tier: standard_tier, duration: '1 month', price: '130 $'},
  {id: 3, tier_name: 'Basic', tier: basic_tier, duration: '1 month', price: '70 $'}
]

const createstyle = makeStyles((theme) => ({
  container: {
      display: 'flex',
      height: 'fit-content',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      alignItems: 'center',
    },

}))
function Pricing ()  {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const classes = createstyle(theme)
  return (
    <ThemeProvider theme={theme}>
        <motion.div
        className={classes.container}
        initial={{ y: 500,opacity: 0 }}
        transition={{ duration: 0.4 }}
        whileInView={{ y: 0, opacity: 1 }}>
        <Grid
        sx ={{
            marginTop: '7rem',
            padding: '1rem',
            paddingBottom: '3rem',
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: 'match-parent',
            width: 'fit-content',
            justifyContent: 'center',
            borderRadius: '5px',
            [theme.breakpoints.down('md')]: {
                marginTop: '1rem',
                marginX: '30px',
                gap: '1rem'

            }
        }}
         direction='row'
         container
         spacing={1}
         alignItems="stretch"
         justifyContent='center'>
      <StyledPricingCard item = {pricing[0]}/>
      <StyledPricingCard item = {pricing[1]}/>
      <StyledPricingCard item = {pricing[2]}/>
    </Grid>
    </motion.div>
    </ThemeProvider>
  )
}
export default Pricing
