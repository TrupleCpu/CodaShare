import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import Signin from '../Home/AuthUI/Signin'
import Register from '../Home/AuthUI/Register'
import { getToken } from '../Services/Token/TokenService'
import Dashboard from '../Dashboard/Dashboard'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import Groups from '../Dashboard/Groups'
import Create from '../Dashboard/Create'
import Join from '../Dashboard/Join'
import Profile from '../Dashboard/Profile'
import Grouppage from '../Grouppage/Grouppage'
import Chats from '../Grouppage/Pages/Chats'
import Codes from '../Grouppage/Pages/Codes'
import Members from '../Grouppage/Pages/Members'
import Settings from '../Grouppage/Pages/Settings'
import Codeviewer from '../Grouppage/Pages/Codeviewer'
import UploadCodes from '../Grouppage/Pages/UploadCodes'
import axios from 'axios'

axios.defaults.withCredentials = true;

const RouteContainer = () => {
  return (
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/signin' element={<Signin />} />
    <Route path='/signup' element={<Register />} />
    <Route
     path='/dashboard'
     element={getToken() ? <Dashboard /> : <ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route
     path='/group'
    element={getToken() ? <Groups /> : <ProtectedRoute><Groups /></ProtectedRoute>} />
    <Route
     path='/create'
     element={getToken() ? <Create /> : <ProtectedRoute><Create /></ProtectedRoute>} />
    <Route
     path='/join'
     element={getToken() ? <Join /> : <ProtectedRoute><Join /></ProtectedRoute>} />
    <Route
     path='/profile'
     element={getToken() ? <Profile /> : <ProtectedRoute><Profile /></ProtectedRoute>} />
   <Route
      path='/group/:groupId'
      element={getToken() ? <Grouppage /> : <ProtectedRoute><Grouppage /></ProtectedRoute>}
    />
    <Route
      path='/group/:groupId/chats'
      element={getToken() ? <Chats /> : <ProtectedRoute><Chats /></ProtectedRoute>}
    />
    <Route
      path='/group/:groupId/codes'
      element={getToken() ? <Codes /> : <ProtectedRoute><Codes /></ProtectedRoute>}
    />
    <Route
     path='/group/:groupId/members'
     element={getToken() ? <Members /> : <ProtectedRoute><Members /></ProtectedRoute>}
    />
    <Route 
    path='/group/:groupId/group Settings' 
    element={getToken() ? <Settings /> : <ProtectedRoute><Settings /></ProtectedRoute>}
    />
    <Route
    path='/group/:groupId/Codes/view/:fileID/:fileName'
    element={getToken() ? <Codeviewer /> : <ProtectedRoute> <Codeviewer /></ProtectedRoute>}
    />
    <Route
    path='/group/:groupId/Codes/upload'
    element={getToken() ? <UploadCodes /> : <ProtectedRoute><UploadCodes /></ProtectedRoute>}
     />
    </Routes>
  )
}

export default RouteContainer