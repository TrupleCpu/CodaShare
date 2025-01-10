import React from 'react'
import Sidebar from './Sidebar'
import { useParams } from 'react-router-dom'
import Chats from './Pages/Chats';
import Layout from './Pages/Layout';

const Grouppage = () => {
    const { groupId }: any = useParams();
    
  return (
    <Layout>
      asdasdasd
    </Layout>
  )
}

export default Grouppage