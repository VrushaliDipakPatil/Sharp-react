// pages/api/update-todo.js

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const todoId = req.query.id;

    try {
        const client = await MongoClient.connect('mongodb+srv://vrushalip91097:vrushrani@cluster0.olkd5ds.mongodb.net/todos?retryWrites=true&w=majority')


      const db = client.db();
      const todosCollection = db.collection('todos');

      const filter = { _id: new ObjectId(todoId) };
      const updateDoc = {
        $set: {
          completed: true, // Update the completion status to true
        },
      };

      const result = await todosCollection.updateOne(filter, updateDoc);

      client.close();

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: 'Todo updated successfully' });
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(400).json({ message: 'Invalid request method' });
  }
}
