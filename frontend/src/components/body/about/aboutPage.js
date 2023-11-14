import { Box, Container, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material'
import React from 'react'
import {motion} from 'framer-motion'
import { makeStyles,ThemeProvider } from '@mui/styles';
import {useTheme} from '@mui/material/styles'
import theme from '../../theme';
import profile1 from '../../../assets/staff.jpg'
import profile2 from '../../../assets/staff1.jpg'
import profile3 from '../../../assets/staff2.jpg'
import profile4 from '../../../assets/staff3.jpg'



const createstyle = makeStyles((theme) => ({
    title: {
        color: 'white',
        fontSize: '30px',
        alignSelf: 'self'
    },
    para: {
        color: 'white'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        alignItems: 'center',
      },
}))

function AboutPage() {
    const classes = createstyle(theme)
    const trainers = [
        {id: 1, name: 'christina', class: 'boxing', description: '2 years of experience in boxing',image: profile1},
        {id: 2, name: 'ashley', class: 'boxing', description: '2 years of experience in boxing',image: profile2},
        {id: 3, name: 'charlie', class: 'boxing', description: '2 years of experience in boxing',image: profile3},
        {id: 4, name: 'nina', class: 'boxing', description: '2 years of experience in boxing',image: profile4},
    ]
    const aboutus = {
      'our story':
        'Our journey began X years ago when we envisioned a space that would not only transform bodies but also foster a sense of belonging and support. Gym Name was born out of our love for fitness and our desire to share the benefits of a healthy lifestyle with our community.',
      'our mission':
        'At Gym Name, our mission is clear: to empower individuals of all fitness levels to lead healthier, happier lives. We believe in the power of fitness to transform lives, boost confidence, and create lasting positive change.',
      'meet our trainers':
        'Our experienced team of certified trainers is the heart and soul of Gym Name. With diverse backgrounds and specializations, they bring a wealth of knowledge and expertise to every workout session. Whether it is strength training, cardio, yoga, or specialized classes, our trainers are here to guide and motivate you every step of the way.',
      'what we offer':
        'Personalized Training: Tailored fitness plans to meet your unique goals. Group Classes: A variety of classes to keep you motivated and engaged. State-of-the-Art Facilities: Access to top-notch equipment and amenities. Nutritional Guidance: Expert advice to fuel your body for success.',
      'our approach':
        'At Gym Name, we believe in a holistic approach to fitness. We do not just focus on the physical aspects; we consider mental well-being, nutrition, and lifestyle choices. Our goal is to help you achieve balance and lasting results, not quick fixes.',
    };

    return (
        <ThemeProvider theme={theme}>
      <motion.div
      className={classes.container}
        initial={{ y: 500, opacity: 0 }}
        transition={{ duration: 0.4 }}
        whileInView={{ y: 0, opacity: 1 }}
      >
        <Container
        sx = {{
            marginTop: '7rem',
            padding: '1rem',
            paddingBottom: '3rem',
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: 'match-parent',
            width: 'fit-content',
            justifyContent: 'center',
            borderRadius: '5px',
            marginX: '30px',
        }}
        >
          {Object.keys(aboutus).map((key) => {
            return (
              <Grid
              mt='2rem'
              key={key}>
                <p className = {classes.title}>
                    {key}
                </p>
                <p className = {classes.para} textAlign='left'>
                {aboutus[key]}
                </p>
              </Grid>
            );
          })}
          </Container>
          <Container
            sx = {{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            marginTop: '1rem',
            padding: '1rem',
            paddingBottom: '3rem',
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: 'match-parent',
            width: 'fit-content',
            justifyContent: 'center',
            borderRadius: '5px',
            marginX: '30px',
            [useTheme().breakpoints.up('lg')]:{
                flexWrap: 'nowrap'
            }
        }}
        >
            {trainers.map((trainer) => {
               return <Card sx={{ minWidth: '300px' }} className={classes.card} variant="outlined">
                        <CardMedia
                            component="img"
                            height="150"
                            image={trainer.image}
                            alt="image"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {trainer.name}
                            </Typography>
                        </CardContent>
                    </Card>
            })}

          </Container>
      </motion.div>
      </ThemeProvider>
    );
  }

  export default AboutPage;
