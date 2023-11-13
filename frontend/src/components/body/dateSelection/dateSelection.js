import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, Typography,Box } from '@mui/material';
import {makeStyles} from '@mui/styles'
import theme from '../../theme';
import { motion } from 'framer-motion';
import StyledButton from '../../styledComponents/styledButton';
import { Link,useLocation } from 'react-router-dom';
import axios from 'axios';


const styles = makeStyles((theme) => ({
  dateSelector: {
        '& .MuiInputBase-root': {
          color: 'white'
        },
        '& .MuiFormLabel-root': {
          color: 'white'
        },
        '& fieldset': {
          border: '1px solid white'
        }
        ,
        '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          color: 'white',
          border: '1px solid white',
        },
        '& button': {
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: 'gray'
          }

        }
  },
  parentContainer: {
    marginTop: '7rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'

  }
  ,
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px'
  },
  containerItem: {
    width: 'fit-content',

  }
}))
var classOrPlan=''
function identifyClassOrPlanJoined(url){
  const regex = /\/([a-z A-Z]+)\//;
  const match = url.match(regex);
  classOrPlan= match[1]
  if (['Premium', 'Standard', 'Basic'].includes(classOrPlan)) {
  return classOrPlan
  }
  return classOrPlan
}
const handlePayment = (date,planOrClassJoined)=>{
  const user_id = localStorage.getItem('userId')
  const info = {
    "id": user_id,
    "joining_date": date
    }
  if (['Premium', 'Standard', 'Basic'].includes(planOrClassJoined)) {
      axios.post(`http://localhost:4000/${planOrClassJoined}/buy`,info)
    }
    else {
      axios.post(`http://localhost:4000/${planOrClassJoined}/join`,info)
    }
}
function DateSelection({item}) {
  const path = useLocation().pathname
  const planOrClassJoined = identifyClassOrPlanJoined(path)
  const classes = styles(theme)
  const [value,setValue] = React.useState(null)
  return (
      <motion.div
      initial={{y: 100, opacity: 0}}
      transition={{duration: 0.3}}
      whileInView={{y: 0, opacity : 1}}
      className={classes.parentContainer}
      >
        <Box
        direction='column'
        gap={3}
        className={classes.container}
        >
          <Box
          className={classes.containerItem}
          >
            <DatePicker
            defaultValue='2023/09/23'
            label = "Select the starting Date"
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
              }
            }
            className={classes.dateSelector}
            />
          </Box>
          <Box
          className={classes.containerItem}
          >
            <Typography
            variant = 'h4'
            style = {{
            color: 'white'
            }}
            >
              {value!==null?`you can join ${planOrClassJoined} from `+value.format().slice(0,10): null}
            </Typography>
            <Link to={`/${classOrPlan}/payment`}>
              <StyledButton onClick={()=>handlePayment(value,planOrClassJoined)}>
                Make Payment
              </StyledButton>
            </Link>
          </Box>
          </Box>
        </motion.div>

  );
}
export default DateSelection
