import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export function ImageUpload({ value, onChange, className = '' }) {
  const [preview, setPreview] = useState(value || '');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const formData = new FormData();
      formData.append('image', file);

      fetch('http://localhost:5050/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          const fullImageUrl = `http://localhost:5050${data.imageUrl}`;
          setPreview(fullImageUrl);
          onChange(fullImageUrl);
        })
        .catch((err) => {
          console.error('Image upload failed:', err);
          alert('Image upload failed');
        });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleUrlInput = (url) => {
    setPreview(url);
    onChange(url);
  };

  const clearImage = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="url"
          value={preview}
          onChange={(e) => handleUrlInput(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="https://example.com/image.jpg or upload a file below"
        />
      </div>

      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 hover:border-green-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />

        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full h-32 object-cover rounded-lg mx-auto"
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div>
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              Drag and drop an image here, or{' '}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                browse files
              </button>
            </p>
            <p className="text-sm text-gray-500">
              Supports: JPG, PNG, GIF, WebP (Max 5MB)
            </p>
          </div>
        )}
      </div>

      {/* Upload Button */}
      {!preview && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Upload className="h-4 w-4" />
          <span>Upload Image</span>
        </button>
      )}
    </div>
  );
}
