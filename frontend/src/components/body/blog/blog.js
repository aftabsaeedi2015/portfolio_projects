import React, { useEffect,useState } from 'react'
import {motion} from 'framer-motion'
import Grid from '@mui/material/Unstable_Grid2'
import {useTheme} from '@mui/material/styles'
import theme from '../../theme'
import { ThemeProvider } from '@mui/styles'
import StyledBlog from '../../styledComponents/styledBlog'
import axios from 'axios'


function Blog() {
  const [blogPosts,setBlogPosts] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:4000/posts')
    .then((response)=>{
      setBlogPosts(response.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const currentTheme = useTheme()
  return (
    <ThemeProvider theme = {theme}>
      <motion.div
      initial={{ y: 500,opacity: 0 }}
      transition={{ duration: 0.4 }}
      whileInView={{ y: 0, opacity: 1 }}
      >
      <Grid
      gap={2}
      container
      direction='row'
      sx = {{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [currentTheme.breakpoints.up('sm')]: {
          mt: '6rem'
        }
      }}

      >
    {blogPosts.map((post)=>{
      return <StyledBlog blog={post}/>

    })}
    </Grid>
    </motion.div>
    </ThemeProvider>
  )
}

export default Blog
