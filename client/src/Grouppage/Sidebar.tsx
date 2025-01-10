import { FaCode } from "react-icons/fa6";
import { IoChatboxEllipses, IoSettings } from "react-icons/io5";
import { MdGroups3 } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import {  useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { setGroupsidebarLocation } from "../Services/Features/groupsidebarSlice";
import { setLocationState } from "../Services/Features/sidebarSlice";
import Accountprofile from "../components/Accountprofile";
const Sidebar = ({groupId}: any) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const groupSidebarLoc = useSelector((state: RootState) => state.groupsideBar.groupsidebarLocation);
    const dispatch = useDispatch<AppDispatch>();

    
       const sidebarOptions = [
        {
            icon: <FaCode />,
            id: "codes",
            name: 'Codes'
        },
        {
           icon: <IoChatboxEllipses />,
           id: "chats",
           name: 'Chats'
        },
        {
            icon: <MdGroups3 />,
            id: "members",
            name: 'Members'
        }, 
        {
            icon: <IoSettings />,
            id: "group settings",
            name: 'Settings'
        }
    ];

    const handleGoBackBTN = () => {
            queryClient.clear();
            dispatch(setLocationState('group'))
            dispatch(setGroupsidebarLocation('Codes'))
            navigate('/group')
    }
    const handleClick = (clickName: string) => {
        dispatch(setGroupsidebarLocation(clickName));
    }
  return (
    <div className='px-2 py-2 bg-[white] border-r-2  fixed bottom-0 top-0  z-50'>
        <p className='cursor-pointer flex items-center font-bold text-3xl mb-4 ' onClick={() => navigate('/dashboard')}><span className='text-black'>Coda</span><span className='text-[#6D31EDFF]'>Share</span></p>
        <div className="flex flex-col ">
              {sidebarOptions.map((option, index) => {
                 return (
                    <Link to={`/group/${groupId}/${option.id}`}
                     key={index} 
                    onClick={() => handleClick(option.id)}
                    className={groupSidebarLoc === option.id  ? 'gap-2 font-semibold   bg-[#ded2f5] text-[#6D31EDFF] flex pr-7 py-2  pl-2 items-center    cursor-pointer transition-all text-[.875rem] rounded-md' : 'gap-2 VarelaRound flex pr-7 py-2 border border-[transparent]  pl-2 items-center text-[#565D6DFF] cursor-pointer transition-all text-[.875rem] '}><span className='text-xl'>{option.icon}</span>{option.name} </Link>
                 )
              })}
        </div>
        <div className='VarelaRound absolute bottom-20  flex items-center justify-center'>
        <button className='ml-5  border rounded-md px-10 py-2   bg-[#6D31EDFF] hover:bg-[#9a77e6] text-white transition-all active:scale-90' onClick={handleGoBackBTN}><FaArrowLeft /></button>
        </div>
        <Accountprofile />
      </div>
  )
}

export default Sidebar