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
  phno: { type: Number, unique: true },
});

const User = mongoose.model('User', userSchema);

// Route to store user data
app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password ,phno } = req.body;
    const existingUser = await User.findOne({ email, phno });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or Phone Number is already registered' });
    }
    const newUser = new User({ username, email, password,phno });
    await newUser.save();
    res.json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user', error });
  }
});

// Route to fetch all users
app.get('/api/users', async (req, res) => {
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