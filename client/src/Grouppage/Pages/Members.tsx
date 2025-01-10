import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import Layout from './Layout'
import { useParams } from 'react-router-dom'
import { IoMdAdd, IoIosSearch } from "react-icons/io";
import { IoPersonRemoveOutline } from "react-icons/io5";
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { useAuthContext } from '../../Services/Context/AuthContextProvider';
import { AnimatePresence } from 'framer-motion';
import { SmallLoader } from '../../components/Loader/Loader';
import { useAppContext } from '../../Services/Context/AppContextPrivder';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Popbox from '../../components/Popbox';

const Members = () => {
   const {groupId} = useParams();
   const {userDetails}: any = useAuthContext();
   const [userRole, setUserRole] = useState();
   const [openAddMember, setOpenAddMember] = useState<boolean>(false);
   const [openDelete, setOpenDelete] = useState<boolean>(false);
   const [tempUserIDLoc, setTempUserIDLoc] = useState<string>();
   const { setDisableContents, disableContents } = useAppContext();
   const target: any = useRef(null);
   const roles = ["Admin"];
   
  
   const fetchData = async() => {
    try {
         const data = await axios.get(`http://localhost:5000/getMember/${groupId}`);
         console.log(data.data)
         return data.data;

    }catch(error) {
        console.log(error)
    }
   }

  
  
  const {data: memberDetails} = useQuery('memberDetails', fetchData);

    
  useEffect(() => {

    const fetchRole = () => {
        if(memberDetails){
          memberDetails.forEach((memb: any) => {
            if(memb.user.userID === userDetails.userID){
                setUserRole(memb.role);
             }
          });
        }
   }
   
   fetchRole();
  },[memberDetails, userDetails])
 

  const handleOpenRemove = async(memberID: any) => {
        setOpenDelete(true)
        setTempUserIDLoc(memberID);
        setDisableContents(true)
        disableBodyScroll(target.current)
  }


  return (
    <Layout>
        <div className="min-h-screen bg-white pl-[11.2rem] relative" ref={target}>
            <AnimatePresence>
            {openAddMember && <PopboxAdd setOpenAddMember={setOpenAddMember} target={target} />}
            {openDelete && <PopBoxDelete setOpenDelete={setOpenDelete} memberLoc={tempUserIDLoc}  target={target}/>}
            </AnimatePresence>
            <div className="px-10 py-5 " style={{pointerEvents: disableContents ? 'none' : 'auto'}} >
                <div className="flex  justify-between items-center pb-5  border-b-2">
                   <div className="">
                   <p className='text-3xl font-semibold'>Members</p>
                   </div>
                   <div className="flex gap-2 items-center justify-center">
                    <p className='text-sm text-[gray] font-semibold'>{memberDetails?.length} members</p>
                   <div className="flex relative">
                   <input type="text" className=' pl-6 py-1 text-sm rounded-md bg-[#e8e7e7] font-semibold' placeholder='Search a member'/>
                   <IoIosSearch className='absolute left-1 top-[0.4rem] text-[gray]' />
                   </div>
                   {userRole === "Owner" ? (
                     <button className='flex items-center justify-center gap-1 bg-violet-600 px-2 py-1 text-white font-semibold text-sm rounded-md hover:bg-violet-400 transition-all active:scale-75' onClick={() => {
                        setOpenAddMember(true)
                        setDisableContents(true)
                        disableBodyScroll(target.current)
                    }}><IoMdAdd />Add member</button>
                   ):(
                    <button className='flex items-center justify-center gap-1 bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded-md ' onClick={() => setOpenAddMember(true)} disabled><IoMdAdd />Add member</button>
                   )}
                   </div>
                </div>
                <div className="flex flex-col ">
                 {Array.isArray(memberDetails) && memberDetails?.map((member: any, index: React.Key) => {
                    return (
                        <div key={index} className="flex items-center justify-between border-b-2 py-2">
                        <div className="flex items-center gap-2 ">
                           <div className="w-9 h-9 rounded-full ">
                                <img src={member.user.profileURL} className='w-[100%] h-[100%] rounded-full' />
                           </div>
                           <div>
                               <p className="font-semibold">{member.user.first_name} {member.user.last_name}</p>
                           </div>
                           <div className='mt-1'>
                               <p className='text-sm font-semibold text-[gray]'>{member.user.email}</p>
                           </div>
                        </div>
                        <div className="flex gap-5">
                           <div className='flex items-center justify-center'>
                              {member.role === "Owner" ? (
                                 <select className='w-[7rem] px-3 py-1 rounded-md font-semibold border-2 text-center' disabled>
                                 <option className='text-center'>
                             {member.role}
                                 </option>
                                </select>
                              ):(
                                userRole === "Owner" ? (
                                    <>
                                      <select className='w-[7rem]  py-1 rounded-md font-semibold border-2 text-center' >
                                <option className='flex items-center justify-center'>
                            {member.role}
                                </option>
                                {roles.map((role, index) => {
                                 return (
                                    <option key={index} >{role}</option>
                                 )
                            })}
                               </select>
                                    </>
                                ):(<>
                                
                                <select className='w-[7rem]  py-1 rounded-md font-semibold border-2 text-center' disabled>
                                <option className='flex items-center justify-center'>
                            {member.role}
                                </option>
                                {roles.map((role, index) => {
                                 return (
                                    <option key={index} >{role}</option>
                                 )
                            })}
                               </select>
                                </>)
                              )}
                           </div>
                           <div className="flex items-center">
                         {userRole === "Owner" &&   <button  className={`text-[gray] font-semibold text- ${member.role !== "Owner" && 'hover:text-red-500'} transition-all`} onClick={() => handleOpenRemove(member.user.userID)} disabled={member.role === 'Owner'}>
                                   <IoPersonRemoveOutline />
                               </button>}
                           </div>
                        </div>
                     </div>
                    )
                 })}
                </div>
                <div className="flex justify-end px-5 py-5">
                    <div className=" flex">
                        <button className='bg-violet-600 text-white px-5 py-1 rounded-md font-semibold'>Update</button>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

interface PopboxProps {
    setOpenAddMember: Dispatch<SetStateAction<boolean>>;
    target: any
}

const PopboxAdd: React.FC<PopboxProps> = ({ setOpenAddMember, target }) => {
    const {groupId} = useParams(); 
    const [userID, setUserID] = useState<string>();
    const [message, setMessage] = useState<string>()
    const queryClient = useQueryClient();
    const [loader, setLoader] = useState<boolean>(false);
    const { setDisableContents } = useAppContext();

    const handleBoxClose = () => {
        setOpenAddMember(false);
        setDisableContents(false);
        enableBodyScroll(target.current)
    }
  
    const handleAddMember = async() => {
        setLoader(true)
        const data = {
            groupName: groupId,
            userID: userID
        }

        try {
            const addMember = await axios.post('http://localhost:5000/addMember', data)
            if(addMember.data.message == "Success!"){
                setOpenAddMember(false)
                queryClient.refetchQueries('memberDetails');
            }
            setLoader(false)
            setMessage(addMember.data.message);
        } catch (error) {
            console.log(error)
        }
    }
      
    return (
        <Popbox
         className={'absolute flex flex-col bg-[white] border px-2 left-[38%] top-[10%]  w-[30rem] py-2 rounded-md '}>
            <div className="py-2 flex justify-between">
                <p className='text-lg font-semibold'>Add a member</p>
            </div>
            <div className="py-2 w-full">
                <input type="text" placeholder='Enter user id' className='w-full border-2 bg-[#fffefe] py-2 pl-1 rounded-sm pr-[4.4rem] focus:border-violet-500 transition-all' value={userID} onChange={(e) => setUserID(e.target.value)}/>
            </div>
            <div className="flex gap-2 items-center ">
                <div>
                    <p className='text-sm text-red-400'>{message}</p>
                </div>
            </div>
            <div className="py-2 flex justify-end gap-2">
            <button className={`w-20 py-1 rounded-md  ${loader ? 'bg-violet-400' : 'bg-violet-600'} text-white font-semibold hover:bg-violet-400 transition-all`}onClick={handleAddMember} disabled={loader}>{loader ? <SmallLoader /> : 'Add'}</button>
            <button className='bg-[#d8d7d7] text-red-600 font-semibold  px-4 py-1 rounded-md hover:bg-red-600 hover:text-white transition-all' onClick={handleBoxClose}>Cancel</button>
            </div>
        </Popbox>
    )
}

interface PopBoxDeleteProps {
  setOpenDelete: Dispatch<SetStateAction<boolean>>,
  memberLoc: string | undefined,
  target: any
}
const PopBoxDelete: React.FC<PopBoxDeleteProps> = ({setOpenDelete, memberLoc, target}) => {
     const {groupId} = useParams();
     const queryClient = useQueryClient();
     const [loader, setLoader] = useState<boolean>(false);
     const { setDisableContents } = useAppContext();

    const handleRemoveMember = async() => {
        setLoader(true)
        
         const data = {
        groupName: groupId,
        memberId: memberLoc
    }
     try {
          const removeMember = await axios.post('http://localhost:5000/deleteMember', data);
          console.log(removeMember);
          if(removeMember.data.message === 'Member deleted successfuly'){
            setOpenDelete(false)
            setLoader(false)
            queryClient.refetchQueries('memberDetails');
          }
     } catch (error) {
        console.log(error)
     }
        
    }

    const handleCloseBox = () => {
            setOpenDelete(false)
            setDisableContents(false)
            enableBodyScroll(target.current)
    }
    return (
        <Popbox
         className='absolute flex flex-col bg-[white] border px-3 left-[38%] top-[10%]   py-5 rounded-md gap-2'>
                <div className='font-semibold'>
                    <p>Are you sure you want to remove this member from the group?</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                <button className={`w-20 py-1 rounded-md  ${loader ? 'bg-violet-400' : 'bg-violet-600'} text-white font-semibold hover:bg-violet-400 transition-all`}onClick={handleRemoveMember} disabled={loader}>{loader ? <SmallLoader /> : 'Remove'}</button>
                    <button className='bg-[#d8d7d7] text-red-600 font-semibold  px-4 py-1 rounded-md hover:bg-red-600 hover:text-white transition-all' onClick={handleCloseBox}>Cancel</button>
                </div>
            </Popbox>
    )
}
export default Members