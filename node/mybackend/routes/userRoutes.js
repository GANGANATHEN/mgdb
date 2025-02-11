const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Signup route
// router.post('/signup', async (req, res) => {
//     const { name, email, password, username } = req.body; // Ensure username is included

//     console.log('Signup Request Body:', req.body); // Log the incoming request body

//     try {
//         // Check if the user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with bcrypt
// const newUser = new User({ name, email, password: hashedPassword, username });
// await newUser.save();
//         res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         console.error('Error creating user:', error); // Log the error to the console
//         res.status(500).json({ message: 'Error creating user', error: error.message });
//     }
// });

router.post('/signup', async (req, res) => {
    const { name, email, password, username } = req.body;
    console.log('Signup Request Body:', req.body); // Log the incoming request body

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, username });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});


//login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     console.log('Login Request Body:', req.body); // Log incoming request

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         console.log('Password Match:', isMatch); // Log the password match result

//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // User is authenticated
//         res.status(200).json({ message: 'Login successful' });
//     } catch (error) {
//         console.error('Server error:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login Request Body:', req.body); // Log incoming request
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password Match:', isMatch); // Log the password match result
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});






// Password Recovery (implement basic functionality)
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    // Logic to send a password recovery email would go here
    res.json({ message: 'Password recovery link sent (not implemented)' });
});

module.exports = router;
