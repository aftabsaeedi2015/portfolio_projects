import React from 'react'
import {motion} from 'framer-motion'
import line from '../../assets/line.png'


function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function Runningman(props) {
  return (
    <>
    <motion.img
        height={props.height}
        src={props.source} alt='running'

        ease='linear'
        animate={{left: ['-5%','99%'],rotateY: ['-1']}}
        transition={{duration: props.speed,repeat: Infinity}}
        className='runningman'/>
        <motion.img
         src={line}
         alt='line'
         className='line'
        />
    </>
  )
}

export default Runningman
