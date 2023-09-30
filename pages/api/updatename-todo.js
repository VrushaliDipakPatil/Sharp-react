// pages/api/updatename-todo.js

import { connectDB } from '../../utils/db';
import Todo from '../../models/Todo';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const todoId = req.query.id;
    const { title } = req.body; // Get the updated todo title from the request body

    try {
      await connectDB();

      const updatedTodo = await Todo.findByIdAndUpdate(
        todoId,
        { title }, // Update the todo title
        { new: true } // Return the updated todo
      );

      res.status(200).json({ message: 'Todo updated successfully', updatedTodo });
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ message: 'Error updating todo' });
    }
  } else {
    res.status(400).json({ message: 'Invalid request method' });
  }
}
