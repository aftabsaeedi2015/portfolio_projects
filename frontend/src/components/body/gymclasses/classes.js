import {Box,Paper } from '@mui/material'
import React from 'react'
import StyledCard from '../../styledComponents/styledClassCard'
import {useTheme,ThemeProvider} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'
import {motion} from 'framer-motion'
import  cardio from '../../../assets/11.jpg'
import  powerlifting from '../../../assets/22.jpg'
import  aerobics from '../../../assets/21.jpg'



const useStyles = makeStyles((theme) => ({
    homePage2ContentContainer: {
        display: 'flex',
        height: '80vh',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        alignItems: 'center',
        [useTheme().breakpoints.down('md')]: {
          height: 'fit-content'
        }
      },
      homePage2Paper: {
        display: 'flex',
        flexDirection: 'row',
        width: 'match-parent',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        [useTheme().breakpoints.down('md')]: {
          justifyContent: 'center'
        },
        [useTheme().breakpoints.down('lg')]: {
          justifyContent: 'center'
        },
      },
}))
function ClassPricing(props) {
    const classes = useStyles()
  return (
    <motion.div
    className={classes.homePage2ContentContainer}
    initial={{ y: 500,opacity: 0 }}
    transition={{ duration: 0.5 }}
    whileInView={{ y: 0, opacity: 1 }}
    >
            <Paper className={classes.homePage2Paper} sx={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
              <StyledCard
              session = {'cardio'}
              picture = {cardio}
              title={props.gymClasses[0].title}
              description={props.gymClasses[0].description}
              />
              <StyledCard
              session = {'aerobics'}
              picture = {aerobics}
              title={props.gymClasses[1].title}
              description={props.gymClasses[1].description}
              />
              <StyledCard
              session = {'boxing'}
              picture = {powerlifting}
              title={props.gymClasses[2].title}
              description={props.gymClasses[2].description}
              />
            </Paper>
        </motion.div>
  )
}

export default ClassPricing
