import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {motion} from 'framer-motion'
import { useTheme } from '@mui/material/styles'
import axios from 'axios'

const getId = (url)=>{
    const regex = /\/readBlogMore\/(.+)/;
    const id = url.match(regex);
    return id[1]
}

function BlogReadMore() {
    const url = useLocation().pathname
    const [blog,setBlog] = useState([])
    useEffect(()=>{
        const id = getId(url)
        axios.get(`http://localhost:4000/getpost/${id}`)
        .then((response)=>{
            setBlog(response.data[0])
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    // console.log(blogPosts)
  return (
    <motion.div
    style = {{
        position: 'absolute',
        marginTop: '6rem',
        padding: '2rem'
    }}
    initial={{ y: 500,opacity: 0 }}
    transition={{ duration: 0.4 }}
    whileInView={{ y: 0, opacity: 1 }}
    >
        <Box
        sx = {{
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '2rem',
            textAlign: 'left',
            [useTheme().breakpoints.down('md')]: {
            textAlign: 'center',
            padding: '3rem',
          },
        }}
        >
            <Typography
            sx = {{
                color: 'white',
                [useTheme().breakpoints.down('md')]: {
                    fontSize: '3rem'
                },
            }}
            variant = 'h1'
            >
                {blog.title}
            </Typography>
            <Typography
            variant = 'p'
            sx = {{
                color: 'white',
                fontSize: '25px',

            }}
            >
                {blog.paragraph}
            </Typography>
        </Box>
    </motion.div>
  )
}

export default BlogReadMore
