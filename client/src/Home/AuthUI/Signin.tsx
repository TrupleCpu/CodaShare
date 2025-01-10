import  { useState } from 'react'
import { MdOutlineMail } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import {AnimatePresence, motion} from 'framer-motion';
import { IoIosClose } from "react-icons/io";
import { useAuthContext } from '../../Services/Context/AuthContextProvider';
import {SmallLoader} from '../../components/Loader/Loader';
import { useAppContext } from '../../Services/Context/AppContextPrivder';

const Signin = (props: any) => {
    const {signIn, messageLogin} = useAuthContext();
    const { setDisableContents } = useAppContext();
    const {userClick, setUserClick} = props;
    const [message, setMessage] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(true);
    const [focEmail, setFocEmail] = useState<boolean>(false);
    const [focPass, setFocPass] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loader, setLoader] = useState(false);

    const handleClose = () => {
        setVisible(false);
        setDisableContents(false)
        setTimeout(() => {
            setUserClick("")
        }, 100)
    }
   
    const logIn = async (e: any) => {
        e.preventDefault();
        if(email === '' || password === ''){
            return setMessage("Please enter your email or password.");
        }
        setDisableContents(true)
        setLoader(true)

         try {
            await signIn(email, password);
            setLoader(false)
            setDisableContents(false);
            if(messageLogin !== "Logged In"){
                return setMessage("Invalid username or password.")
            } 
         } catch (error) {
            console.error(error);
         }
    }
   
    
  
  return (
    <AnimatePresence>
    {userClick != "" && visible && <motion.div className='w-[100%] absolute flex items-center justify-center top-0'
     initial={{opacity: 0, scale: 0}}
     animate={{opacity: 1, scale: 1}}
     exit={{opacity: 0, scale: 0}}
     transition={{duration: 0.2}}
>
        <form className='bg-[#ffffff] relative border-2 mt-36 rounded-lg w-[26rem]  py-10 flex flex-col gap-2 px-10' onSubmit={logIn}>
            <div className="">
               {!loader &&  <IoIosClose className='absolute right-2 mt-[-2rem] text-4xl cursor-pointer' onClick={handleClose}/>}
            </div>
           <div className="">
               <label htmlFor="email" className={`flex text-sm ${focEmail && 'text-[#6D31EDFF]'} font-semibold mb-2`}>Email</label>
               <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} id='email' onFocus={() => setFocEmail(true)} onBlur={() => setFocEmail(false)} className='relaitve w-full h-10 rounded-sm outline-none pr-2 pl-12 focus:border-[#ae89fc] border-2  focus:text-[#4040a3] outline-[2px]' />
               <MdOutlineMail className={`absolute mt-[-28px] ${focEmail ? 'text-[#4040a3]' : 'text-[gray]'}  ml-3 text-xl`} />
           </div>
           <div className="">
           <label htmlFor="email" className={`flex text-sm ${focPass && 'text-[#6D31EDFF]'} font-semibold mb-2`}>Password</label>
           <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='relaitve w-full h-10 rounded-sm outline-none pr-2 pl-12 focus:border-[#ae89fc] border-2 focus:text-[#4040a3] outline-[2px] ' onFocus={() => setFocPass(true)} onBlur={() => setFocPass(false)} />
                <IoMdKey className={`absolute mt-[-28px] ${focPass ? 'text-[#4040a3]' : 'text-[gray]'} ml-3 text-xl`}/>
               {message && <p className='flex text-xs text-red-500'>{message}</p>}

           </div>
           <div className="">
               <p className='text-xs flex text-[#976cf6] font-semibold hover:underline cursor-pointer'>Forgot password?</p>
           </div>
           <div className="">
                  <button type="submit"className={`${loader ? 'bg-[#a883f9]' : 'bg-[#6D31EDFF]'} text-white w-full py-1 font-semibold rounded-sm cursor-pointer`} disabled={loader}>{loader ? <SmallLoader /> : 'Sign In'}</button>
           </div>
        </form>
    </motion.div>}
   </AnimatePresence>
  )
}

export default Signin