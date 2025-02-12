require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // Ensure this line is present before defining routes

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Create Schema & Model
const TextSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Text is required"],
        minlength: [3, "Text must be at least 3 characters long"]
    }
});

const TextModel = mongoose.model("Text", TextSchema);

// API Route to Store Text in Database
app.post("/api/store-text", async (req, res) => {
    const { text } = req.body;
    if (!text || text.length < 3) {
        return res.status(400).json({ message: "Text is required and must be at least 3 characters long." });
    }
    try {
        const newText = new TextModel({ text });
        await newText.save();
        res.status(201).json({ message: "Text saved successfully!" });
    } catch (error) {
        console.error("Error saving text:", error);
        res.status(500).json({ message: "Error saving text", error: error.message });
    }
});

// API Route to Get All Stored Texts
app.get("/api/get-texts", async (req, res) => {
    try {
        const texts = await TextModel.find(); // Fetch all texts from the database
        res.status(200).json(texts); // Send the texts as a JSON response
    } catch (error) {
        console.error("Error fetching texts:", error);
        res.status(500).json({ message: "Error fetching texts", error: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
