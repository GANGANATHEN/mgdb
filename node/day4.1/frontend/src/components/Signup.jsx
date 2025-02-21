// import React from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const handleLogin = () => {
        navigate('/login')
    }
  return (
    <div>
        <h1>Signup</h1>
        <div>
            <label>Username </label>
            <input type="text" /><br /><br />
            <label>Email </label>
            <input type="email" /><br /><br />
            <label>Password </label>
            <input type="password" />
        </div><br />
        <button onClick={handleLogin}>Sign Up</button>
        <button style={{marginLeft:"20px"}} onClick={() => navigate('/login')}>Alredy have Acount</button>
    </div>
  )
}

export default Signup