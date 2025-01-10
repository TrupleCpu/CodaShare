  import Layout from './Layout'
  import { useParams, useLocation } from 'react-router-dom'
  import { useQuery, useQueryClient } from 'react-query'
  import axios from 'axios'
  import { useAuthContext } from '../../Services/Context/AuthContextProvider'
  import { selectImage } from '../../components/SelectImage'
  import React, { useEffect, useState } from 'react'
  import { IoIosSend } from "react-icons/io";
  import socket from '../../socket/Socket'
import { useAppContext } from '../../Services/Context/AppContextPrivder'
import { LuDot } from "react-icons/lu";
import { BigLoader } from '../../components/Loader/Loader'
import SkeletonDashboard from '../../components/Skeleton-Loaders/SkeletonDashboard'


  const Chats = () => {
    const {groupId} = useParams();
    const {onlineUsers}: any = useAppContext();
    const {userDetails }: any = useAuthContext();
    const [content, setContent] = useState('')
    const [messages, setMessages] = useState<any>([]);
    const [loader, setLoader] = useState(true);
    const [sendLoader, setSendLoader] = useState(false)
    const [membersLoader, setMembersLoader] = useState(true);
    const queryClient = useQueryClient();
    const location = useLocation();

    useEffect(() => {
      setMessages([]); 
    }, [location.pathname])
    

    const fetchGroupData = async() => {
      try {
          const data = await axios.get(`http://localhost:5000/singleGroup/${groupId}`)
          return data.data.getGroup;
      } catch(error) {
        console.error(error)
      }
    }
   
   
    
    const fetcMemberData = async() => {
      try {
          const data = await axios.get(`http://localhost:5000/getMember/${groupId}`);
          return data.data;

      }catch(error) {
          console.log(error)
      }
    }

    
    const fetchMessages = async() => {
      try {
        const data = await axios.get(`http://localhost:5000/getMessage/${groupData?._id}`)
        console.log(data.data)
        return data.data;
      } catch (error) {
        console.error(error)
      }
    }
    
    
    const {data: memberDetails} = useQuery('memberDetails', fetcMemberData, {
      onSuccess: () => {
        setMembersLoader(false);
      }
    });
    const {data: groupData} = useQuery
    ('groupDetails', fetchGroupData, {
      onSuccess: (group) => {
        if(group?._id){
          queryClient.invalidateQueries('messageDetails')
        }
      }
    });
    const {data: messageData, isLoading: messageLoading} = useQuery
    ('messageDetails', fetchMessages, {
      enabled: !!groupData?._id,
      onSuccess: (data) => {
        setMessages(data);
        setLoader(false);
      }
    })

    
    const handleSendMessage = async() => {
      setSendLoader(true)
      const data = {
            groupID: groupData._id,
            senderID: userDetails.userID,
            content: content,
            profileURL: userDetails.profileURL,
            username: userDetails.username,
            first_name: userDetails.first_name,
            last_name: userDetails.last_name,
            createdAt: new Date()
      }
      try {
        await axios.post('http://localhost:5000/sendMessage', data)
        setContent('')
        setSendLoader(false)
        queryClient.refetchQueries('messageDetails')
      } catch(error){
        console.log(error)
      }

    }
    useEffect(() => {
      if (groupData?._id) {
        socket.emit('joinRoom', groupData._id);
        
        socket.on('newMessage', (message: any) => {
          setMessages((prevMessage: any) => [message, ...prevMessage]);
        });
    
        return () => {
          socket.off('newMessage');
        };
      }
    }, [groupData, queryClient]);
    

  useEffect(() => {
    setLoader(true)
    if(!messageLoading && messageData){
    setMessages([...messageData]);
    setLoader(false)
    }
     
  }, [messageData, messageLoading])


  const onlineNums = () => {
    let i = 0;
    const userOnline = new Set(onlineUsers);
    
    if(memberDetails){
      for(let user of memberDetails){
        if(userOnline.has(user.user.userID)){
           i++;
        }
    }
    }

    return i;
  }

 
    return (
      <Layout>
        <div className="pl-[10.5rem] flex flex-col">
        <div className=" w-full bg-[white] border-b-2 flex flex-col  px-5 py-2 ">
          <div className='flex items-center'>
          <div className='w-[3rem] items-center justify-center'>
          {selectImage(groupData?.languageUsed)}
    
          </div>
          <p className='text-xl w-full font-semibold relative  '>{groupId}<span className='absolute w-full text-[gray] text-xs  top-[-.8rem]  flex'>Language: {groupData?.languageUsed}</span></p>
          </div>
        </div>
        <div className="flex w-full h-screen">
            <div className="flex-1 flex bg-[white]  flex-col p-4 ">
            <div className=" flex flex-col-reverse h-[100%] overflow-y-auto">
           {loader ?  <div className='flex gap-1 flex-col items-center justify-center h-full'>
            <BigLoader  />
            <p className='text-sm font-semibold'>Fetching messages</p>
            </div> : <MessageComponents messages={messages} /> }
            </div>
              <div className="mt-6 relative">
            {loader ? (
              <>
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full pr-11 text-[#535252] font-semibold pl-4 py-2 border rounded focus:border-blue-500  "
                disabled />
                <button className='absolute bg-blue-400 text-white px-2 py-1.5 top-1.5 right-2  rounded-md' onClick={handleSendMessage} disabled><IoIosSend /></button>
              </>
              ):(
              <> 
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full pr-11 text-[#535252] font-semibold pl-4 py-2 border rounded focus:border-blue-500  "
                />
                <button className={`absolute ${sendLoader ? ' cursor-default bg-[#9265f3]' : 'bg-[#6D31EDFF]'} text-white px-2 py-1.5 top-1.5 right-2 hover:bg-blue-300  rounded-md transition-all`} onClick={handleSendMessage} disabled={sendLoader} ><IoIosSend /></button>
                </>
              )}
              </div>
            </div>
            <div className="w-[15%] bg-[white] border-l-2 overflow-y-auto flex flex-col">
            <div className="border-b-2 flex items-center px-2 py-2 ">
              <p className='text-xs font-semibold text-[#626262]'>All members</p>
              <p className=' text-xs font-semibold flex items-center justify-center text-[#626262]'><LuDot className='text-green-500 text-2xl'/>{onlineNums()} online</p>
            </div>
            <div className="flex flex-col gap-2 px-4 py-2">
           {membersLoader ?  
  
               <SkeletonDashboard count={5} />
           :  <MembersDashboard memberDetails={memberDetails} /> }
            </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }


  const MessageComponents = ({messages}: {messages: any[]}) => {
    const {userDetails}: any = useAuthContext();

    const convertTimeStamp = (timeStamp: any) => {
      const date = new Date(timeStamp);
      const hour = date.getHours();
      const min = date.getMinutes();
      const amPm = hour > 12 ? "PM" : "AM";
      const cnvrtHrs = hour > 9 ? hour : "0" + hour;
      const cnvrtMins = min > 9 ? min : "0" + min;
      return `${cnvrtHrs}:${cnvrtMins} ${amPm}`
}
    return (
      <>
       {Array.isArray(messages) && messages.map((mess: any, index: React.Key) => {
              return (
                <div key={index} className={mess.username === userDetails.username ? "flex items-center justify-end gap-1 p-1 " : "flex items-center gap-1 p-1 "}>
             {mess.username === userDetails.username ?
            <> 
              <div className="flex flex-col bg-[#6D31EDFF] px-3 rounded-sm py-2">
                <p className='font-semibold text-white'>{mess.first_name} {mess.last_name}<span className='text-[#e3dfdf]  text-xs ml-2'>{convertTimeStamp(mess.createdAt)}</span></p>
                <p className='text-sm font-semibold text-white'>{mess.content}</p>
              </div>
              <div className="w-12 h-12  rounded-full">
                <img src={mess.profileURL} />
              </div>
            </> 
             :
             <>
             <div className="w-12 h-12  rounded-full">
            <img src={mess.profileURL} />
          </div>
          <div className="flex flex-col bg-[whitesmoke] px-3 rounded-sm py-2">
            <p className='font-semibold '>{mess.first_name} {mess.last_name}<span className='text-xs  text-[gray] ml-2'>{convertTimeStamp(mess.createdAt)}</span></p>
            <p className='text-sm font-semibold text-[#535252]'>{mess.content}</p>
          </div>
          </>
            }
            </div>
              )
            })}
      </>
    )
  }


  const MembersDashboard = ({memberDetails}: {memberDetails: any[]}) => {
    const {onlineUsers}: any = useAppContext();
    
    const isOnline = (userID: string) => onlineUsers.includes(userID) ? 'bg-green-500' : 'bg-[gray]';
    return (
      <>
       {memberDetails?.map((memb: any, index: React.Key) => {
               return (
                <div key={index} className=" flex gap-1 ">
                  <div className="relative">
                  <div className=" w-9 h-9  flex items-center justify-center  rounded-full">
                    <img src={memb.user.profileURL} />
                  </div>
                <div className={`absolute  ml-[1.5rem] mt-[-1rem] w-[.6rem] h-[.6rem] border ${isOnline(memb.user.userID)} rounded-full`}></div>
            </div>
            <div className="flex flex-col">
              <p className='text-xs font-semibold text-[#232323]'>{memb.user.first_name} {memb.user.last_name}</p>
              <p className='text-[0.6rem] font-semibold text-[#565555]'>{memb.role}</p>
            </div>
            </div>
              )
            })}
      </>
    )
  }


  export default Chats