import { useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useQueryClient } from "react-query";
import { useAuthContext } from "../../Services/Context/AuthContextProvider";
import { MainLoader } from "../../components/Loader/Loader";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }: any) => {
     const { status } = useAuthContext();
     const queryClient = useQueryClient();

     const handleCleanUp = () => {
      queryClient.removeQueries('messageDetails');
      queryClient.removeQueries('groupDetails');
     }
    
      useEffect(() => {
         handleCleanUp();
      }, [queryClient])
  

     if(status === 'loading'){
      return <MainLoader />
    }
   
     
  
  return (
    <div className="flex">
    <Sidebar />
    <Navbar />
    {children}
    <ToastContainer />

    </div>
  )
}

export default Layout