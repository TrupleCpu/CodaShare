import React from 'react'
import Signin from './AuthUI/Signin';
import Register from './AuthUI/Register';

const Logregcon = (props: any) => {

    const {userClick, setUserClick} = props;
   
    if(userClick === 'Signin'){
        return ( 
        <Signin userClick={userClick} setUserClick={setUserClick}/>
        ) 
    } else if(userClick === 'Signup'){
        return (
             <Register userClick={userClick} setUserClick={setUserClick} />
        )
    } 
 
}

export default Logregcon