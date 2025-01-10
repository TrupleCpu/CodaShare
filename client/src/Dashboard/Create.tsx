import axios from 'axios';
import React, { useState } from 'react'
import Layout from './Navbar/Layout';
import { MdAdd } from "react-icons/md";
import { RiSubtractLine } from "react-icons/ri";
import {Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { useAuthContext } from '../Services/Context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
const Create = (props: any) => {
    const [groupName, setGroupName] = useState<any>('');
    const [language, setLanguage] = useState<any>('');
    const {userDetails}: any = useAuthContext();
    const navigate = useNavigate();
    const [isInputsInLimit, setIsInputsInLimit] = useState(false);
    const [messageData, setMessageData] = useState();
    const languages = [
        "Java", "Typescript", "Python", "Javascript", "C", "C++", "All"
    ]
  const [addMemberField, setAddMemberFields] = useState([{memberName: '', id: Date.now()}]);
  const [description, setDescription] = useState('');
    console.log(userDetails)
    const createGroup = async(e: any) => {
        e.preventDefault();

        if(groupName === '' || language === ''){
          return toast.error('Fields must not be empty', {
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
        }
        
        addMemberField.sort((a: any, b: any) =>  {
          return a.id - b.id;
        })
        const memberID = addMemberField.filter(member => member.memberName.trim()!== '').map(member => member.memberName)
        memberID.push(userDetails.userID)
        
        memberID.sort((a: any,b: any) => {
          if(a === userDetails.userID){
            return -1;
          } else if(b === userDetails.userID) {
               return 1;
          } else {
            return 0;
          }
        })
       
        const data = {
            ownerID: userDetails.userID,
            membersID: memberID,
            groupName: groupName,
            description: description,
            ownerUser: userDetails.username,
            ownerProfile: userDetails.profileURL,
            languageUsed: language
        }
        
        console.log(data)
      try {
            const insert = await axios.post('http://localhost:5000/createGroup', data);

            if(insert.data.message === "Success"){
              navigate('/group')
              return;
            }
            setMessageData(insert.data.message);
            console.log(insert.data.message);
         } catch (err) {
             console.log(err)
         }  
    }
 const addMoreInputs = () => {
    if(addMemberField.length < 4){
        setAddMemberFields([{memberName: '', id: Date.now()}, ...addMemberField])

        return;
    } 
    setIsInputsInLimit(true);
    return false;
    
 }

 const rmvInputs = (id: any) => {
   setAddMemberFields(addMemberField.filter(member => member.id !== id ))

   if(addMemberField.length < 5){
    setIsInputsInLimit(false);
   }
 }

 const checkIfItsMoreThanTwo = (index: number, id: any) => {
      if(index >= 1){
        return (
            <button className='bg-red-400 text-white font-semibold  rounded-sm px-2' onClick={() => rmvInputs(id)}><RiSubtractLine /></button>
        )
      }
 }

 const handleChangeAddMemberInput = (id: any, value: any) => {
    setAddMemberFields(prevAddFields => 
        prevAddFields.map(member => (member.id === id ? {...member, memberName: value}: member))
    )
 }
 
 
  return (
    <Layout>
      <div className='min-h-screen bg-white w-[100%]'>
      <div className=" pl-[11rem] mt-[3rem]  justify-center items-center flex flex-col gap-2 py-2">
         <div className="flex flex-col w-[70%]  gap-1">
          <p className='font-semibold self-start'>Group name <span className='text-red-500'>*</span></p>
            <input maxLength={30} type="text" className="w-full h-[2rem] py-2 px-2 rounded-sm border-2 focus:border-[#ae89fc] placeholder:italic transition-all" 
            placeholder='name of your group'
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            />
            <div className="flex justify-between">
           <p className='text-xs text-red-500'>{messageData && messageData}</p>
            <p className={groupName.length === 30 ? 'text-xs self-end text-red-500 ' : 'text-xs'}>{groupName.length}/30</p>
            </div>
         </div>
         <div className="flex flex-col w-[70%]">
            <p className='font-semibold'>Description <span className='text-red-500'>*</span></p>
            <p className='text-[.50rem] text-[gray] font-semibold'>Optional</p>
            <textarea placeholder='description of your group' className='resize-none w-full h-[6rem] py-2 px-2 placeholder:italic rounded-sm border-2 focus:border-[#ae89fc] transition-all'
            maxLength={50}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <p className={description.length === 50 ? 'text-xs text-red-500 self-end' : 'text-xs self-end'}>{description.length}/50</p>
         </div>
         <div className="flex flex-col gap-2 w-[70%]">
            <div className="flex flex-col gap-1">
            <p className='font-semibold'>Group type <span className='text-red-500'>*</span></p>
            <select className='rounded-sm border-2 focus:border-[#ae89fc] transition-all px-1 py-.5'>
              <option value="">public</option>
              <option value="">private</option>
            </select>
            </div>
            <div className="flex flex-col gap-1">
            <p className='font-semibold'>Join request<span className='text-red-500'>*</span></p>
            <select className='rounded-sm border-2 focus:border-[#ae89fc] transition-allpx-1 py-.5'>
              <option value="">automatic approval</option>
              <option value="">manual approval</option>
            </select>
            </div>
            <div className="flex flex-col gap-1">
            <p className='font-semibold'>Who can upload code <span className='text-red-500'>*</span></p>
            <select className='rounded-sm border-2 focus:border-[#ae89fc] transition-allpx-1 py-.5'>
              <option value="">anyone</option>
              <option value="">admins</option>
            </select>
            </div>
         </div>
         <div className="flex flex-col w-[70%]">
         <p className='font-semibold'>Add member <span className='text-red-500'>*</span></p>
         <p className='text-[.50rem] text-[gray] font-semibold'>Optional</p>
        <div className="flex gap-2">
       <div className="flex flex-col gap-2 w-full">
      {addMemberField.map((add, index) => {
            return (
                <div className='flex gap-2' key={index}>
                <input type="text" placeholder="add using member's id" className="w-full h-[2rem] py-2 px-2 rounded-sm placeholder:italic border-2 focus:border-[#ae89fc] transition-all"
                value={add.memberName}
                onChange={(e) => handleChangeAddMemberInput(add.id, e.target.value)}
                />
                {checkIfItsMoreThanTwo(index, add.id)}
                </div>
            )
      })}
     {isInputsInLimit &&  <p className='text-red-500'>Limited only to 4</p>}
       </div>
        <div>
        <button className='bg-[#6D31EDFF] text-white px-2 py-1 rounded-sm' onClick={addMoreInputs}><MdAdd className='text-2xl ' /></button>
        </div>
        </div>
         </div>
         <div className='flex flex-col gap-1 w-[70%]'>
            <p className='font-semibold'>Select a language used in the group <span className='text-red-500'>*</span></p>
           <select value={language} onChange={(e) => setLanguage(e.target.value)} className='w-full h-[2rem] px-2 py-1 rounded-sm border-2 focus:border-[#ae89fc] transition-all'>
            <option value="" disabled selected>Select a language</option>
            {languages.map((lang, index) => {
                return (
                    <option value={lang} key={index}>{lang}</option>
                )
            })}
           </select>
          </div>
          <div className='flex justify-end w-[70%]'>
            <button className='ml-[13rem] bg-[#6D31EDFF] text-white  font-semibold px-2 py-2 rounded-sm ' onClick={createGroup}>Create group</button>
          </div>
      </div>
      </div>
    </Layout>
  )
}

export default Create