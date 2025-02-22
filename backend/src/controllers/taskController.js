const pool = require('../config/db');
const tracer = require('../tracing/tracer');

exports.getTasks = async (req, res) => {
  const span = tracer.startSpan('getTasks');
  try {
    const [rows] = await pool.query('SELECT * FROM tasks');
    span.finish();
    res.json(rows);
  } catch (error) {
    span.setTag('error', true).finish();
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const span = tracer.startSpan('createTask');
  try {
    const [result] = await pool.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description]);
    span.finish();
    res.status(201).json({ id: result.insertId, title, description });
  } catch (error) {
    span.setTag('error', true).finish();
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const span = tracer.startSpan('updateTask');
  try {
    const [result] = await pool.query('UPDATE tasks SET title = ?, description = ? WHERE id = ?', [title, description, id]);
    if (result.affectedRows === 0) {
      span.setTag('error', true).finish();
      return res.status(404).json({ error: 'Task not found' });
    }
    span.finish();
    res.json({ id, title, description });
  } catch (error) {
    span.setTag('error', true).finish();
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const span = tracer.startSpan('deleteTask');
  try {
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      span.setTag('error', true).finish();
      return res.status(404).json({ error: 'Task not found' });
    }
    span.finish();
    res.status(204).send(); // No content on successful deletion
  } catch (error) {
    span.setTag('error', true).finish();
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTasks: exports.getTasks,
  createTask: exports.createTask,
  updateTask: exports.updateTask,
  deleteTask: exports.deleteTask,
};