import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import  { useState } from 'react'
import { IoIosClose, IoMdKey } from 'react-icons/io';
import { MdOutlineMail } from 'react-icons/md';
import { FaUser } from 'react-icons/fa'
import { SmallLoader } from '../../components/Loader/Loader';
import { useAppContext } from '../../Services/Context/AppContextPrivder';
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { useNavigate } from 'react-router-dom';

const Register = (props: any) => {
    const { setDisableContents } = useAppContext(); 
    const {setUserClick, userClick}= props;
    const navigate = useNavigate();
    
    const [visible, setVisible] = useState<boolean>(true);
    const [focEmail, setFocEmail] = useState<boolean>(false);
    const [focPass, setFocPass] = useState<boolean>(false);
    const [focName, setFocName] = useState<boolean>(false);
    const [focUserName, setFocUserName] = useState<boolean>(false);
    const [focConfEmail, setFocConfEmail] = useState<boolean>(false);
   const [fName, setFName] = useState<string>('');
   const [lName, setLName] = useState<string>('');
   const [username, setUserName] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [confEmail, setConfEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [msg, setMsg] = useState();
   const [loader, setLoader] = useState(false);

  

    const createAccount = async (e: any) => {
        e.preventDefault();          
        if(username == '' || password == ''){
            alert("Empty!");
            return;
        }
        const data = {
            fName: fName,
            lName: lName,
            username: username,
            email: email,
            password: password
        }
        setLoader(true);
        setDisableContents(true) 
        try {
         const response = await axios.post('http://localhost:5000/signup', data)
           console.log(response.data); 
           setMsg(response.data); 
           toast.success('Account created!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
            setLoader(false)
           setDisableContents(false)
           setUserClick("Signin")
        } catch(error) {
          console.log(error);
        }
       
    }

    const handleClose = () => {
      setVisible(false);
      setDisableContents(false)
      setTimeout(() => {
          setUserClick("")
      }, 100)
  }

  const handleFocus = (setFoc: any) => {
    setFoc(true);
  }
  const handleBlur = (setFoc: any) => {
    setFoc(false);
  }
  
  
  return (
    <AnimatePresence>
     {userClick != "" && visible && <motion.div className='w-[100%] absolute flex items-center justify-center top-[-6.5rem] '
     initial={{opacity: 0, scale: 0}}
     animate={{opacity: 1, scale: 1}}
     exit={{opacity: 0, scale: 0}}
     transition={{duration: 0.2}}
>
        <form className='bg-[#ffffff] relative border-2 mt-32 rounded-lg w-[26rem]  py-10 flex flex-col gap-2 px-10' onSubmit={createAccount}>
            <div className="">
                <IoIosClose className='absolute right-2 mt-[-2rem] text-4xl cursor-pointer' onClick={handleClose} />
            </div>
            <div className="flex flex-col">
           <label htmlFor="email" className={`flex text-sm ${focName && 'text-[#6D31EDFF]'} font-semibold mb-2`}>Name</label>
         <div className="flex gap-2">
         <input type="text"
          placeholder='First' 
          className='relaitve w-1/2 h-10 rounded-sm outline-none px-2
           focus:border-[#ae89fc] border-2 focus:text-[#4040a3] outline-[2px] '
            onFocus={() => handleFocus(setFocName)} onBlur={() =>handleBlur(setFocName)}
            value={fName} 
            onChange={(e) => setFName(e.target.value)}
            />
           <input type="text" 
           placeholder='Last'
            className='relaitve w-1/2 h-10 rounded-sm outline-none px-2 focus:border-[#ae89fc] border-2 focus:text-[#4040a3] outline-[2px] ' onFocus={() => handleFocus(setFocName)} onBlur={() =>handleBlur(setFocName)}
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            />
         </div>
         <div className="">
               <label htmlFor="email" className={`flex text-sm ${focUserName && 'text-[#6D31EDFF]'} font-semibold mb-2 mt-2`}>Username</label>
               <input type="text" id='text' 
               onFocus={() => handleFocus(setFocUserName)} onBlur={() => handleBlur(setFocUserName)} 
               className='relaitve w-full h-10 rounded-sm outline-none pr-2 pl-12 focus:border-[#ae89fc] border-2  focus:text-[#4040a3] outline-[2px]'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
               />
               <FaUser className={`absolute mt-[-28px] ${focUserName ? 'text-[#4040a3]' : 'text-[gray]'} ml-3 `} />
           </div>
           </div>
           <div className="">
               <label htmlFor="email" className={`flex text-sm ${focEmail && 'text-[#6D31EDFF]'} font-semibold mb-2`}>Email</label>
               <input type="text" id='
               email' onFocus={() => handleFocus(setFocEmail)} 
               onBlur={() => handleBlur(setFocEmail)} className='relaitve w-full h-10 rounded-sm outline-none pr-2 pl-12 focus:border-[#ae89fc] border-2  focus:text-[#4040a3] outline-[2px]'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               />
               <MdOutlineMail className={`absolute mt-[-28px] ${focEmail ? 'text-[#4040a3]' : 'text-[gray]'} ml-3 `} />
           </div>
           <div className="">
           <label htmlFor="email" className={`flex text-sm ${focConfEmail && 'text-[#6D31EDFF]'} font-semibold mb-2`}>Confirm Email</label>
           <input type="email" 
           className='relaitve w-full h-10 rounded-sm outline-none pr-2 pl-12 focus:border-[#ae89fc] border-2 focus:text-[#4040a3] outline-[2px] ' onFocus={() => handleFocus(setFocConfEmail)} onBlur={() => handleBlur(setFocConfEmail)} 
           value={confEmail}
           onChange={(e) => setConfEmail(e.target.value)}
           />
               <MdOutlineMail className={`absolute mt-[-28px] ${focConfEmail ? 'text-[#4040a3]' : 'text-[gray]'} ml-3 `} />

           </div>
           <div className="">
           <label htmlFor="email" className={`flex text-sm ${focPass && 'text-[#6D31EDFF]'} font-semibold mb-2`}>Password</label>
           <input type="password" className='relaitve w-full h-10 rounded-sm outline-none pr-2 pl-12 focus:border-[#ae89fc] border-2 focus:text-[#4040a3] outline-[2px] ' onFocus={() => handleFocus(setFocPass)} onBlur={() => handleBlur(setFocPass)} value={password} onChange={(e) => setPassword(e.target.value)} />
                <IoMdKey className={`absolute mt-[-28px] ${focPass ? 'text-[#4040a3]' : 'text-[gray]'} ml-3 `} />

           </div>
           <div className="">
               <p className='text-xs flex text-[#6D31EDFF] font-semibold hover:underline cursor-pointer' onClick={() => setUserClick(userClick === "Signup" ? "Signin" : "")}>Already have an account?</p>
           </div>
           <div className="">
                <button type='submit' className={`${loader ? 'bg-[#a883f9]' : 'bg-[#6D31EDFF]'} text-white w-full py-1 font-semibold rounded-sm cursor-pointer`} disabled={loader}>{loader ? <SmallLoader /> : 'Sign Up'}</button>
          
           </div>
        </form>
    </motion.div>}

  
    </AnimatePresence>
  )
}

export default Register