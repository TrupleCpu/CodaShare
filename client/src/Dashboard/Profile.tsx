import Layout from './Navbar/Layout'
import { useAuthContext } from '../Services/Context/AuthContextProvider'
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { MdContentPaste } from "react-icons/md";
import { useAppContext } from '../Services/Context/AppContextPrivder';
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import Popbox from '../components/Popbox';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';
import Overlay from '../components/Overlay';


const Profile = () => {
  
  const { userDetails, logout}: any = useAuthContext();
  const { sharedCodeData, setDisableContents, disableContents }: any = useAppContext();
  const [editFullName, setEditFullName] = useState<boolean>(false);
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [editUsername, setEditUsername] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const target: any = useRef(null) ;

  const fetchData = async () => {
         
    try {
      const fetchGroup = await axios.get(`http://localhost:5000/getGroups/${userDetails.userID}`);
      console.log(fetchGroup.data.group)
      return fetchGroup.data.group
    } catch(error){
      console.log(error)
    }
}  

const {data: groupDetails} = useQuery('userGroupDetails', fetchData);

if(!groupDetails){
  return <Layout><h1 className='pl-[12rem]'>Loading...</h1></Layout>
}

const checkGroupCreated = (group: any) => {
   let i = 0;
   group.map((group: any) => {
      if(group.ownerUser === userDetails.username){
         i++;
      }
   })

   return i;
}

const checkJoinedGroup = (group: any) => {
  let i = 0;
   group.map((group: any) => {
     if(group.ownerUser !== userDetails.username){
      group.groupMembers.map((memID: any) => {
        if(memID.memberID === userDetails.userID){
          i++;
        }
    })
     }
   })

  return i;
}

const copyToClipBoard = async (e: any) => { 
  e.preventDefault();
  try {
    await navigator.clipboard.writeText(userDetails.userID);
    alert("Copied!");
  } catch (err) {
    console.log(err);
  }
}
  return (
    <Layout>
      <div className='min-h-screen bg-white container pl-[11rem] mt-[1.5rem] flex items-center flex-col' ref={target} > 
      <AnimatePresence>
         {editFullName &&  <PopFullName setOpen={setEditFullName} target={target}/>}
         {editEmail && <PopEmail setOpen={setEditEmail} target={target} />}
         {editUsername && <PopUsername setOpen={setEditUsername} target={target}/>}
         {changePassword && <PopPassword setOpen={setChangePassword} target={target} />}
         </AnimatePresence>
        <div className="mt-10 px-7 py-4 pb-10 flex flex-col  w-[90%] bg-[#e8ebed] items-center gap-5 rounded-md">
          <div className="flex justify-between items-center w-full ">
          <div className="flex items-center gap-2">
               <div className="w-20 h-20 border rounded-full">
                <img src={userDetails.profileURL} className='w-full h-full' />
               </div>
               <div>
                <p className='font-semibold text-xl'>{userDetails.username}</p>
               </div>
          </div>
          <div>
            <button className='bg-violet-500 px-4 py-1 font-semibold text-white rounded-sm'>Edit Profile</button>
          </div>
          </div>
          <div className="w-full bg-[whitesmoke] flex flex-col rounded-md">
            <div className="flex items-center justify-between p-3 border-b-2">
                  <div className="flex flex-col ">
                     <p className='text-sm font-semibold flex items-center gap-1 text-[#6c6b6b]'><MdDriveFileRenameOutline /> FULL NAME</p>
                     <p>{userDetails.first_name} {userDetails.last_name}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button className='px-6 py-1 bg-violet-500 rounded-sm text-white font-semibold' onClick={() => {
                      setEditFullName(true)
                      setDisableContents(true)
                      disableBodyScroll(target.current)
                    }}>Edit</button>
                  </div>
            </div>
            <div className="flex items-center justify-between p-3 border-b-2">
                  <div className="flex flex-col ">
                     <p className='text-sm font-semibold text-[#6c6b6b] flex items-center gap-1'><FaUserAlt/> USERNAME</p>
                     <p>{userDetails.username}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button className='px-6 py-1 bg-violet-500 rounded-sm text-white font-semibold' onClick={() =>{
                      setEditUsername(true)
                      setDisableContents(true)
                      disableBodyScroll(target.current)
                    }}>Edit</button>
                  </div>
            </div>
            <div className="flex items-center justify-between p-3">
                  <div className="flex flex-col ">
                     <p className='text-sm font-semibold text-[#6c6b6b] flex items-center gap-1'><MdEmail /> EMAIL</p>
                     <p>{userDetails.email} </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button className='px-6 py-1 bg-violet-500 rounded-sm text-white font-semibold' onClick={() => {
                      setEditEmail(true)
                      setDisableContents(true)
                      disableBodyScroll(target.current)
                      }}>Edit</button>
                  </div>
            </div>
          </div>
        </div>
        <div className='flex w-[90%] mt-10 flex-col gap-5'> 
          <div>
            <p className='text-4xl font-semibold flex gap-1 items-center'><MdManageAccounts /> Account management</p>
          </div>
         <div className="flex flex-col gap-1">
         <p className='text-lg font-semibold'>Change Password</p>
         <p className='text-xs text-[#6c6b6b]'>Click the button to get a request of changing your password</p>
          <div>
          <button className='px-4 py-2 bg-violet-500 rounded-sm text-sm font-semibold text-white' onClick={() => {
            setChangePassword(true)
            setDisableContents(true)
            disableBodyScroll(target.current)
          }}>Change password</button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
         <p className='text-lg font-semibold'>Get User ID</p>
         <p className='text-xs text-[#6c6b6b]'>Click the button to copy your user id</p>
          <div>
          <button className='px-4 py-2 bg-violet-500 rounded-sm text-sm font-semibold text-white' onClick={copyToClipBoard}>Get ID</button>
          </div>
        </div>
        <div className="flex  py-2">
          <button className='bg-[#c0bebe] text-red-500 font-semibold px-2 py-1 rounded-md hover:bg-red-500 hover:text-white active:scale-75 transition-all' onClick={logout}>Logout</button>
        </div>
         </div>
      </div>
    </Layout>
  )
}

