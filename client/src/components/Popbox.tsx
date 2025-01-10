import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

interface PopboxProps {
    children: ReactNode,
    className: string,
}

const Popbox: React.FC<PopboxProps> = ({children, className}) => {
  return (
    <motion.div
    initial={{opacity: 0, scale: 0}}
    animate={{opacity: 1, scale: 1}}
    exit={{opacity: 0, scale: 0}}
    transition={{duration: 0.2}}
    className={className}
    >
        {children}
        </motion.div> 
  )
}

export default Popbox