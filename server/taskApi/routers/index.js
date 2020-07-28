/* eslint-disable func-names */
const Router = require('express').Router();
const Task = require('../db/models/taskModel');

Router.get('/', async function(req, res) {
  try {
    const { userToken } = req.query;

    res.status(200).json({
      tasks: await Task.find({ userToken }).sort({ createdAt: -1 }),
    });
  } catch (err) {
    res.status(501).send(`Server Error: ${err}`);
  }
});

Router.post('/create', async function({ body }, res) {
  try {
    const task = new Task(body);
    await task.save();
    res.status(201).json({ status: true, task });
  } catch (err) {
    res.status(501).send(`Server Error: ${err}`);
  }
});

Router.post('/toggle_status', async function({ body }, res) {
  try {
    const { taskId, status } = body;
    const updatedTask = await Task.findOneAndUpdate(
      { $and: [{ _id: taskId }] },
      { status },
      { new: true },
    );
    if (!updatedTask)
      return res.status(404).send({ status: false, msg: 'Task not found' });

    await updatedTask.save();
    res.status(200).json({ status: true, task: updatedTask });
  } catch (err) {
    res.status(501).send(`Server Error: ${err}`);
  }
});

Router.delete('/delete', async function({ body }, res) {
  try {
    await Task.findOneAndDelete({ $and: [{ _id: body.taskId }] });
    res.status(200).send({ status: true, msg: 'Task deleted' });
  } catch (err) {
    res.status(501).send(`Server Error: ${err}`);
  }
});

module.exports = Router;
