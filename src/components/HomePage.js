import React, { useEffect, useState } from 'react';
import './homepage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleTodo = async () => {
    const id = localStorage.getItem('userId');
    try {
      await axios.post("https://todo-backend-mern-1.onrender.com/api/todo/addtodo", { todo, id });
      alert("Todo added");
      setTodo(''); // Clear input field after adding todo
      fetchTodos(); // Refresh todos after adding new one
    } catch (error) {
      console.error(error);
      alert("Todo failed to add");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://todo-backend-mern-1.onrender.com/api/todo/deletetodo/${id}`);
      alert('Todo deleted');
      fetchTodos(); // Refresh todos after deleting one
    } catch (error) {
      console.error(error);
      alert("Failed to delete todo");
    }
  };

  const fetchTodos = async () => {
    try {
      const id = localStorage.getItem('userId');
      if (!id) {
        console.log("User ID not found in localStorage");
        return;
      }
      const res = await axios.get("https://todo-backend-mern-1.onrender.com/api/todo/gettodo", { params: { id } });
      setTodos(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('userId');
    if (!user) {
      alert("Login needed");
      navigate("/");
    } else {
      fetchTodos();
    }
  }, [navigate]);

  return (
    <div className='homepage-container'>
      <button onClick={handleLogout} className='add-btn'>Logout</button>
      <div className='input-container'>
        <input value={todo} onChange={(e) => setTodo(e.target.value)} className='inputt' type="text" placeholder='Add topic' />
        <button onClick={handleTodo} className='add-btn'>Add</button>
      </div>
      <div className="todos-container">
        {Array.isArray(todos) && todos.length > 0 ? todos.map((to) => (
          <div className='todos' key={to._id}>
            <p>{to.todo}</p>
            <div className='actions'>
              <button onClick={() => handleDelete(to._id)} className='delete-btn'>Delete</button>
            </div>
          </div>
        )) : <p>Nothing in todo</p>}
      </div>
    </div>
  );
};

export default HomePage;
