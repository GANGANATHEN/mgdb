require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes'); // Import the To-Do routes

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log(err));

// Use user and todo routes
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes); // Use the To-Do routes

// Start the server
app.listen(5000, () => console.log('🚀 Server running on port 5000'));
