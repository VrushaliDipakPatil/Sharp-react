// pages/api/completed-todos.js

import { connectDB } from '../../utils/db';
import Todo from '../../models/Todo';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connectDB();

      const completedTodos = await Todo.find({ completed: true });

      res.status(200).json(completedTodos);
    } catch (error) {
      console.error('Error fetching completed todos:', error);
      res.status(500).json({ message: 'Error fetching completed todos' });
    }
  } else {
    res.status(400).json({ message: 'Invalid request method' });
  }
}
