import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ If using React Router

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // ✅ React Router navigation

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signin', userInfo);
      alert(response.data.message); // ✅ Show success message
      setUserInfo({ email: '', password: '' });

      // ✅ Use navigate() for React Router, otherwise use window.location.href
      navigate('/todo');  
    } catch (error) {
      console.error("❌ SignIn error:", error);
      alert(error.response?.data?.message || "User SignIn failed.");
    }
  };

  return (
    <div>
      <h2>SignIn Page</h2>
      <form onSubmit={handleSignIn}> {/* ✅ Use form for better handling */}
        <label>Email </label>
        <input 
          type="email"
          value={userInfo.email}
          name="email"
          onChange={handleChange}
          required
        /> 
        <br /><br />
        
        <label>Password </label>
        <input 
          type="password"
          value={userInfo.password}
          name="password"
          onChange={handleChange}
          required
        /> 
        <br /><br />
        
        <button type="submit">SignIn</button> {/* ✅ Use submit type */}
      </form>
    </div>
  );
};

export default SignIn;
