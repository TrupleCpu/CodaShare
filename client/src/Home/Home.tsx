import  { useState } from 'react'
import Logregcon from './Logregcon';
import { getToken } from '../Services/Token/TokenService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useAppContext } from '../Services/Context/AppContextPrivder';
import { ToastContainer } from 'react-toastify';

const Home = () => {
   const [userClick, setUserclick] = useState('');
   const navigate = useNavigate();
   const locationState = useSelector((state: RootState) => state.sidebar.locationState);
   const { disableContents } = useAppContext();

   const StartNow = () => {
      if(!getToken())
         setUserclick("Signin");
      else
        navigate(locationState ? `/${locationState}` : '/dashboard');
   }
   const handleSignIn = () => {
      if (!getToken()) {
          setUserclick(userClick === "Signin" ? "" : "Signin");
      } else {
         if (locationState === 'group') {
            navigate('/group');
        } else {
            navigate(locationState ? `/${locationState}` : '/dashboard');
        }
          
      }
  };


const handleSignUp = () => {
   if(!getToken())
      setUserclick(userClick === "Signup" ? "" : "Signup")
   else 
      navigate('/dashboard')
}
  return (
    <div className='container mx-auto relative' style={{pointerEvents: disableContents ? 'none' : 'auto'}}>
     <div className="flex  font-semibold w-full h-10  items-center justify-end gap-4 px-2 py-6">
        <div >
           {userClick !== "Signin" ?   <button className='rounded-md py-1 border px-4 hover:bg-[#f7f5f5] transition-all active:scale-90' onClick={handleSignIn}>Signin </button> :   <button className='bg-[#edebeb]  rounded-md py-1 border px-4 transition-all 'disabled>Signin </button>}
        </div>
        <div>
           {userClick !== "Signup" ? <button className='rounded-md py-1 border px-4 hover:bg-[#f7f5f5] transition-all active:scale-90' onClick={handleSignUp}>Signup</button> : <button className='bg-[#edebeb] rounded-md py-1 border px-4 '  disabled>Signup</button>}
       </div>
     </div>
     <div className="w-full  background-[whitesmoke] px-2 mt-10 text-center">
      <div className="p-4 relative">
        <h1 className='xl:text-9xl lg:text-9xl md:text-9xl text-5xl font-bold text-black'>Coda<span className='text-[#6D31EDFF]'>Share</span></h1>
        <h1 className='xl:text-3xl lg:text-3xl md:text-3xl font-semibold p-4 text-[gray]'>A Collaborative Oasis for Coders.</h1>
        <button className='px-6 py-2 text-2xl border text-white bg-[#6D31EDFF] font-semibold rounded-md hover:bg-[#9060f9] transition-all' onClick={StartNow}>Start now</button>
      </div>
<div className="flex items-center justify-center">
<Logregcon userClick={userClick} setUserClick={setUserclick} />
<ToastContainer />
</div>
      </div>
     </div>
  )
}

export default Home