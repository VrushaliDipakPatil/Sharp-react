import connectDB from '../../utils/dbConnect';
import Todo from '../../models/Todo';

connectDB();

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { text } = req.body;

    try {
      const todo = new Todo({ text });
      await todo.save();
      res.status(201).json({ success: true, data: todo });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (req.method === 'GET') {
    try {
      const todos = await Todo.find();
      res.status(200).json({ success: true, data: todos });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
};

export default handler;
