import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./reg.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleregister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://todo-backend-mern-1.onrender.com/api/user/reguser", { name, email, password });
      if (response.status === 200) {
        alert("User added successfully");
        navigate("/");
      } else {
        alert("Server error");
        window.location.reload();
      }

    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Failed to add user. Please try again.");
        window.location.reload();
      } else {
        alert("Try again after some time");
      }

    }
  };

  return (
    <div className='content'>
      <form onSubmit={handleregister} className='register-form'>
        <p className='pa'>REGISTER USER</p>
        <input type="text" placeholder='Add your name' value={name} onChange={(e) => setName(e.target.value)} className="inn" />
        <input type="email" placeholder='Add your email' value={email} onChange={(e) => setEmail(e.target.value)} className="inn" />
        <input type="password" placeholder='Add your password' value={password} onChange={(e) => setPassword(e.target.value)} className="inn" />
        <button type="submit" className='register-button'>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
