import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Header } from './components/Header.js';
import { HomePage } from './components/pages/HomePage.js';
import { ProductsPage } from './components/pages/ProductsPage.js';
import { CartPage } from './components/pages/CartPage.js';
import { CheckoutPage } from './components/pages/CheckoutPage.js';
import { ThankYouPage } from './components/pages/ThankYouPage.js'; // <-- New import
import { AdminPage } from './components/pages/AdminPage.js';
import { AboutPage } from './components/pages/AboutPage.js';
import { ContactPage } from './components/pages/ContactPage.js';
import { ProductDetailsPage } from './components/pages/ProductDetailsPage.js';
import { LoginPage } from './components/pages/LoginPage.js';
import { WishlistPage } from './components/pages/WishlistPage.js';
import { ProtectedRoute } from './components/ProtectedRoute.js';

import { ProductProvider } from './context/ProductContext.js';
import { CartProvider } from './context/CartContext.js';
import { AuthProvider } from './context/authContext.js';
import { WishlistProvider } from './context/WishlistContext.js';
import { MyOrdersPage } from './components/pages/MyOrdersPage.js';


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
  };

  const handleBackFromProduct = () => {
    setSelectedProduct(null);
    setCurrentPage('products');
  };

  const handleBackFromCheckout = () => {
    setCurrentPage('cart');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onPageChange={setCurrentPage}
            onViewProduct={handleViewProduct}
          />
        );
      case 'products':
        return (
          <ProductsPage
            searchQuery={searchQuery}
            onViewProduct={handleViewProduct}
          />
        );
      case 'cart':
        return <CartPage onPageChange={setCurrentPage} />;
      case 'checkout':
        return (
          <CheckoutPage
            onBack={handleBackFromCheckout}
            onPageChange={setCurrentPage}
          />
        );
      case 'wishlist':
        return <WishlistPage onViewProduct={handleViewProduct} />;
      case 'admin':
        return (
          <ProtectedRoute requireAdmin={true}>
            <AdminPage />
          </ProtectedRoute>
        );
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage />;
      case 'product-details':
        return selectedProduct ? (
          <ProductDetailsPage
            product={selectedProduct}
            onBack={handleBackFromProduct}
          />
        ) : (
          <HomePage
            onPageChange={setCurrentPage}
            onViewProduct={handleViewProduct}
          />
        );
      default:
        return (
          <HomePage
            onPageChange={setCurrentPage}
            onViewProduct={handleViewProduct}
          />
        );
    }
  };

  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <div className="min-h-screen bg-gray-50">
                <Header
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  onSearch={setSearchQuery}
                />
                <main>
                  <Routes>
                    <Route path="/" element={renderPage()} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/thank-you" element={<ThankYouPage />} />
                    
                    <Route path="/my-orders" element={<MyOrdersPage />} />
                    <Route path ="/login" element={<LoginPage />} />

                    <Route path ="/home" element={<HomePage />} />
                    <Route path ="/about" element={<AboutPage />} />
                    <Route path ="/contact" element={<ContactPage />} />
                    <Route path ="/products" element={<ProductsPage />} />
                    <Route path ="/cart" element={<CartPage />} />
                    <Route path ="/wishlist" element={<WishlistPage />} />

              

                  </Routes>
                </main>
              </div>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
