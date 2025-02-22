require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Create Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

// Route to store user data
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user', error });
  }
});

//Signin
app.post('/api/signin', async (req, res) => {
  try {
    console.log('📩 Incoming Sign-In Request:', req.body); // Log request body

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("⚠️ Missing fields:", { email, password });
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("⚠️ User not found:", email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (password !== user.password) {
      console.log("⚠️ Incorrect password for:", email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log("✅ Login successful for:", email);
    res.status(200).json({ message: 'Login successful', userId: user._id });

  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Route to fetch all users
app.get('/api/signup', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:PORT`);
});