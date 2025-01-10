import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getToken } from '../../Services/Token/TokenService';
console.log(getToken())

function ProtectedRoute({ children }: any) {
    console.log(getToken())
   
    return getToken() ? children : <Navigate to='/' />

}

export default ProtectedRoute;
