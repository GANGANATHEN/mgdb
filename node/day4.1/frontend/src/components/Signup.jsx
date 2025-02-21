import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [usersInfo, setUsersInfo] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {  // ✅ Fixed function name
        setUsersInfo({
            ...usersInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users', usersInfo);
            alert(response.data.message);
            setUsersInfo({ username: '', email: '', password: '' });
        } catch (error) {
            console.error('Error submitting form:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Failed to register user');
        }
    };

    const navigate = useNavigate();

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <label>Username </label>
                <input 
                    type="text"
                    name="username"
                    value={usersInfo.username}
                    onChange={handleChange} 
                    required
                /><br /><br />
                
                <label>Email </label>
                <input 
                    type="email"
                    name="email"
                    value={usersInfo.email}
                    onChange={handleChange} 
                    required
                /><br /><br />
                
                <label>Password </label>
                <input 
                    type="password"
                    name="password"
                    value={usersInfo.password}
                    onChange={handleChange} 
                    required
                /><br /><br />
                
                <button type="submit">Sign Up</button>
                <button style={{ marginLeft: "20px" }} onClick={() => navigate('/login')}>
                    Already have an account?
                </button>
            </form>
        </div>
    );
};

export default Signup;
