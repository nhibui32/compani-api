const auth = require('../middleware/auth')
const express = require('express')
const router = express.Router();

router.post('/', auth(['admin', 'manager']), (req, res) => {
  // Only admin and manager can post
});

router.put('/:idProduct', auth(['admin']), (req, res) => {
  // Only admin can update
});

router.delete('/:idProduct', auth(['admin']), (req, res) => {
  // Only admin can delete
  res.json({ message: `Deleted by ${req.user.username}` })
});

module.exports = router;