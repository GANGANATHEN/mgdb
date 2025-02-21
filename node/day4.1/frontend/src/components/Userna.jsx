// import React from 'react'
import { useNavigate } from 'react-router-dom'

const Userna = () => {
    const navigate = useNavigate()

  return (
    <div>
        <h1>User Name</h1>
        <h3>user.name</h3>
        <button onClick={()=>navigate("/login")}>Login Page</button>
        <button style={{marginLeft:"20px"}} onClick={()=>navigate("/")}>Signup Page</button>
    </div>
  )
}

export default Userna