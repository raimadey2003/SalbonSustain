import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage('cart', []);

  const addToCart = (product, quantity = 1) => {
    setCartItems(current => {
      const existingItem = current.find(item => item._id === product._id);
      if (existingItem) {
        return current.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(current => current.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(current =>
      current.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}