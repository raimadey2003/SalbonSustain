import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { useProducts } from '../../context/ProductContext.js';
import { ImageUpload } from '../ImageUpload.js';

export function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
    inStock: true,
    sustainabilityScore: 95,
    communityImpact: ''
  });

  const categories = ['Kitchenware', 'Tableware', 'Food', 'Furniture', 'Decorative', 'Other'];

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      image: '',
      description: '',
      category: '',
      inStock: true,
      sustainabilityScore: 95,
      communityImpact: ''
    });
    setEditingProduct(null);
    setShowForm(false);
    setIsLoading(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
      category: product.category,
      inStock: product.inStock,
      sustainabilityScore: product.sustainabilityScore,
      communityImpact: product.communityImpact
    });
    setShowForm(true);
  };

  const validateForm = () => {
    if (!formData.name.trim()) return alert('Product name is required');
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) return alert('Enter a valid price');
    if (!formData.image.trim()) return alert('Product image is required');
    if (!formData.description.trim()) return alert('Product description is required');
    if (!formData.category) return alert('Select a category');
    if (!formData.communityImpact.trim()) return alert('Community impact is required');
    const score = parseInt(formData.sustainabilityScore);
    if (isNaN(score) || score < 0 || score > 100) return alert('Sustainability score must be 0-100');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const productData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        image: formData.image.trim(),
        description: formData.description.trim(),
        category: formData.category,
        inStock: formData.inStock,
        sustainabilityScore: parseInt(formData.sustainabilityScore),
        communityImpact: formData.communityImpact.trim()
      };

      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
        alert('Product updated successfully!');
      } else {
        await addProduct(productData);
        alert('Product added successfully!');
      }

      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    setIsLoading(true);
    try {
      await deleteProduct(id);
      alert('Product deleted!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={() => setShowForm(true)}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add Product</span>
            </button>
          </div>
          <p className="text-gray-600 mt-2">Manage your sustainable products inventory</p>
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                <span className="text-gray-700">Processing...</span>
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button
                    onClick={resetForm}
                    disabled={isLoading}
                    className="text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                      placeholder="Enter product name"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs.) *</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                        placeholder="0.00"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                        disabled={isLoading}
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image *</label>
                    <ImageUpload
                      value={formData.image}
                      onChange={(imageUrl) => setFormData({...formData, image: imageUrl})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                      placeholder="Describe the product..."
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Community Impact *</label>
                    <input
                      type="text"
                      required
                      value={formData.communityImpact}
                      onChange={(e) => setFormData({...formData, communityImpact: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Supports 5 local families"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sustainability Score (%) *</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        required
                        value={formData.sustainabilityScore}
                        onChange={(e) => setFormData({...formData, sustainabilityScore: parseInt(e.target.value) || 0})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="flex items-center pt-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.inStock}
                          onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                          className="h-4 w-4 text-green-600 border-gray-300 rounded"
                          disabled={isLoading}
                        />
                        <span className="ml-2 text-sm text-gray-700">In Stock</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>{isLoading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      disabled={isLoading}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sustainability</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No products found. Add your first product!</td>
                  </tr>
                ) : (
                  products.map(product => (
                    <tr key={product._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 rounded-lg object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/40x40?text=No+Image';
                            }}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">Rs. {Number(product.price).toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                          product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4">{product.sustainabilityScore}%</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button onClick={() => handleEdit(product)} disabled={isLoading} className="text-green-600 hover:text-green-900 p-1">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDelete(product._id)} disabled={isLoading} className="text-red-600 hover:text-red-900 p-1">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
