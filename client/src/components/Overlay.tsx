import React from 'react'

interface OverlayProps {
    children: React.ReactNode
}
const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return (
    <div className='fixed w-screen h-screen flex justify-center z-[200] pl-[-11.5rem] ml-[-9.9rem] mt-[-1.5rem] '>
        {children }
        </div>
  )
}

export default Overlay