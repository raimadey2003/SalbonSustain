import React, { useEffect, useState } from 'react';

export function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      console.log("🔑 Token being sent:", token); // ✅ Log token

      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        const res = await fetch('http://localhost:5050/api/orders/my', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(`Failed to fetch orders (${res.status}): ${msg}`);
        }

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('❌ Error fetching orders:', err.message);
        setError(err.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">🛍️ My Orders</h2>

      {error && (
        <p className="text-red-600 font-semibold mb-4">Error: {error}</p>
      )}

      {orders.length === 0 && !error ? (
        <p className="text-gray-500 italic">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <p className="font-semibold">Order ID: #{order._id.slice(-6).toUpperCase()}</p>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <p className="text-sm text-gray-500">Ordered on: {new Date(order.createdAt).toLocaleString()}</p>
              <ul className="list-disc pl-5 text-sm mt-2 text-gray-700">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.product?.name || 'Product'} × {item.quantity} — ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button
      onClick={() => window.location.href='/'}
      className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
    >
      Back to Home
    </button>
        </div>
      )}
    </div>
    
  );
  
}
