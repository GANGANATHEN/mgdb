import { useState } from "react";
import axios from "axios";

const File = () => {
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) {
            setMessage("Please enter some text.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/store-text", { text });
            setMessage(response.data.message);
            setText("");
        } catch (error) {
            setMessage("Error storing text.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Enter Text to Store in MongoDB</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text..."
                    style={{ padding: "10px", width: "300px" }}
                />
                <button type="submit" style={{ marginLeft: "10px", padding: "10px" }}>Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default File;
