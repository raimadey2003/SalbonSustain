const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware'); // ✅ Make sure this is correct
// const protect = require('../middleware/authMiddleware');
// ✅ New route: Get current user's orders
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const userOrders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 });
    res.json(userOrders);
  } catch (error) {
    console.error('Failed to fetch user orders:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get orders of the logged-in user
// router.get('/my', protect, async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user._id })
//       .populate('items.product', 'name price')
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (err) {
//     console.error('❌ Failed to fetch user orders:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// ✅ Create new order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newOrder = new Order({
      user: req.user._id,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      shippingAddress: req.body.shippingAddress
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('❌ Error saving order:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
