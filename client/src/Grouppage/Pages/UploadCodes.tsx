import  { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaRegFile } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import axios from 'axios';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useAuthContext } from '../../Services/Context/AuthContextProvider';
import Layout from './Layout';
import  { BigLoader } from '../../components/Loader/Loader';
import { useAppContext } from '../../Services/Context/AppContextPrivder';

type FileWithPreview = {
    file: File,
}
const UploadCodes = () => {
  const [loader, setLoader] = useState<boolean>(false);

  return (
    <Layout> 
    {loader ? (
      <div className="pl-[11.5rem] min-h-screen w-screen flex items-center justify-center flex-col gap-2">
        <BigLoader />
        <p className='text-[#4e4d4d] font-semibold text-2xl'>Processing your files...</p>
        <p className='text-[#4e4d4d] '>This may take a few minutes to complete.</p>
      </div>
    ):(
      <UploadComponent setLoader={setLoader}  />
    )}
    </Layout>
  )
}



interface UploadComponentsProps {
  setLoader: Dispatch<SetStateAction<boolean>>;
}

const UploadComponent: React.FC<UploadComponentsProps> = ({setLoader}) => {
  const {groupId} = useParams();
  const {userDetails}: any = useAuthContext();
  const [description, setDescription] = useState();
  const [error, setError] = useState<boolean>(false);
  const [files, setSelectedFiles] = useState<FileWithPreview[]>([]);
 const navigate = useNavigate();
 const { fetchUserSharedCode } = useAppContext();
  const onDrop = useCallback((acceptedFiles: File[]) => {
     setSelectedFiles((prevFiles) => [
          ...prevFiles,
          ...acceptedFiles.map(file => ({
              file
          }))
      ])
  }, [])

const removeFile = (fileRemoved: FileWithPreview) => {
  setSelectedFiles(prevFiles => prevFiles.filter(file => file !== fileRemoved))
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

const {data: dataGroup} = useQuery('groupDatas',fetchGroupData);



const handleAcceptedFiles = (language: string) => {
  switch(language) {
    case "C":
      return ['.c'];
    case "Typescript":
      return ['.tsx'];
    case "Java":
      return ['.java'];
    case "Python":
      return ['.py'];
    case "Javascript":
      return ['.js'];
    case "C++":
      return ['.cpp'];
    default:
      return [];
  }
};
const acceptedFiles = [
  '.c', '.cpp', '.java', '.py', '.js', '.swift', '.rb', '.php',
  '.go', '.rs', '.kt', '.ts', '.pl', '.r', '.m', '.hs', '.lua',
  '.scala', '.sh', '.tsx', '.jsx', '.txt'
];

const getAcceptedFiles = (language: any ): Record<string, string[]> => {
  const fileExtensions = handleAcceptedFiles(language);
  if(fileExtensions.length === 0){
      return acceptedFiles.reduce((acc: Record<string, string[]>, ext: string) => {
          const mimetype = ext === '.txt' ? 'text/plain' : `text/${ext.slice(1)}`;
          acc[mimetype] = acc[mimetype] ? [...acc[mimetype], ext] : [ext];
          return acc;
      }, {})
  }
  const mimetype = fileExtensions[0] === '.txt' ? 'text/plain' : `text/${fileExtensions[0].slice(1)}`;
  return {[mimetype]: fileExtensions }
}

const { getRootProps, getInputProps, isDragActive } = useDropzone({
   onDrop,
   accept: getAcceptedFiles(dataGroup?.languageUsed)
})


const submit = async() => {
  if(files.length === 0){
    setError(true)
    return;
  }
 setLoader(true)

try {

 
    const formData = new FormData();
  files.forEach((file) => {
    formData.append('file', file.file);
  })

  const data = {
     groupID: dataGroup._id,
     senderID: userDetails.userID,
     description: description,
     groupName: dataGroup.groupName
  }
console.log([files, data])
    const insert = await axios.post('http://localhost:5000/uploadCode',  formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        params: data
    });

    console.log('File upload successful:', insert.data); 
    setSelectedFiles([])
    fetchUserSharedCode();

      setLoader(false);
      navigate(`/group/${groupId}/codes`)
} catch (error) {
    console.error('Error uploading file:', error);
} 
}


const handleCancelUpload = () => {
   navigate(`/group/${groupId}/codes`)
}
  return (
    <>
     <div className="pl-[11.5rem] relative bg-[white] flex flex-col   ">
       {error  &&  <div className="py-1 bg-red-400 text-white font-semibold text-xs flex items-center justify-between  px-5 border-2 border-red-400">
        <p>Add some files to be uploaded</p>
        <IoIosClose onClick={() => setError(false)} className='cursor-pointer text-2xl font-semibold' />
       </div>}
       <p className=' font-semibold mt-5'><Link to={`/group/${groupId}/Codes`} className='text-blue-700 hover:underline transition-all'>{groupId}</Link> / Upload code</p>
   </div>
    <div className='pl-[11.5rem] flex flex-col  px-20 min-h-screen bg-[white] py-5'>
     {dataGroup?.length !== 0 && (
        <div  className={`border-2 h-32 w-full bg-[wh] flex items-center justify-center flex-col  border-dashed border-[#c6c4c4] p-4 rounded-lg ${isDragActive ? 'bg-gray-100' : ''}`}>
        <input type='file' {...getInputProps()} />
        <FaRegFile className='text-3xl  text-[gray]'/>
        <p className='font-semibold text-lg'>Drag files to add them to your group codes</p>
        <p><span className=' text-[gray]'>Or</span> <span {...getRootProps()} className='text-blue-700 hover:underline hover:cursor-pointer'> choose your files </span></p>
      </div>
     )}
     <div className="mt-2">
     {files.length > 0 && (
           <ul className='flex flex-col gap-2 '>
               {files.map((file, index) => (
                   <li key={index} className='flex items-center justify-between border border-[#d6d5d5] px-2 py-2 rounded-lg'>
                       <div className="flex items-center gap-2">
                           <FaRegFile />
                           <span>{file.file.name}</span>
                       </div>
                       <button className="hover:text-red-600 transition-all active:scale-95" onClick={() => removeFile(file)}>< IoIosClose className='text-2xl'/></button>
                   </li>
               ))}
           </ul>
     )}
     </div>
    <div className="flex gap-5 py-5">
    <div className="h-20 w-20  rounded-full">
       <img src={userDetails.profileURL} alt='user-profile' className='w-full h-full' />
      </div>   
   <div className="flex w-full flex-col">
    <div className="relative w-full border py-5 px-10 rounded-md">
       <span className='absolute h-5 w-5 bg-[white] ml-[-3.1rem] rotate-45 mt-[5px] border border-r-transparent border-t-transparent'></span>
       <textarea value={description} onChange={(e: any) => setDescription(e.target.value)}  rows={5} placeholder='Add an additional description about your code' className='text-[#5a5959] text-sm font-semibold w-full border  p-2 rounded-md resize-none'/>
      </div>
       <div className="py-3 flex gap-2">
       <button className='bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm flex items-center justify-center w-24  rounded-md transition-all' onClick={submit}>Upload code</button>
        <button className='bg-[#d8d7d7] text-red-600 font-semibold text-sm p-2 rounded-md hover:bg-red-600 hover:text-white transition-all' onClick={handleCancelUpload}>Cancel</button>
      </div>
   </div>
   </div> 
   </div>
    </>
  )
}
export default UploadCodes
