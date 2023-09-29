const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.models.Todo || mongoose.model('Todo', todoSchema);
