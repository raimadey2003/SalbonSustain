import React, { createContext, useContext, useEffect, useState } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load products from backend on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5050/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Add product (POST)
  const addProduct = async (productData) => {
    try {
      const res = await fetch('http://localhost:5050/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to add product');
      }

      const newProduct = await res.json();
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  // ✅ Update product (PUT)
  const updateProduct = async (id, productData) => {
    try {
      const res = await fetch(`http://localhost:5050/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to update product');
      }

      const updatedProduct = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? updatedProduct : p))
      );
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  // ✅ Delete product (DELETE)
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:5050/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to delete product');
      }

      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const getProduct = (id) => {
    return products.find((p) => p._id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
