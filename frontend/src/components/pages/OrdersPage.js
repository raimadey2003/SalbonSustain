import React, { useState } from 'react';
import {
  Package, Truck, CheckCircle, Clock, X, ArrowLeft,
  Calendar, MapPin, CreditCard
} from 'lucide-react';
import { useAuth } from '../../context/authContext.js';
import { useLocalStorage } from '../../hooks/useLocalStorage.js';

export function OrdersPage({ onPageChange }) {
  const { user, isAuthenticated } = useAuth();
  const [orders] = useLocalStorage('userOrders', []);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your orders.</p>
          <button
            onClick={() => onPageChange('login')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const userOrders = orders.filter(order => order.userId === user?.id);
  const filteredOrders = filterStatus === 'all'
    ? userOrders
    : userOrders.filter(order => order.status === filterStatus);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'confirmed': return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'shipped': return <Truck className="h-5 w-5 text-purple-600" />;
      case 'delivered': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled': return <X className="h-5 w-5 text-red-600" />;
      default: return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstimatedDelivery = (orderDate, shippingMethod) => {
    const date = new Date(orderDate);
    let daysToAdd = 7;
    if (shippingMethod === 'express') daysToAdd = 3;
    if (shippingMethod === 'overnight') daysToAdd = 1;
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => setSelectedOrder(null)}
            className="flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Orders</span>
          </button>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-green-50 px-6 py-4 border-b border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Order #{selectedOrder.id}</h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Placed on {formatDate(selectedOrder.createdAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(selectedOrder.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Add additional order details rendering here */}
              <p className="text-gray-600">Estimated Delivery: {getEstimatedDelivery(selectedOrder.createdAt, selectedOrder.shippingMethod)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Orders</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No orders found for the selected status.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Order #{order.id}</h2>
                    <p className="text-sm text-gray-600">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-green-600 hover:underline text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>

                <div className="mt-4 flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
