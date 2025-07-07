import React from 'react';
import { ShoppingCart, Leaf, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext.js';
import { useWishlist } from '../context/WishlistContext.js';
import { useAuth } from '../context/authContext.js';
import { useNavigate, useLocation } from 'react-router-dom';

export function ProductCard({ product, onViewDetails }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      navigate('/login', {
        state: { from: location.pathname }
      });
    } else {
      addToCart(product);
    }
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();

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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <Leaf className="h-3 w-3" />
            <span>{product.sustainabilityScore}%</span>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full shadow-md transition-colors ${
              isInWishlist(product._id)
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`h-5 w-5 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
          </button>
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-green-600">Rs. {product.price}</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            {product.category}
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-3 italic">{product.communityImpact}</p>
        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            View Details
          </button>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-1 text-sm font-medium"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
