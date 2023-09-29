// pages/index.js

import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import axios from 'axios';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todo');
      setTodos(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []); // Fetch todos on component mount

  const handleTodoAdded = async () => {
    // Re-fetch todos after successfully adding a new todo
    await fetchTodos();
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm onTodoAdded={handleTodoAdded} />

      {loading ? (
        <p>Loading todos...</p>
      ) : (
        <TodoList todos={todos} />
      )}
    </div>
  );
};

export default Home;
