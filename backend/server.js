const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();
console.log("Connecting to:", process.env.MONGODB_URI);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB connection and admin insertion
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/salbon-sustain')
  .then(async () => {
    console.log('✅ MongoDB Connected Successfully');

    // ✅ Create Admin if not exists
    const existingAdmin = await User.findOne({ email: 'admin@salbonsustain.com' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@salbonsustain.com',
        password: hashedPassword,
        role: 'admin'
      });
      await adminUser.save();
      console.log('👑 Admin user created successfully');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
  })
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// ✅ Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/upload', require('./routes/upload'));
app.use('/uploads', express.static('uploads'));
app.use('/api/wishlist', require('./routes/wishlist'));

// ✅ Basic test route
app.get('/', (req, res) => {
  res.json({ message: '🚀 Salbon Sustain API is running!' });
});

// ✅ Test product save route (optional)
const Product = require('./models/Product');
app.post('/test-save', async (req, res) => {
  try {
    const product = new Product({
      name: 'Test Bowl',
      price: 100,
      image: 'https://example.com/image.jpg',
      description: 'Test product for MongoDB check',
      category: 'Kitchenware',
      communityImpact: 'Supports local artisans'
    });
    await product.save();
    res.json({ message: '✅ Test product saved to MongoDB!' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: '❌ Save failed' });
  }
});

// ✅ Error handling
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// ✅ Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
