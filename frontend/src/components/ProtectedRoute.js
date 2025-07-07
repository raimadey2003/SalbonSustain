import React from 'react';
import { useAuth } from '../context/authContext.js';
import { LoginPage } from './pages/LoginPage.js';

export function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated()) {
    return <LoginPage />;
  }

  if (requireAdmin && !isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <p className="text-sm text-gray-500">Admin credentials: admin@salbonsustain.com / admin123</p>
        </div>
      </div>
    );
  }

  return children;
}