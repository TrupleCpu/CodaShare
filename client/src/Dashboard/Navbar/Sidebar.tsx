import { MdDashboard, MdGroupAdd,MdGroups } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { setLocationState } from '../../Services/Features/sidebarSlice';
import Accountprofile from "../../components/Accountprofile";

const Sidebar = () => {
    const navigate = useNavigate();
    const locationState = useSelector((state: RootState) => state.sidebar.locationState);
    const dispatch = useDispatch<AppDispatch>();
   

    const sideBarOptions = [
        { icon: <MdDashboard />, name: "Home", id: "dashboard" }, 
        { icon: <MdGroups />, name: "Groups", id: "group" }, 
        { icon: <MdGroupAdd />, name: "Join group", id: "join"}, 
        { icon: <IoIosCreate />, name: "Create group", id: "create" },
        { icon: <FaUserCircle />, name: "Profile", id: "profile" }
    ]
   
    const handClick = (clickName: string) => {
        dispatch(setLocationState(clickName));
    }
    
  
 
  return (
    <div className='px-2 py-2 bg-[white] border-r-2  fixed bottom-0 top-0  z-50'>
        <p className=' flex items-center font-bold text-3xl mb-4 cursor-pointer ' onClick={() => navigate('/dashboard')}><span className='text-black'>Coda</span><span className='text-[#6D31EDFF]'>Share</span></p>
       <div className="flex flex-col ">
       {sideBarOptions.map((option,index) => {
            return (
                <Link to={`/${option.id}`} onClick={() => handClick(option.id)} key={index} className={locationState === option.id ? 'font-semibold   bg-[#ded2f5] text-[#6D31EDFF] flex pr-7 py-2  pl-2 items-center    cursor-pointer transition-all text-[.875rem] rounded-md' : 'VarelaRound flex pr-7 py-2 border border-[transparent]  pl-2 items-center text-[#565D6DFF] cursor-pointer transition-all text-[.875rem] '}> 
                    <p className='flex items-center gap-1 justify-center'><span className='text-xl'>{option.icon}</span>{option.name}</p>
                </Link>
            )
        })}
       </div>
       <Accountprofile />
    </div>
  )
}
/* 
 <div className='VarelaRound absolute bottom-10  flex items-center justify-center'>
        <button className='ml-5 px-6 bg-[#6D31EDFF] hover:bg-[#9a77e6]  text-white rounded-md  py-1 transition-all active:scale-90' onClick={handleLogout}>Logout</button>
       </div>
*/
export default Sidebar