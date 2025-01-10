import axios from 'axios'
import React, { useState } from 'react'

const AddMember = () => {
  const [name, setName] = useState('');
    const addM = async () => {
        const data = {
          groupID: "6627dbd799ef1e325c471afa",
          userID: name
        }
       try {
          const addMem = await axios.post('http://localhost:5000/addMember', data)
          console.log(addMem)
       } catch (err) {
        console.error(err)
       }
    }
  return (
    <div><input type='text' onChange={(e) => setName(e.target.value)} value={name}/> <button onClick={addM}>add</button></div>
  )
}

export default AddMember