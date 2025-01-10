import Home from './SidebarOptions/Home';
import { useNavigate } from 'react-router-dom';
import Layout from './Navbar/Layout';
import { getToken } from '../Services/Token/TokenService';
import '../components/Loader/Loader.css'

const Dashboard = () => {
  const navigate = useNavigate();

  if(!getToken){
     navigate('/')
  }
  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export default Dashboard