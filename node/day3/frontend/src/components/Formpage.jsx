import { useState } from "react";
import axios from "axios";

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users", formData);
      alert(response.data.message);
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to register user");
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required /><br />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required /><br />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default FormPage;
