import React, { useState } from 'react'

interface TooltipProps {
    children: React.ReactNode,
    content: React.ReactNode
}

const Tooltip:React.FC<TooltipProps> = ({children, content}) => {
    const [show, setShow] = useState<boolean>(false);
  return (
   <div
    onMouseEnter={() => setShow(true)}
    onMouseLeave={() => setShow(false)}
   className='relative'
  >
     {show && <div className=' flex absolute right-[-0.8rem] mt-9 text-xs px-1 py-1 bg-[white]  rounded-md text-[#201f1f] border-2'>
        {content}
    </div>}
     {children}
   </div>
  )
}

export default Tooltip