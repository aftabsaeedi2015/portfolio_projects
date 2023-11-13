import { Typography } from '@mui/material'
import React from 'react'
import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'

function identifyClassOrPlanJoined(url){
  const regex = /\/([a-z A-Z]+)\//;
  const match = url.match(regex);
  const classOrPlan= match[1]
  if (['Premium', 'Standard', 'Basic'].includes(classOrPlan)) {
  return `${classOrPlan} plan`
  }
  return `${classOrPlan} class`
}

function Pament({item}) {
    const gymClasses = useSelector(state => state.gymClasses)
    const cardio = gymClasses[0]
    const aerobics = gymClasses[1]
    const boxing = gymClasses[2]
    const path = useLocation().pathname
    const classOrPlanJoined = identifyClassOrPlanJoined(path)
  return (
    <Typography
    sx = {{
        mt:'6rem',
        color: 'white'
    }}
    variant='h1'>
        payment successfull for {classOrPlanJoined}
    </Typography>
  )
}

export default Pament
