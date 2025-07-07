const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const auth = require('../middleware/authMiddleware'); // ✅ use your middleware

// ✅ GET: fetch all wishlist items for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user.id }).populate('product');
    res.json(wishlist); // returns [{ _id, user, product: {...} }]
  } catch (err) {
    console.error('Error fetching wishlist:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ POST: add item to wishlist
router.post('/', auth, async (req, res) => {
  const { productId } = req.body;

  if (!productId) return res.status(400).json({ error: 'Product ID is required' });

  try {
    const exists = await Wishlist.findOne({ user: req.user.id, product: productId });
    if (exists) {
      return res.status(200).json({ message: 'Already in wishlist', product: exists.product });
    }

    const newItem = new Wishlist({ user: req.user.id, product: productId });
    await newItem.save();

    const populated = await newItem.populate('product');
    res.status(201).json(populated.product); // ✅ send just product object
  } catch (err) {
    console.error('Error adding to wishlist:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ DELETE: remove item from wishlist
router.delete('/:productId', auth, async (req, res) => {
  const { productId } = req.params;

  try {
    const deleted = await Wishlist.findOneAndDelete({
      user: req.user.id,
      product: productId
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Item not found in wishlist' });
    }

    res.status(200).json({ message: 'Removed from wishlist' });
  } catch (err) {
    console.error('Error removing from wishlist:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
