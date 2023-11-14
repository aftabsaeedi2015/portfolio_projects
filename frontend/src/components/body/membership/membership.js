import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import {useTheme} from '@mui/material/styles'
import {motion} from 'framer-motion'
import {useEffect,useState} from 'react'
import axios from 'axios'

function Membership() {
    const [data,setData] = useState(null)
    var [classes,setClasses] = useState([])
    var [plan,setPlan] = useState('')
    useEffect(()=>{
        const user_id = localStorage.getItem('userId')
        axios.get('http://localhost:4000/userInfo',{params: {id: user_id}})
        .then(response=>{
            setData(response.data[0])
            setClasses(response.data[0].classes)
            setPlan(response.data[0].plan.tier)
        })
        .catch(err=>console.log(err))
    },[data])

  return (
    <motion.div
    initial={{ y: 200,opacity: 0 }}
    transition={{ duration: 0.2 }}
    whileInView={{ y: 0, opacity: 1 }}
    >
    <Container
        sx = {{
            height: 'fit-content',
            [useTheme().breakpoints.up('sm')]: {
                mt: '6rem'
            }
        }}
        >

            <Grid
            container
            direction='column'
            gap ={5}
            sx = {{
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '5px'
            }}
            pt='2rem'
            pb='2rem'
            >
            <Typography
            variant='h2'
            sx = {{
                color: 'white',
                [useTheme().breakpoints.down('md')]: {
                    fontSize: '2rem'
                }
            }}
            >
                following is your membership information
            </Typography>
            <Typography
            variant='h4'
            sx = {{
                color: 'white',
                [useTheme().breakpoints.down('md')]: {
                    fontSize: '1.5rem'
                }
            }}
            >
                {`your membership plan is ${plan}`}
            </Typography>
            <Typography
            variant='h4'
            sx = {{
                color: 'white',
                [useTheme().breakpoints.down('md')]: {
                    fontSize: '1.5rem'
                }
            }}
            >
                the training {classes.length>1 ? ' sessions ': ' session '} you can join
                {classes.length>1 ? ' are ': ' is '}
                {classes.map((c,index) =>  {
                    if(index===classes.length-1){
                        return  String(c.class)+` starting from ${c.start_date.slice(0,10)}. `
                        }
                    else return String(c.class)+` starting from ${c.start_date.slice(0,10)}, `})}
            </Typography>
            </Grid>
        </Container>
        </motion.div>
  )
}

export default Membership
