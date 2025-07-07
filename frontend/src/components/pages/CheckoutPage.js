// src/pages/CheckoutPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // const handlePlaceOrder = async () => {
  //   const token = localStorage.getItem('token'); // ✅ Get auth token

  //   if (!token) {
  //     alert('Please login to place an order.');
  //     return;
  //   }

  //   const orderData = {
  //     items: cartItems.map(item => ({
  //       product: item._id || item.id,
  //       quantity: item.quantity,
  //       price: item.price
  //     })),
  //     totalAmount: getTotalPrice(),
  //     shippingAddress: {
  //       street: '123 Forest Lane',
  //       city: 'Eco City',
  //       state: 'GreenState',
  //       zipCode: '123456',
  //       country: 'India'
  //     }
  //   };

  const handlePlaceOrder = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login to place an order.');
    return;
  }

  const orderData = {
    items: cartItems.map(item => ({
      product: item._id || item.id,
      quantity: item.quantity,
      price: item.price
    })),
    totalAmount: getTotalPrice(),
    shippingAddress: {
      street: '123 Forest Lane',
      city: 'Eco City',
      state: 'GreenState',
      zipCode: '123456',
      country: 'India'
    }
  };

  console.log('📦 Sending order payload:', orderData);
  console.log('🔐 Token:', token);

  try {
    const res = await fetch('http://localhost:5050/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('❌ Backend error response:', errorData);
      throw new Error('Failed to place order');
    }

    clearCart();
    navigate('/thank-you');
  } catch (err) {
    console.error('❌ Error placing order:', err.message);
    alert('Failed to place order. Please try again.');
  }
};


  //   try {
  //     const res = await fetch('http://localhost:5050/api/orders', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify(orderData)
  //     });

  //     if (!res.ok) throw new Error('Failed to place order');

  //     clearCart(); // ✅ Only clear cart after successful order
  //     navigate('/thank-you');
  //   } catch (err) {
  //     console.error('❌ Error placing order:', err);
  //     alert('Failed to place order. Please try again.');
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Checkout</h2>
        <p className="text-gray-600 mb-6">You're almost done! Click below to place your order.</p>
        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-semibold"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
