import React, { ReactNode, useEffect } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../Services/Context/AuthContextProvider';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setGroupsidebarLocation } from '../../Services/Features/groupsidebarSlice';
import '../../components/Loader/Loader.css'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    const {groupId} = useParams<{ groupId: string }>();
    const {userDetails}: any = useAuthContext();
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
   
   
   const navigate = useNavigate();
    const fetchData = async() => {
      try {
           const data = await axios.get(`http://localhost:5000/getMember/${groupId}`);
           console.log(data.data);
           return data.data;
  
      }catch(error) {
          console.log(error)
      }
     }
    
     useEffect(() => {
      const parts =location.pathname.split('/');
      const lastPart = parts[parts.length - 1].toLocaleLowerCase();
      lastPart.includes('%20') ? dispatch(setGroupsidebarLocation(lastPart.replace('%20', ' '))) : dispatch(setGroupsidebarLocation(lastPart))
      lastPart === 'upload' &&  dispatch(setGroupsidebarLocation('codes'))
    },[location])

    
    
    const {data: memberDetails, isLoading} = useQuery('memberDetails', fetchData);

    if(isLoading){
      return (
         <div className="flex items-center justify-center h-screen ">
           <div className='loader'></div>
         </div>
      )
    }
    if(memberDetails){
    const members = new Set(memberDetails.map((member: { user: { userID: string; }; }) => member.user.userID))


       
    if(members.has(userDetails.userID)){
      return (
        <>
          <Sidebar groupId={groupId}/>
          {children}
        </>
        )
    } 

     navigate('/group');
    
    }
   
}

export default Layout