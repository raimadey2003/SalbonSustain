// src/pages/ThankYouPage.js
import React from 'react';

export function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Thank You for Your Order!</h2>
        <p className="text-gray-600">Your order has been placed successfully.</p>
      </div>
    </div>
  );
}
