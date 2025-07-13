const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all departments
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Department');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET department by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Department WHERE idEmployees = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new department
router.post('/', async (req, res) => {
  const { id, name, location } = req.body;

  if (!id || !name || !location) {
    return res.status(400).json({ error: 'name, location, and id are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO Department (id,name, location) VALUES (?, ?, ?)',
      [id, name, location]
    );
    res.status(201).json({ id, name, location });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) a department by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({ error: 'name and location are required' });
  }

  try {
    const [result] = await db.query(
      'UPDATE Department SET name = ?, location = ? WHERE id = ?',
      [name, location, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json({ message: 'Department updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a department by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM Department WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json({ message: 'Department deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
