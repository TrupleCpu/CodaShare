  import React, { Children, Component, ReactNode, useEffect, useState } from 'react'
  import { useAuthContext } from '../../Services/Context/AuthContextProvider'
  import { FaStar } from "react-icons/fa6";
import { getToken } from '../../Services/Token/TokenService';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { MdContentPaste } from "react-icons/md";
import { CustomColorLoader, SmallBlack, SmallLoader } from '../../components/Loader/Loader';
import { LinksYT } from '../../components/LinksYT'
import { useAppContext } from '../../Services/Context/AppContextPrivder';
import { Link, useNavigate } from 'react-router-dom';
 
 
  const Home = () => {
      const { userDetails }: any = useAuthContext();
      const { sharedCodeData }: any = useAppContext();
      const [groupName, setGroupName] = useState<any>('');
      const [language, setLanguage] = useState<any>('');
      const [width ,setWidth] = useState(window.innerWidth);
      const [loader ,setLoader] = useState<boolean>(false);
      const [errorMsg, setErrorMsg] = useState('');
      const navigate = useNavigate();
      const languages = [
        "Java", "Typescript", "Python", "Javascript", "C", "C++", "All"
    ]
    const queryClient = useQueryClient();
      console.log(userDetails)
        console.log(getToken())
        if(!userDetails._id){
          return <h1 className='pl-[10rem]'>Loading....</h1>
        }
  
      const fetchData = async () => {
         
        try {
          const fetchGroup = await axios.get(`http://localhost:5000/getGroups/${userDetails.userID}`);
          console.log(fetchGroup);
          return fetchGroup.data.group
        } catch(error){
          console.log(error)
        }
   }  


   const {data: groupDetails} = useQuery('userGroupDetails', fetchData);
   console.log(getToken())

   const createGroup = async() => {
    if(language === '' || groupName === ''){
      alert('s')
      setErrorMsg('Select a language or enter a groupname');
      return;
    }
    setLoader(true)
    
    const data = {
        ownerID: userDetails.userID,
        groupName: groupName,
        membersID: [userDetails.userID],
        ownerUser: userDetails.username,
        ownerProfile: userDetails.profileURL,
        languageUsed: language
    }
    
    try {
     const insert = await axios.post('http://localhost:5000/createGroup', data);
      setLoader(false)
      console.log(insert);
      alert("Success!")
   } catch (err) {
       console.log(err)
   } 
}

const copyToClipBoard = async() => {
  try {
     await navigator.clipboard.writeText(userDetails.userID);
     alert("Copied!")
  } catch(error){
   console.log(error)
  }
}


    return (
      <div className='container bg-[white] min-h-screen md:flex lg:flex xl:flex  pl-[10rem] pr-6'>
      
        <div className="flex flex-col w-[50%]">
        <div className="px-5 mb-2 mt-[3rem]">
        <p className='text-2xl font-semibold'>Home</p>
        </div> 
      <div className="px-5 flex gap-2 mb-5 ">
        <Card destination='/group'>
        <div className="text-xs flex flex-col gap-1">
          <p className='font-semibold text-[gray]'>Total Groups</p>
          <p className='text-2xl font-semibold'>{groupDetails ? groupDetails.length : <SmallLoader />}</p>
        </div>
        </Card>
        <Card destination='/profile'>
        <div className="text-xs flex flex-col gap-1">
          <p className='font-semibold text-[gray]'>Codes shared</p>
          <p className='text-2xl font-semibold'>{sharedCodeData ? sharedCodeData.sharedCode : <SmallLoader />}</p>
        </div>
        </Card>
      </div>
      <div className="mb-5  ml-5 flex flex-col  w-full">
         <p className='font-semibold'>User ID<span className='text-red-500'>*</span></p>
         <p className='text-[gray] font-semibold text-[.5rem]'>Note: Use this if you get invited by other groups :)</p>
        <div className='flex gap-2'>
        <input type="text" className=' rounded-sm border w-[20rem] px-2 py-2' value={userDetails.userID}/>
        <button onClick={copyToClipBoard}><MdContentPaste /></button>
        </div>
      </div>

        <div className="px-5 flex">
        <div className='bg-white flex flex-col border rounded-sm px-2 pr-20  py-2 '>
          <p className='text-sm'>Start a new group for {userDetails.username }</p>
          <p className='text-xs text-[gray]'>A group where you can share your codes with your friends!</p>
          <div className="mt-2 flex flex-col gap-1">
              <label htmlFor='groupName' className='font-semibold text-xs'>Group name <span className='text-red-500'>&#42;</span></label>
              <input type="text" id='groupName' placeholder='name of your group...' className='focus:border-blue-500 px-2 text-xs py-2 outline-none border rounded-sm'
              value={groupName}
              maxLength={30}
              onChange={(e) => setGroupName(e.target.value)}
              />
             <div className="">
             <select value={language} onChange={(e) => setLanguage(e.target.value)} className='text-xs outline-none border px-2 py-[.1rem] font-semibold rounded-sm'>
              <option>Select a language</option>
              {languages.map((lang, index) => {
                return (
                  <option key={index} value={lang}>{lang}</option>
                )
              })}
             </select>
             </div>
          </div>
        <div className="mt-2 flex flex-col gap-1">
        <button onClick={createGroup} className={`w-[6.1rem] text-sm px-2 ${loader ? 'bg-[#9265f3] hover:cursor-default' : 'bg-[#6D31EDFF]'}  h-7 rounded-sm flex text-white items-center justify-center`}disabled={loader}>{loader ? <CustomColorLoader color={'#Ffffff'}/> : 'Create group'}</button>
        <p className='text-xs text-red-500'>{errorMsg}</p>
        </div>
      </div>
        </div>
        </div>
        <div className='flex xl:h-[25rem]  mt-14 px-5'>
          <div className="bg-white border flex flex-col rounded-sm px-4 py-2 pr-20">
            <div className="text-sm font-semibold mb-2">
              <p>Top coding resources</p>
            </div>
            <div className="">
            {LinksYT.map((link, index) => {
              return (
                  <div key={index} className='mb-2 flex flex-col  gap-2 border-b py-2'> 
                  <div className="flex  items-center  gap-2">
                  <FaStar className='text-yellow-500'/>
                  <a title={link.name} href={link.link} className='hover:underline hover:text-blue-600'>{link.name}</a>
                  </div>
                  <div className="text-xs text-[gray] ml-6">
                  <p>{link.description}</p>
                  </div>
                  </div>
              )
            })}
            </div>
          </div>
      </div>
      </div>
    )
  }

  interface CardProps  {
    children: ReactNode,
    destination: string

  }

  const Card = ({children, destination} : CardProps) => {
      return (
          <Link to={destination} className='bg-white flex flex-col border rounded-sm px-2 pr-20  py-2 hover:border-[#d9d8d8] hover:cursor-pointer transition-all' >
          {children}
          </Link>
      )
  }
  export default Home