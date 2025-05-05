const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['open', 'in_progress', 'completed', 'overdue'], default: 'open' },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assigneeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', TaskSchema);