interface PopBoxProps {
  setOpen: Dispatch<SetStateAction<boolean>>,
  target: any
}
const PopFullName: React.FC<PopBoxProps> = ({ setOpen, target }) => {

  const { userDetails }: any = useAuthContext();
  const [firstName, setFirstName] = useState<string>(userDetails.first_name);
  const [password, setPassword] = useState<string>();
  const [lastName, setLastName] = useState<string>(userDetails.last_name)
  const { setDisableContents } = useAppContext();
  const queryClient = useQueryClient();


  const handleUpdateName = async() => {
      const data = {
        userID: userDetails.userID,
        first_Name: firstName,
        last_Name: lastName,
        password: password
      }
       try {
           const updateData = await axios.post('http://localhost:5000/updateName', data);
           queryClient.refetchQueries('userDetails')
           setOpen(false)
           setDisableContents(true)
           enableBodyScroll(target.current)
           console.log(updateData)
       } catch(error) {

       }
  }


  return (
   <Overlay>
 <Popbox  className={'flex flex-col bg-white border rounded-md absolute px-5 py-5 gap-5 mt-20'}>
    <div className='text-center flex flex-col'>
     <p className='text-2xl font-bold'>Change your full name</p>
     <p className='text-xs font-semibold text-[gray]'>Enter your first and last name and your current password.</p>
    </div>
    <div className='flex gap-2'>
     <div className="flex flex-col gap-1">
       <label className='font-bold text-xs text-[gray]'>FIRST NAME</label>
     <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}   className='bg-[whitesmoke] px-2 py-1 rounded-md text-[#4c4a4a]'/>
     </div>
     <div className="flex flex-col gap-1">
     <label className='font-bold text-xs  text-[gray]'>LAST NAME</label>
     <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className='bg-[whitesmoke] px-2 py-1 rounded-md text-[#4c4a4a]'/>
     </div>
    </div>
    <div className="flex flex-col gap-1">
     <label className='font-bold text-xs text-[gray]'>Current password</label>
     <input type="password" className='bg-[whitesmoke] px-2 py-1 rounded-md text-[#4c4a4a]' value={password} onChange={(e) => setPassword(e.target.value)}/>
    </div>
    <div className="flex justify-end gap-2">
     <button className='px-4 py-2 bg-[#d8d7d7] font-semibold text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all' onClick={() => {
      setOpen(false)
      setDisableContents(true)
      enableBodyScroll(target.current)
     }}>Cancel</button>
     <button className='px-4 py-2 text-white font-semibold bg-violet-500 rounded-md' onClick={() => handleUpdateName()}>Update</button>
    </div>
 </Popbox>
   </Overlay>
  )
}

