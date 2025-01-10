import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {  useQuery } from 'react-query';
import { CustomColorLoader } from '../../components/Loader/Loader';
import { GoCopy } from "react-icons/go";
import { BsDownload } from "react-icons/bs";
import { FaRegFile } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import Tooltip from '../../components/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setViewerState } from '../../Services/Features/codeViewer';
import { useAuthContext } from '../../Services/Context/AuthContextProvider';
import { useAppContext } from '../../Services/Context/AppContextPrivder';
import { AnimatePresence, motion } from 'framer-motion';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const Codeviewer = () => {
    const { userDetails }: any = useAuthContext();
    const { fileID,fileName, groupId }: any = useParams();
    const { setDisableContents, disableContents } = useAppContext();
    const [fileContents, setFileContents] = useState([]);
    const [senderID, setSenderID] = useState([]);
    const [openDeleteBox, setOpenDeleteBox] = useState(false);
    const [loader, setLoader] = useState(false);
    const [fileEx, setFileEx] = useState();
    const target: any = useRef(null);
    const viewerState = useSelector((state: RootState) => state.codeviewer.viewerState);
    const dispatch = useDispatch();

    const navigate = useNavigate();
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
         try {
              const getData = await axios.get(`http://localhost:5000/getCodes/${dataGroup?._id}`)
              console.log(getData.data);
              return getData.data;
         } catch(error){
          console.log(error)
         }
      }
    
      const {data: codeData} = useQuery('codeDatas', getCodesData, {
        enabled: !!dataGroup?._id
      });
    
   
    useEffect(() => {
        setFileEx(fileName?.split('.').pop());
    },[fileName])
    
    useEffect(() => {
        
    const getCodes = async() => {
        setLoader(true)
        try {
           const res = await  axios.get(`http://localhost:5000/getSourceCode/${fileID}`);
           setSenderID(res.data.codeSenderID)
           setFileContents(res.data.text);
           setLoader(false)
        } catch (error) {
            console.log(error)
        }
    }

    getCodes();
    }, [fileID])

   

    const handleCopyCode = async() => {
        const text: any = fileContents;
        try {
             await navigator.clipboard.writeText(text);
             alert("Code copied")
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleDownloadCode = () => {
        const link = document.createElement('a');
        link.href =`https://storage.googleapis.com/codashare.appspot.com/${fileName}-${groupId}`
        link.download;
        link.click();
    }

    const handleBackButton = () => {
        navigate(`/group/${groupId}/codes`)
    }


    return (
       <div className="w-[100%] flex"  ref={target}>
        <div className="w-[14rem]  min-h-screen fixed bg-white border-r  flex flex-col" style={{pointerEvents: disableContents ? 'none' : 'auto'}}>
        <div className="py-[0.3rem]  border-b-2 px-2">
               <p className='text-2xl font-semibold'>Files</p>
               </div>
             <div className=" flex left-2 flex-col h-[32rem] overflow-y-auto text-[.875rem]  px-2 py-1" >
                 {codeData?.map((file: any, index: React.Key) => (
                   <Link key={index} to={`/group/${groupId}/Codes/view/${file._id}/${file.filename}`} className={`flex gap-2 text-[#4e4d4d]  items-center px-2 py-2 rounded-sm  ${viewerState === file.filename && 'text-violet-500 bg-violet-300 font-semibold'} transition-all`} onClick={() => dispatch(setViewerState(file.filename))}><FaRegFile /> {file.filename}</Link>
                 ))}
             </div>
             <div className="flex items-center justify-center mt-5">
                 <button className='rounded-md px-8 py-2   bg-[#6D31EDFF] hover:bg-[#9a77e6] text-white transition-all active:scale-90' onClick={handleBackButton}><FaArrowLeft /></button>
               </div>
        </div>
        <AnimatePresence>
        {openDeleteBox && <PopBoxDelete setOpenDeleteBox={setOpenDeleteBox} target={target} />}
        </AnimatePresence>
        <div className="pl-[14rem] w-full overflow-x-auto   min-h-screen flex flex-col items-center justify-center bg-[whitesmoke] border-2 " style={{pointerEvents: disableContents ? 'none' : 'auto'}}>
        <div className="w-full py-2 px-3 flex items-center justify-between bg-[#ffffff] border-b-2">
         <div className="">
            <div className="">
                <p className='font-semibold px-1 rounded-sm'>Code / <span className='text-violet-500'>{fileName?.replace('.java', '')}</span></p>
            </div>
         </div>
         <div className="" >
            <div className=" gap-2 flex px-1 rounded-sm ">
           <Tooltip content='Copy&nbsp;code'>
           <GoCopy onClick={handleCopyCode} className='text-2xl cursor-pointer px-1 py-1' />
           </Tooltip>
            <Tooltip content='Download&nbsp;code'>
            <BsDownload onClick={handleDownloadCode} className='text-2xl cursor-pointer px-1 py-1 ' />
            </Tooltip>
            {userDetails.userID === senderID &&   <Tooltip content='Delete&nbsp;file'>
            <CiTrash onClick={() => {
                setOpenDeleteBox(true)
                disableBodyScroll(target.current)
                setDisableContents(true)
            }} className='text-2xl cursor-pointer px-1 py-1 hover:text-red-500 transition-all'/>
            </Tooltip>}
            </div>
         </div>
        </div>
        {loader ?
        (
         <div className="h-full flex flex-col gap-1 items-center justify-center w-full">
             <CustomColorLoader color={'#6D31EDFF'} />
             <p className='text-sm text-[#4e4d4d] font-semibold'>Loading code</p>
         </div>
        ) : (
         <SyntaxHighlighter language={fileEx} className='h-full flex text-sm w-full ' style={oneLight}>
         {fileContents}
     </SyntaxHighlighter>
       )
       }
        </div>
       </div>
    );
};

interface PopBoxDeleteProps {
    setOpenDeleteBox: Dispatch<SetStateAction<boolean>>;
    target: any
}

const PopBoxDelete: React.FC<PopBoxDeleteProps> = ({ setOpenDeleteBox, target }) => {
    const {groupId, fileName}: any = useParams();
    const [loader, setLoader] = useState<boolean>(false);
    const {setDisableContents} = useAppContext();
    const [filename, setFilename] = useState<any>();
    const navigate = useNavigate();
    const { userDetails }: any = useAuthContext();
    const {fetchUserSharedCode} = useAppContext();

    const handleDeleteFile = async() => {
        setLoader(true)
        const data = {
           fileName: fileName,
           groupName: groupId,
           username: userDetails.username

        }
       try{
           const deleteFile = await axios.post('http://localhost:5000/deleteFile', data);
           if(deleteFile.data.message === "Deleted successfuly!"){
               fetchUserSharedCode();
               navigate(`/group/${groupId}/codes`)
               enableBodyScroll(target.current)
               setDisableContents(false)
               setLoader(false)
               
           }
           console.log(deleteFile)
        } catch (error){
           console.log(error)
        } 
   }
    return (
        <motion.div 
        initial={{scale: 0, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        exit={{scale: 0, opacity: 0}}
        transition={{duration: 0.2}}
        className="flex flex-col gap-2 absolute top-[10%] left-[36.5%] bg-white px-5 py-5 rounded-md border">
            <div className="flex gap-1 flex-col">
                <p className='text-2xl text-red-500'>Delete File</p>
                <p className='text-sm '>To delete <span className='font-medium text-[#4e4d4d]'>{fileName.replace('.java', '')} </span>from the codes, type the name to confirm</p>
            </div>
            <div className="w-full">
                <input type="text" className='w-full bg-[#fffdfd] border-2 px-2 py-2 rounded-md focus:border-blue-400 transition-all font-semibold text-sm' placeholder='Enter filename' value={filename} onChange={(e) => setFilename(e.target.value)} />
            </div>
            <div className="flex justify-end gap-2">
                <button className='px-3 border bg-[whitesmoke] py-2 text-sm rounded-md font-semibold' onClick={() => {
                    setOpenDeleteBox(false)
                    setDisableContents(false)
                    enableBodyScroll(target.current)
                }}>Cancel</button>
                  <button className={`w-[5rem] border ${filename === fileName.replace('.java', '') ? 'bg-red-500 text-white ' : 'bg-[#dbd9d9] cursor-not-allowed'} py-2 text-sm rounded-md font-semibold transition-all flex items-center justify-center`} onClick={() => {
                    if(filename === fileName.replace('.java', '')){
                        handleDeleteFile()
                    }
                }} disabled={loader}>{loader ? <CustomColorLoader  color={'#Ffffff'}/> : "Delete"}</button>
            </div>
        </motion.div >
    )
}
export default Codeviewer;
