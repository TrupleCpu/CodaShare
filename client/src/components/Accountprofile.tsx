import { useAuthContext } from '../Services/Context/AuthContextProvider'
import {  useNavigate } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import { useAppContext } from '../Services/Context/AppContextPrivder';

const Accountprofile = () => {
     const { userDetails }: any = useAuthContext();
     const { onlineUsers } = useAppContext();
     const navigate = useNavigate();
 
     const isOnline = (userID: string) => onlineUsers.includes(userID) ? 'bg-green-500' : 'bg-[gray]';

  return (
    <div className='ml-[-1rem]  absolute bottom-0 h-20  flex items-center justify-evenly gap-2  w-full'>
    <div className="flex">
    <div className="w-10 h-10  rounded-full relative">
        <img src={userDetails.profileURL} />
        <div className={`w-2 h-2 absolute ${isOnline(userDetails.userID)} rounded-full top-[1.6rem] ml-[1.6rem] border`}></div>
      </div>
      <div className="flex flex-col">
            <p className="text-sm font-semibold">{userDetails.first_name}</p>
            <p className="text-[gray] text-xs cursor-pointer ">Online </p>
      </div>
    </div>
      <div className=" relative flex justify-end ">
       <IoSettingsOutline className="text-[gray] hover:text-violet-500  cursor-pointer " onClick={() => navigate('/profile')} />
      </div>
    
    </div>
  )
}

export default Accountprofile