const PopUsername: React.FC<PopBoxProps> = ({ setOpen, target }) => {
   const { userDetails }: any = useAuthContext();
   const queryClient = useQueryClient();

   const [userName, setUserName] = useState<string>(userDetails.username);
   const [password, setPassword] = useState<string>();
   const { setDisableContents } = useAppContext();
   
   const handleUpdateUser = async() => {
       const data = {
        userID: userDetails.userID,
        userName: userName,
        password: password
       }
       
       try {
          const updateData = await axios.post('http://localhost:5000/updateUsername', data);
          queryClient.refetchQueries('userDetails');
          console.log(updateData);
       } catch(error) {

       }
   }

   return (
   <Overlay>
 <Popbox  className={'flex flex-col bg-white border rounded-md absolute px-5 py-5 gap-5 mt-20'}>
    <div className='text-center flex flex-col'>
     <p className='text-2xl font-bold'>Change your username</p>
     <p className='text-xs font-semibold text-[gray]'>Enter your new username and your current password.</p>
    </div>
    <div className='flex gap-2'>
     <div className="flex flex-col gap-1 w-full">
       <label className='font-bold text-xs text-[gray]'>USERNAME</label>
     <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}  className='bg-[whitesmoke] px-2 py-1 rounded-md text-[#4c4a4a] w-full'/>
     </div>
    </div>
    <div className="flex flex-col gap-1">
     <label className='font-bold text-xs text-[gray]'>Current password</label>
     <input type="password" className='bg-[whitesmoke] px-2 py-1 rounded-md text-[#4c4a4a]' value={password} onChange={(e) => setPassword(e.target.value)}/>
    </div>
    <div className="flex justify-end gap-2">
     <button className='px-4 py-2 bg-[#d8d7d7] font-semibold text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all' onClick={() => {
      setOpen(false)
      setDisableContents(false)
      enableBodyScroll(target.current)
      }}>Cancel</button>
     <button className='px-4 py-2 text-white font-semibold bg-violet-500 rounded-md' onClick={() => handleUpdateUser()}>Update</button>
    </div>
 </Popbox>
   </Overlay>
   )

}

const PopEmail: React.FC<PopBoxProps> = ({ setOpen, target }) => {

   const { userDetails }: any = useAuthContext();
   const [email, setEmail] = useState<string>(userDetails.email);
   const { setDisableContents } = useAppContext();

  return (
   <Overlay>
     <Popbox  className={'flex flex-col bg-white border rounded-md absolute px-5 py-5 gap-5 mt-20'}>
    <div className='text-center flex flex-col'>
     <p className='text-2xl font-bold'>Change your email</p>
     <p className='text-xs font-semibold text-[gray]'>Enter your new email and your current password.</p>
    </div>
    <div className='flex gap-2'>
     <div className="flex flex-col gap-1 w-full">
       <label className='font-bold text-xs text-[gray]'>Email</label>
     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  className='bg-[whitesmoke] px-2 py-1 rounded-md text-[#4c4a4a] w-full'/>
     </div>
    </div>
    <div className="flex flex-col gap-1">
     <label className='font-bold text-xs text-[gray]'>Current password</label>
     <input type="password" className='bg-[whitesmoke] px-2 py-1 rounded-md text-[#4c4a4a]'/>
    </div>
    <div className="flex justify-end gap-2">
     <button className='px-4 py-2 bg-[#d8d7d7] font-semibold text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all' onClick={() => { 
      setOpen(false)
      setDisableContents(false)
      enableBodyScroll(target.current)
      }}>Cancel</button>
     <button className='px-4 py-2 text-white font-semibold bg-violet-500 rounded-md'>Update</button>
    </div>
 </Popbox>
   </Overlay>
  )
}

const PopPassword: React.FC<PopBoxProps> = ({ setOpen, target }) => {
  
  const { userDetails }: any = useAuthContext(); 
  const { setDisableContents } = useAppContext();
  const [currPassword, setCurrPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [confPassword, setConfPassword] = useState<string>();

  const handleUpdatePassword = async() => {
    const data = {
      userID: userDetails.userID,
      currPassword: currPassword,
      newPassword: newPassword
    }

    try {
      const updateData = await axios.post('http://localhost:5000/updatePassword', data);
      console.log(updateData);

    } catch(error){
      console.log(error)
    }
  }

 return (
 <Overlay>
   <Popbox  className={'flex flex-col bg-white border rounded-md absolute px-5 py-5 gap-5 mt-20'}>
  <div className='text-center flex flex-col'>
   <p className='text-2xl font-bold'>Change your password</p>
   <p className='text-xs font-semibold text-[gray]'>Enter your current password and your new password.</p>
  </div>
  <div className="flex flex-col gap-1">
   <label className='font-bold text-xs text-[gray]'>Current password</label>
   <input type="password" className='bg-[whitesmoke] px-2 py-1 rounded-md text-[#4c4a4a]' value={currPassword} onChange={(e) => setCurrPassword(e.target.value)}/>
  </div>
  <div className="flex flex-col gap-1">
   <label className='font-bold text-xs text-[gray]'>New password</label>
   <input type="password" className='bg-[whitesmoke] px-2 py-1 rounded-md text-[#4c4a4a]' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
  </div>
  <div className="flex flex-col gap-1">
   <label className='font-bold text-xs text-[gray]'>Confirm new password</label>
   <input type="password" className='bg-[whitesmoke] px-2 py-1 rounded-md text-[#4c4a4a]' value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
  </div>
  <div className="flex justify-end gap-2">
   <button className='px-4 py-2 bg-[#d8d7d7] font-semibold text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all' onClick={() =>{
     setOpen(false)
     setDisableContents(false)
     enableBodyScroll(target.current)
     }}>Cancel</button>
   <button className='px-4 py-2 text-white font-semibold bg-violet-500 rounded-md' onClick={() => handleUpdatePassword()}>Update</button>
  </div>
</Popbox>
 </Overlay>
 )
}

export default Profile
