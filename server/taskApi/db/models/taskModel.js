const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: Number, default: 0 },
    userToken: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model('Task', taskSchema);
