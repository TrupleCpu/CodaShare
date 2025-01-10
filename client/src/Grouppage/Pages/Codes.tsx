import Layout from './Layout'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { CiFileOn } from "react-icons/ci";
import { useAuthContext } from '../../Services/Context/AuthContextProvider';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setViewerState } from '../../Services/Features/codeViewer';
import React, { useState } from 'react';
import { SmallLoader } from '../../components/Loader/Loader';





const Codes = () => {
  const {groupId} = useParams();
  const navigate = useNavigate();
  const {userDetails}: any = useAuthContext();


  const handleUploadButton = () => {
    navigate(`/group/${groupId}/Codes/upload`)
  } 

  return (
    <Layout>
      <div className="min-h-screen bg-white pl-[11.5rem] pr-5 py-5">
        <div className="w-full border border-[#c6c4c4] rounded-md ">
          <div className="border-b border-[#c6c4c4] flex items-center justify-between  px-2 py-2 bg-[#f7f6f6] rounded-t-md">
           <div className="flex items-center gap-2 ">
           <div className="h-8 w-8">
           <img src={userDetails.profileURL} />
           </div>
           <p className=' font-semibold'>{groupId}</p>
           </div>
            <button className='bg-violet-600 hover:bg-violet-400 transition-all px-2 text-sm font-semibold text-white py-1 rounded-md' onClick={handleUploadButton}>Upload code</button>
          </div>
          <div className="flex flex-col">
          <CodesComponents />
          </div>
        </div>
      </div>
    </Layout>
  )
}


const CodesComponents = () => {
  const {groupId} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loader, setLoader] = useState<boolean>(false);


 const handleUploadButton = () => {
  navigate(`/group/${groupId}/Codes/upload`)
} 

   const fetchGroupData = async() => {
    try {
        const data = await axios.get(`http://localhost:5000/singleGroup/${groupId}`)
        console.log(data.data.getGroup)
        return data.data.getGroup;
    } catch(error) {
      console.error(error)
    }
  }
 
  const {data: dataGroup} = useQuery('groupsDatas', fetchGroupData);
  
 
  const getCodesData = async() => {
    setLoader(true)
     try {
          const getData = await axios.get(`http://localhost:5000/getCodes/${dataGroup?._id}`)
          console.log(getData.data);
          setLoader(false);
          return getData.data;
     } catch(error){
      console.log(error)
     }
  }

  const {data: codeData} = useQuery('codeDatas', getCodesData, {
    enabled: !!dataGroup?._id,
    onSuccess: () => {
      setLoader(false);
    }
  });


const isLeapYear = (year: any) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

const convertToMonths = (days: number) => {
    const daysInMonth = [31, isLeapYear(new Date().getFullYear) ? 29 : 28, 31, 30, 31,30, 31,31,30,31,30,31];
    const daysInyear = 365 + (isLeapYear(new Date().getFullYear) ? 1 : 0);

    if(days < daysInMonth[0]){
      return days < 2 ? days + ' day ago' : days + ' days ago';
    } else if(days < daysInyear){
      let months = 0;
      let remainingDays = 0;
      for(let i = 0; i < daysInMonth.length; i++){
        if(remainingDays < daysInMonth[i]){
          return months < 2 ? months + ' month ago' : months + ' months ago'
        }

        remainingDays -= daysInMonth[i];
        months++;
      }
    } else {
      const years = Math.floor(days /daysInyear);
      const remainingDays = days % daysInyear;
      if(remainingDays < daysInMonth[0]){
        return years < 2 ? years + ' year ago' : years +' years ago'
      } else {
        let months = 0;
        let remainingDays = 0;
        for(let i = 0; i < daysInMonth.length; i++){
          if(remainingDays < daysInMonth[i]){
            return months < 2 ? months + ' month ago' : months + ' months ago'
          }
          remainingDays -= daysInMonth[i];
          months++;
        }
      }
    }
}

const updateAtDate = (date: string) => {

   const dateUpdatedAt = new Date(date);
   const currentDate = new Date();

   const milliDifference = currentDate.getTime() - dateUpdatedAt.getTime();
   if(milliDifference < 60000){
     const secs = Math.floor(milliDifference / 1000)
     return secs + ' seconds ago'
   }
   
   if(milliDifference < 3600000){
    const mins = Math.floor(milliDifference / 60000)
    return mins + ' minutes ago';
   }
   
   if(milliDifference < 86400000){
      const hours = Math.floor(milliDifference / 3600000);
      return hours + ' hours ago';
   }
   
   const toDays = Math.floor(milliDifference / (1000 * 60 * 60 * 24));

   const convert = convertToMonths(toDays);
   return convert;
}
  
if(loader){
  return (
  <div className="flex flex-col justify-center items-center py-5">
    <SmallLoader />
    <p className='font-semibold text-xs'>Fetching codes</p>
    </div>  
)
}
 
  return (
    <>
    {codeData?.length === 0 ? (
             <div className='flex items-center justify-center py-2  rounded-b-md '>
              <p onClick={handleUploadButton} className='text-sm font-semibold text-[#4e4d4d] cursor-pointer hover:text-blue-600 transition-all'>Upload some codes....</p>
             </div>
          ):(
            <> 
            {codeData?.map((file: any, index: React.Key) => {
              return (
                <div key={index}
                 className={`py-1 px-2 hover:bg-[#f7f6f6] hover:cursor-pointer flex items-center justify-between ${index !== codeData.length - 1 ? 'border-b border-[#c6c4c4]  ' : 'rounded-b-md'} transition-all`}>
                <div className="flex items-center gap-4">
                 <CiFileOn className='text-[gray] ml-2'/>
                <Link to={`/group/${groupId}/Codes/view/${file._id}/${file.filename}`} className='text-sm hover:underline hover:text-blue-500'
                onClick={() => dispatch(setViewerState(file.filename))}
                >{file.filename}</Link>
                </div>
                <div className="flex items-center px-1">
                 <p className='text-xs text-[gray] '>Updated {updateAtDate(file.updatedAt)} </p>
                </div>
               </div>
              )
             })}
            </>
           )}
    </>
  )
}
export default Codes

