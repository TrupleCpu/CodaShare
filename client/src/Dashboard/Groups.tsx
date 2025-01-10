import { useAuthContext } from '../Services/Context/AuthContextProvider'
import axios from 'axios';
import Layout from './Navbar/Layout';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { FcSearch } from "react-icons/fc";
import { selectImage } from '../components/SelectImage';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useState } from 'react';
import Pagination from '../components/Pagination';
import SkeletonCard from '../components/Skeleton-Loaders/SkeletonCard';


const Groups = () => {
    const {userDetails}: any = useAuthContext();
    const [currentPage, setCurrentpage] = useState<number>(1);
    const [postPerPage, setPostPerPage] = useState<number>(8);
       const fetchData = async () => {
            try {
              const fetchGroup = await axios.get(`http://localhost:5000/getGroups/${userDetails.userID}`);
              console.log(fetchGroup.data.group)
              return fetchGroup.data.group
            } catch(error){
              console.log(error)
            }
       }  
    
       const {data: groupDetails} = useQuery('userGroupDetails', fetchData, {
        enabled: !!userDetails.userID
       });
    
       

       

      const lastIndex = currentPage * postPerPage;
      const firstIndex = lastIndex - postPerPage;
      const currPost = groupDetails?.slice(firstIndex, lastIndex);
      
   const emptyForLoaders = [
   {
    id: 1,
    name: 'box'
   },
    {
    id: 2,
    name: 'box'
   },
   {
    id: 3,
    name: 'box'
   },
   {
    id: 4,
    name: 'box'
   },
   {
    id: 5,
    name: 'box'
   },
   {
    id: 6,
    name: 'box'
   },
   {
    id: 7,
    name: 'box'
   },
   {
    id: 8,
    name: 'box'
   },
  ]
  return (
   <Layout>
     <div className='container min-h-screen bg-[white] pl-[10rem]   flex flex-col'>
      {groupDetails ? (
      <>
        <GroupCards groupDetails={currPost} />
     {groupDetails.length > 8 &&   <Pagination
       className='pl-[2rem] flex py-2 '
       totalPost={groupDetails?.length}
       postPerPage={postPerPage}
       setCurrentPage={setCurrentpage}
       currentPage={currentPage}
       ></Pagination>}
      </>)
       : (
        <div className='flex flex-wrap mt-20 pl-5 gap-2'>
         {emptyForLoaders.map((empty) => (
             <SkeletonCard key={empty.id} />
         ))}
        </div>
       )
      }
    </div>
   </Layout>
  )
}

const GroupCards = ({groupDetails}: {groupDetails: any[]}) => {
  const groupLocState = useSelector((state: RootState) => state.groupsideBar.groupsidebarLocation);

  return (
    <>
     {Array.isArray(groupDetails) && groupDetails.length != 0 ? (<div className="w-[100%]  flex flex-wrap mt-20 pl-5 gap-2">
        {Array.isArray(groupDetails) && groupDetails.map((group, index) => {
          return (
            <Link to={`/group/${group.groupName}/${groupLocState}`} key={index} className="w-[17rem] h-[16rem] bg-white rounded-lg border hover:border-[#d3d2d2] flex flex-col justify-between"  >
        <div className="w-full py-2 px-3  border-b flex justify-between">
         <div>
         <p className='font-semibold'>{group.groupName}</p>
          <p className='text-xs'>Group owner: {group.ownerUser}</p>
         </div>
         <div className="w-[3rem] h-[3rem] rounded-full">
           <img src={group.ownerProfile} />
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
        </Link> 
      
          )
        })}
      </div>):(
      <div className='w-full h-screen flex items-center justify-center'> 
      <div className="bg-white px-20 rounded-md py-8 flex flex-col items-center justify-center text-xl font-semibold">
        <FcSearch  className='w-[10rem] h-[10rem]'/>
        <p>No groups found</p>
        <Link to={'/join'} onClick={() => localStorage.setItem('locationState', 'join')} className='hover:underline hover:text-blue-500'>Click here to join a group</Link>
      </div>
      </div>
      )}
    </>
  )
}

export default Groups