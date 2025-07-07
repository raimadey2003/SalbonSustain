import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useLocalStorage('wishlist', []);

  const addToWishlist = (product) => {
    setWishlistItems(current => {
      const exists = current.find(item => item._id === product._id);
      if (!exists) {
        return [...current, product];
      }
      return current;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(current => current.filter(item => item._id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item._id === productId);
  };

  const clearWishlist = () => setWishlistItems([]);

  const getWishlistCount = () => wishlistItems.length;

  // Optional: Debugging
  useEffect(() => {
    console.log("📝 Wishlist items:", wishlistItems);
  }, [wishlistItems]);

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      getWishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}