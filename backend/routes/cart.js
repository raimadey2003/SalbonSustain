const express = require('express');
const router = express.Router();

// Note: For simplicity, we'll handle cart on frontend
// In production, you might want to store cart in database for logged-in users

router.get('/', (req, res) => {
  res.json({ message: 'Cart functionality handled on frontend' });
});

module.exports = router;