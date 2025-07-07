// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user; // ✅ set user here
    next();
  } catch (err) {
    console.error('Invalid token:', err.message);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = protect;
