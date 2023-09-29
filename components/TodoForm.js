// components/TodoForm.js

import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = (props) => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/todo', { text });
      setText('');
      // Call the parent function to fetch todos after successfully adding a new todo
      props.onTodoAdded();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new todo"
        value={text}
        onChange={handleTextChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
