import axios from 'axios';
import Layout from './Layout';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { MdGroup } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const Settings = () => {
  const {groupId} = useParams();
  const groupTypes = ['Public', 'Private'];
  const requestSettings = ['Automatic Approval', 'Manual Approval'];
  const editUploadCode = ['Anyone', 'Only Admins'];
  const chatPerms = ['Anyone', 'Only Admins'];

  const fetchData = async() => {
      try { 
          const getData = await axios.get(`http://localhost:5000/singleGroup/${groupId}`)
          console.log( getData.data.getGroup)
          return getData.data.getGroup;

      } catch (error) {
        console.log(error)
      }
  }

  const {data: groupData } = useQuery('settingGroupData', fetchData, {
    enabled: !!groupId
  })

  return (
    <Layout>
      <div className="pl-[11.5rem] py-5 flex flex-col items-center justify-center">
        <div className="bg-gray-600 text-gray-100 w-[80%] px-4 py-4 rounded-md">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-2xl font-semibold flex gap-1 items-center"><MdGroup /> Group Information</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Group Name</p>
              <div className="flex items-center gap-2">
                <input type="text" value={groupData?.groupName} className=" px-2 py-2 rounded-sm w-[95%]" disabled />
                <button className="px-5 py-2 rounded-md bg-violet-500 text-white font-semibold">Edit</button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Group Description</p>
              <div className="flex items-center gap-2">
                <textarea cols={113} rows={5} className=" resize-none px-2 rounded" value={groupData?.groupDescription ? groupData.groupDescription : 'None'} disabled />
                <button className="px-5 py-2 rounded-md bg-violet-500 text-white font-semibold">Edit</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 bg-gray-600 text-gray-100 w-[80%] px-4 py-4 rounded-md">
          <p className="text-2xl font-semibold flex gap-1 items-center"><MdOutlinePrivacyTip /> Privacy & Visibility</p>
          <div className="flex justify-between gap-1 mt-2">
            <p className="font-semibold">Group Type</p>
            <select className=" px-2 rounded-sm bg-gray-500">
              {groupTypes.map((opt, index) => (
                <option value={opt} key={index}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="mt-3 flex justify-between gap-1 items-center">
            <p className="font-semibold">Join Request Settings</p>
            <select className=" px-2 rounded-sm bg-gray-500">
              {requestSettings.map((req, index) => (
                <option value={req} key={index}>{req}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5  bg-gray-600 text-gray-100 w-[80%] px-4 py-4 rounded-md">
          <p className="text-2xl font-semibold flex items-center  gap-1"><FaCode /> Code Sharing Settings</p>
          <div className="flex justify-between gap-1 mt-2">
            <p className="font-semibold">Who Can Upload Code</p>
            <select className=" px-2 rounded-sm bg-gray-500">
              {editUploadCode.map((opt, index) => (
                <option value={opt} key={index}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-2 flex justify-end w-[80%]">
          <button className='bg-violet-500 px-4 py-2 rounded-md font-semibold text-white'>Update</button>
        </div>
        <div className="mt-5 bg-red-600 text-white w-[80%] px-4 py-4 rounded-md flex flex-col gap-2">
          <p className="text-2xl font-semibold">Group Deletion</p>
        <div>
        <button className="bg-white text-red-600 px-4 py-2 font-semibold rounded-md border border-red-400 hover:bg-red-400 hover:text-white transition-all flex items-center gap-0.5">
          <FaRegTrashAlt />  Delete Group
          </button>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
