import { useState } from 'react';

const Login = ({ switchToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login Request Body:', { email, password }); // Log the request body

        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email,password: password.trim() }),
        });
        
        const data = await response.json();

        if (response.ok) {
            alert(data.message); // Success message
            // Redirect to To-Do List page
            window.location.href = '/todo'; // Update this if using React Router
        } else {
            alert(data.message); // Invalid credentials message
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <button onClick={switchToSignup}>Sign Up</button></p>
        </div>
    );
};

export default Login;
