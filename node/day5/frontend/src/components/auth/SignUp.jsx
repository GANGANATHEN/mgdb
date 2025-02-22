// import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = ({switchToLogin}) => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }
  const handleSignup = async (e) => { 
    e.preventDefault();  
    try {
        const response = await axios.post('http://localhost:5000/api/signup', userInfo);
        if (response.status === 200) { 
            alert(response.data.message);
            setUserInfo({ username: '', email: '', password: '' });
            switchToLogin();
        } else {  
            alert("User Registration failed");
        }
    } catch (error) {
        console.error("Signup error:", error);
        alert(error.response?.data?.message || "User Registration failed");
    }
};
  return (
    <div>
      <h2>SignUp Page</h2>
      <div>
        <label>Username </label>
        <input 
          type="text"
          value={userInfo.username}
          name="username"
          onChange={handleChange}
          required
           /> <br /><br />
        <label>Email </label>
        <input 
          type="email"
          value={userInfo.email}
          name="email"
          onChange={handleChange}
          required
           /> <br /><br />
        <label>Password </label>
        <input 
          type="password"
          value={userInfo.password}
          name="password"
          onChange={handleChange}
          required
           /> <br /><br />
        <button onClick={handleSignup}>Sign Up</button>
        <p>if alredy have Account <button onClick={()=>navigate('/login')}>SignIn</button></p>
      </div>
    </div>
  )
}

export default SignUp