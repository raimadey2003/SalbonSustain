import React from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext.js';
import { useCart } from '../../context/CartContext.js';

export function WishlistPage({ onViewProduct }) {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Start browsing and add products you love to your wishlist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-2">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          {wishlistItems.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-colors"
                >
                  <Heart className="h-5 w-5 text-red-500 fill-current" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-green-600">Rs. {product.price}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {product.category}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => onViewProduct(product)}
                    className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-1 text-sm font-medium"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}