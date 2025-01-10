import { RootState } from '../../store';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const locationState = useSelector((state: RootState) => state.sidebar.locationState);

  const stateLoc = (loc: any) => {
     switch(loc){
        case "dashboard":
            return "Overview";
        case "group":
            return "Group";
        case "join":
            return "Join group";
        case "create":
            return "Create group";
        case "profile":
            return "Profile";
        default:
            return null;
     }
  }

  return (
    <div className='fixed right-0 left-0 py-2 border-b-2  border-[#f1f0f0]  bg-[white]    mb-2 px-[11.5rem]'>
    <p className='font-semibold'>{stateLoc(locationState)}</p>
           </div>
  )
}

export default Navbar