// import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const handleLogin = () => {
        navigate('/userna')
    }
  return (
    <div>
        <h1>Login</h1>
        <div>
            <label>Email </label>
            <input type="email" /><br /><br />
            <label>Password </label>
            <input type="password" />
        </div><br />
        <button onClick={handleLogin}>Login</button>
        <button style={{marginLeft:"20px"}} onClick={()=>navigate("/")}>Signup</button>
    </div>
  )
}

export default Login