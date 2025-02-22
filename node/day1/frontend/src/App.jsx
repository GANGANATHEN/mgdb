// App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ToDoList from './pages/ToDoLists'; // Your existing To-Do List component

const App = () => {
    const [showSignup, setShowSignup] = useState(true); // State to toggle between signup and login

    const switchToLogin = () => setShowSignup(false);
    const switchToSignup = () => setShowSignup(true);


    return (
        <Router>
            <Routes>
                <Route path="/" element={showSignup ? <Signup switchToLogin={switchToLogin} /> : <Login switchToSignup={switchToSignup} />} />
                <Route path="/todo" element={<ToDoList />} /> {/* Your To-Do List component */}
            </Routes>
        </Router>
    );
};

export default App;
