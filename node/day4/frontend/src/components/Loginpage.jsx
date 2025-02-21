// import React from 'react'
import { useState } from "react";
import axios from "axios";

const Loginpage = () => {

    const [users, setusers] = useState({
        username: "",
        email: "",
        password: "",
        phno: "",
    });
    const handleChange = (e) => {
        setusers({ ...users, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/users", users);
            alert(response.data.message);
            setusers({ username: "", email: "", password: "", phno: "" });
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to register user");
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Username </label>
            <input 
                type="text" 
                name="username"
                onChange={handleChange}
                value={users.username} 
                required /><br /> <br />
            <label>Email </label>
            <input 
                type="email" 
                name="email"
                onChange={handleChange}
                value={users.email} 
                required /><br /> <br />
            <label>Password </label>
            <input
                type="password" 
                name="password"
                onChange={handleChange}
                value={users.password} 
                required /><br /> <br />
            <label>Phone Number </label>
            <input 
                type="number" 
                name="phno"
                onChange={handleChange}
                value={users.phno} 
                required /><br /> <br />
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Loginpage