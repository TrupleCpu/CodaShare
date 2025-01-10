import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import socket from "../../socket/Socket"; 
import { useAuthContext } from "./AuthContextProvider";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setLocationState } from "../Features/sidebarSlice";
import { setGroupsidebarLocation } from "../Features/groupsidebarSlice";
import axios from "axios";

interface AppContextProps {
    userLoc: string;
    setUserLoc: React.Dispatch<React.SetStateAction<string>>;
    onlineUsers: string[]; 
    sharedCodeData: string[],
    fetchUserSharedCode: () => void,
    disableContents: boolean,
    setDisableContents: Dispatch<SetStateAction<boolean>>
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("Must be within the app");
    }
    return context;
};

interface AppContextProviderProps {
   children?: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [userLoc, setUserLoc] = useState<string>("dashboard");
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]); 
    const { userDetails }: any = useAuthContext();
    const [disableContents, setDisableContents] = useState<any>()
    const [sharedCodeData, setSharedCodeData] = useState<string[]>([]);
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    

    useEffect(() => {
         const locationName: string = location.pathname.replace('/', '');
         dispatch(setLocationState(locationName.toLowerCase()));
    }, [location])
   
  
    const emitUserOnline = () => {
        if (userDetails.userID) {
            socket.emit('userOnline', userDetails.userID);
        }
    };

    useEffect(() => {
        if (userDetails.userID) {
            emitUserOnline();
        }
    }, [userDetails.userID]);


    useEffect(() => {
        socket.on('onlineUsers', (users: string[]) => {
            setOnlineUsers(users);
        });
        return () => {
            socket.off('onlineUsers');
        };
    }, []);

    const fetchUserSharedCode = async() => {
        try {
           const user = await axios.get(`http://localhost:5000/getUser/${userDetails?.username}`)
           setSharedCodeData(user.data);
        } catch (error) {
         console.log(error)
        }
     }
    
    useEffect(() => {
       fetchUserSharedCode();
      }, [userDetails?.username])

    return (
        <AppContext.Provider value={{ userLoc,disableContents,setDisableContents, sharedCodeData,fetchUserSharedCode, setUserLoc, onlineUsers }}>
            {children}
        </AppContext.Provider>
    );
};
