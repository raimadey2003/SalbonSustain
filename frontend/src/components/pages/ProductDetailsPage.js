import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Leaf, Users, Award, Heart, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext.js';
import { useWishlist } from '../../context/WishlistContext.js';
import { useAuth } from '../../context/authContext.js';
import { useNavigate, useLocation } from 'react-router-dom';

export function ProductDetailsPage({ product, onBack }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  const handleWishlistToggle = () => {
    if (!isAuthenticated()) {
      navigate('/login', {
        state: { from: location.pathname }
      });
      return;
    }

    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCartClick = () => {
    if (!isAuthenticated()) {
      navigate('/login', {
        state: { from: location.pathname }
      });
      return;
    }

    setShowQuantitySelector(true);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleConfirmAddToCart = () => {
    addToCart(product, quantity);
    setShowQuantitySelector(false);
    setQuantity(1);
  };

  const handleCancelQuantitySelector = () => {
    setShowQuantitySelector(false);
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Products</span>
        </button>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <button 
                  onClick={handleWishlistToggle}
                  className={`p-2 rounded-full transition-colors ${
                    isInWishlist(product._id)
                      ? 'text-red-500 bg-red-50 hover:bg-red-100'
                      : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-green-600">Rs. {product.price}</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Leaf className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">
                    {product.sustainabilityScore}% Sustainable
                  </span>
                </div>
              </div>

              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="h-5 w-5 text-green-600 mr-2" />
                  Community Impact
                </h3>
                <p className="text-gray-700">{product.communityImpact}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Premium Quality</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Eco-Friendly</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Fair Trade</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Handcrafted</span>
                </div>
              </div>

              <div className="mb-6">
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                  product.inStock
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {showQuantitySelector && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 border-2 border-green-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Select Quantity</h4>
                  <div className="flex items-center space-x-4 mb-4">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="text-xl font-semibold text-gray-900 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700">Total Price:</span>
                    <span className="text-xl font-bold text-green-600">
                      Rs. {(product.price * quantity).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleConfirmAddToCart}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                    >
                      Confirm Add to Cart
                    </button>
                    <button
                      onClick={handleCancelQuantitySelector}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={handleAddToCartClick}
                  disabled={!product.inStock || showQuantitySelector}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>

                <button
                  onClick={handleWishlistToggle}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                    isInWishlist(product._id)
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
                  <span>{isInWishlist(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
