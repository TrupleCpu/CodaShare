import React, { useEffect, useState } from 'react'
import Layout from './Navbar/Layout'
import axios from 'axios';
import { selectImage } from '../components/SelectImage';
import { useAuthContext } from '../Services/Context/AuthContextProvider';
import Pagination from '../components/Pagination';


const Join = () => {
  const {userDetails}: any = useAuthContext();
  const [userSearch, setUserSearch] = useState('');
  const [groupRes, setGroupRes] = useState<any>();
  const [groupResAlert, setGroupResAlert] = useState<string>();
  const [selectedRes, setSelectedRes] = useState<any>();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentPage, setCurrentpage] = useState<number>(1);
  const [postPerPage, setPostPerPage] = useState<number>(4);

  const SearchGroup = () => {
       console.log(userSearch)
      axios.post('http://localhost:5000/searchGroup', {userSearch}).then((response) => {
        if(response.data.message === "Name not found!"){
          setGroupResAlert(response.data.message);
          return;
        }
        setGroupRes(response.data)
        setGroupResAlert("");
        setSelectedRes("")
      }).catch((err) => {
        console.log(err)
      })


  }

   useEffect(() => {
     let intervForAlert: any =  null;

      if(groupResAlert)
      {
         intervForAlert = setInterval(() => {
          setGroupResAlert("")
     }, 2000);
      }

      return () => {
        if(intervForAlert)
          {
           clearInterval(intervForAlert) 
          }
      }
   }, [groupResAlert])
  
    const handleGroupDetails = (index: any, group: any) => {
     

       setSelectedIndex(index)
       setSelectedRes(group)
    }
    
console.log(userDetails)

 const handleJoinGroup = async(groupID: any) => {
    const data = {
         groupID: groupID,
         userID: userDetails.userID,
    }
   try {
       const insert = await  axios.post("http://localhost:5000/joinGroup", data);
       console.log(insert);
   } catch(error) {
    console.log(error)
   }
   
 }

 const checkIfMember = (group: any): boolean => {
   return group.groupMembers.some((member: any) => member.memberID === userDetails.userID)
 }


 const lastIndex = currentPage * postPerPage;
 const firstIndex = lastIndex - postPerPage;
 const currPost = groupRes?.slice(firstIndex, lastIndex);
  return (
    <Layout>
      <div className="container min-h-screen bg-white flex pl-[11rem] mt-[2.6rem] gap-10">
       <div>
       <div className="w-[100%]  flex  mt-16">
          <div className="flex flex-col gap-2 ">
            <p className='text-2xl font-semibold '>Join a group</p>
           <div className="flex gap-3">
           <div className="flex w-[10rem] lg:w-[20rem] h-7 xl:w-[20rem] md:w-[20rem]">
            <input  type="text" 
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            placeholder='Search a group' className=' font-semibold w-full h-full focus:border-blue-500 px-2 text-sm py-5 outline-none border-2 rounded-md'/>
            </div>
            <button onClick={SearchGroup} className='bg-[#615CFB] rounded-md py-2.5 font-semibold px-4 text-center text-white'>Search</button>
           </div>
          </div>
        </div>
        <div className="flex flex-col mt-2">
          {groupResAlert && <><p className='text-xs text-red-500'>{groupResAlert}</p></> }
         {groupRes  && <>
          <p className='text-sm mt-5 mb-2 '>{groupRes.length !== 0 ? "Search result" : <span className='text-red-500'>Group name not found</span>}</p>
            <div className='grid grid-cols-2 gap-2'>
            {groupRes.map((group: any, index: any) => {
                return (
                    <div key={index} onClick={() => handleGroupDetails(index, group)}  className={selectedIndex === index ? "w-[17rem] h-[16rem] bg-white rounded-lg border-2 border-blue-500 flex flex-col justify-between "  : "w-[17rem] h-[16rem] bg-white rounded-lg border-2 hover:border-[#E3DEDE] flex flex-col justify-between cursor-pointer" } >
                   <div className="w-full py-2 px-3  border-b flex justify-between">
                    <div>
                     <p className='font-semibold'>{group.groupName}</p>
                     <p className='text-xs'>Group owner: {group.ownerUser}</p>
                   </div>
                  <div className="w-[3rem] h-[3rem] rounded-full">
                    <img src={group.ownerProfile}/>
                  </div>
                  </div>
                <div className="flex justify-center">
                  {selectImage(group.languageUsed)}
                </div>
                <div className="px-3 py-2 font-semibold border-t text-xs text-[gray]">
                  <div className="flex justify-between"> 
                   <p>Members: {group.groupMembers.length}</p>
                  <p>Language: {group.languageUsed}</p>
                  </div>
                  <p>Date created: {new Date(group.createdAt).toLocaleDateString('en-CA')}</p>
                </div>
              </div>
              )
            }) }
            </div>
         </> }
        {groupRes?.length > 4 &&  <Pagination 
          className=' flex py-2 '
          totalPost={groupRes?.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentpage}
          currentPage={currentPage}
         />}
        </div>
       </div> 
       {selectedRes &&  <div className="rounded-md h-[14rem] bg-[white] mt-10">
             <div className="border-b-2 px-5 py-2 ">
              <p className='font-semibold text-xl'>Group Details</p>
              <p className='font-semibold text-xs text-[gray]'>{ selectedRes.groupDescription ? selectedRes.groupDescription : "See the group details in text here"}</p>
              
             </div>
             <div className="flex gap-10 px-5 py-2">
                <div className="">
                  <p className='text-xs font-semibold text-[gray]'>Group name</p>
                  <p className='text-xs font-semibold '>{selectedRes.groupName}</p>
                </div>
                <div className="">
                  <p className='text-xs font-semibold text-[gray]'>Owner user</p>
                  <p className='text-xs font-semibold '>{selectedRes.ownerUser}</p>
                </div>
                <div className="">
                  <p className='text-xs font-semibold text-[gray]'>Members</p>
                  <p className='text-xs font-semibold '>{selectedRes.groupMembers.length}</p>
                </div>
             </div>
             <div className="flex gap-10 px-5 py-2">
             <div className="">
                  <p className='text-xs font-semibold text-[gray]'>Date created</p>
                  <p className='text-xs font-semibold '>{new Date(selectedRes.createdAt).toLocaleDateString('en-CA')}</p>
                </div>
                <div className="">
                  <p className='text-xs font-semibold text-[gray]'>Language used</p>
                  <p className='text-xs font-semibold '>{selectedRes.languageUsed}</p>
                </div>
             </div>
             <div className="px-5 py-2 flex justify-end">
              <button className={`text-sm  ${checkIfMember(selectedRes) ? 'bg-[#08088f]' : 'bg-[blue]'} px-5 py-2 text-white font-semibold rounded-md` }onClick={() => handleJoinGroup(selectedRes._id)} disabled={checkIfMember(selectedRes)}>{checkIfMember(selectedRes) ? 'Already joined' : 'Join'}</button>
             </div>
          </div>
          } 
      </div>
    </Layout>
  )
}

export default Join