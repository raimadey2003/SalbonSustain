import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Leaf, User, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext.js';
import { useAuth } from '../context/authContext.js';
import { useWishlist } from '../context/WishlistContext.js';
import { UserMenu } from './UserMenu.js';

export function Header({ currentPage, onPageChange, onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();
  const { getWishlistCount } = useWishlist();
  const { isAuthenticated, isAdmin } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    if (currentPage !== 'products') {
      onPageChange('products');
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onPageChange('home')}
          >
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">Salbon Sustain</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search sustainable products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Cart, Wishlist and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Admin Link - Only show if user is admin */}
            {isAuthenticated() && isAdmin() && (
              <button
                onClick={() => onPageChange('admin')}
                className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="text-sm">Admin</span>
              </button>
            )}

            {/* Wishlist */}
            <button
              onClick={() => onPageChange('wishlist')}
              className="relative flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors"
            >
              <Heart className="h-6 w-6" />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {getWishlistCount()}
                </span>
              )}
            </button>

            {/* User Authentication */}
            {isAuthenticated() ? (
              <UserMenu />
            ) : (
              <button
                onClick={() => onPageChange('login')}
                className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="text-sm">Sign In</span>
              </button>
            )}
            
            <button
              onClick={() => onPageChange('cart')}
              className="relative flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Wishlist */}
              <button
                onClick={() => {
                  onPageChange('wishlist');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 flex items-center justify-between"
              >
                <span>Wishlist</span>
                {getWishlistCount() > 0 && (
                  <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {getWishlistCount()}
                  </span>
                )}
              </button>
              
              {/* Mobile Auth/Admin Links */}
              {isAuthenticated() ? (
                <>
                  {isAdmin() && (
                    <button
                      onClick={() => {
                        onPageChange('admin');
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600"
                    >
                      Admin Panel
                    </button>
                  )}
                  <div className="px-3 py-2 border-t border-gray-200 mt-2">
                    <p className="text-sm font-medium text-gray-900">Signed in as {isAuthenticated()?.name}</p>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => {
                    onPageChange('login');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600"
                >
                  Sign In
                </button>
              )}
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-3 py-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}