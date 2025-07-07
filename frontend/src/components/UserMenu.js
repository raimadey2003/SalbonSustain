import React, { useState } from 'react';
import { User, LogOut, Settings, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/authContext.js';
import { useNavigate } from 'react-router-dom';


export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors"
      >
        <User className="h-5 w-5" />
        <span className="text-sm hidden md:block">{user?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
              {isAdmin() && (
                <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Admin
                </span>
              )}
            </div>
            
            {/* <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
              <ShoppingBag className="h-4 w-4" />
              <span>My Orders</span>
            </button> */}
            <button
                onClick={() => {
                  navigate('/my-orders');
                  setIsOpen(false); // close dropdown
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>My Orders</span>
            </button>

            
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}