import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { deleteToken, getToken, setToken } from "../Token/TokenService";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import socket from "../../socket/Socket";
import { useNavigate } from "react-router-dom";
import { setLocationState } from "../Features/sidebarSlice";
import { useDispatch, UseDispatch } from "react-redux";
import { AppDispatch } from "../../store";

axios.defaults.withCredentials = true;
interface AuthContextProps {
    userDetails: Array<object> | null,
    loader: boolean,
    status: string,
    signIn: (email: string, password: string) => Promise<string>,
    messageLogin: string,
    logout: () => void,
    refetch: () => void,
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context)
        throw new Error("Must be within the app");

    return context;
}

interface AuthContextProviderProps {
    children?: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({children}) => {
     const navigate = useNavigate();
     const queryClient = useQueryClient();
     const dispatch = useDispatch<AppDispatch>();
     const [loader, setLoader] = useState<boolean>(true);
     const [userDetails, setUserDetails] = useState([]);
     const [messageLogin, setMessageLogin] = useState<string>('');
     const token = getToken();
     const mutation = useMutation((data: any) => axios.post('http://localhost:5000/signin', data));

    
     

     const signIn = async (email: string, password: string) => {

        const data = {email, password};

         try {
             const userLogIn = await mutation.mutateAsync(data);
             const {message,accessToken, user} = userLogIn.data;
             setMessageLogin(message);

             if(message === "Logged In"){
                setToken(accessToken);
                setUserDetails(user)
                console.log(userLogIn) 
                socket.connect();
                navigate('/dashboard');
             }
            
            return message; 

         } catch (error) {
            console.error(error);
         }
    }

        const fetchData = async() => {
        try {
            if(token){
                const res = await  axios.get('http://localhost:5000/protected', {
                    headers: {
                        'authorization': `Bearer ${token}`  
                  }
             })
               
                setLoader(false);
                return res.data.user
            }
      }  catch(err){
        console.error(err);
     }
  }

  const {status, data, refetch} = useQuery('userDetails', fetchData, {
    staleTime: 30000,
    enabled: !!token,
    onSuccess: (data) => {
        setUserDetails(data)
    }
  });
  
  const logout = () => {
    axios.post('http://localhost:5000/destroy')
    .then((response) => {
      console.log(response.data)
      deleteToken();
      dispatch(setLocationState('dashboard'));
      queryClient.removeQueries('userDetails')
      queryClient.clear();
      socket.disconnect();
      navigate('/')
    }).catch(error => {
      console.log(error)
    })
  }
    return (
        <AuthContext.Provider value={{userDetails, refetch, logout,messageLogin , loader, status, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}

