import React from 'react';
import { ArrowRight, Leaf, Users, TreePine, Award } from 'lucide-react';
import { useProducts } from '../../context/ProductContext.js';
import { ProductCard } from '../ProductCard.js';
import { useWishlist } from '../../context/WishlistContext';
import salTree from '../../images/saltree.jpg'; 
import salBon from '../../images/salbon.jpg'; 

export function HomePage({ onPageChange, onViewProduct }) {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);

  const stats = [
    { icon: TreePine, label: 'Trees Protected', value: '10,000+' },
    { icon: Users, label: 'Families Supported', value: '500+' },
    { icon: Award, label: 'Sustainability Score', value: '95%' },
    { icon: Leaf, label: 'Carbon Offset', value: '50 tons' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div 
          className="relative bg-cover bg-center"
          style={{
            // backgroundImage: 'url(https://images.pexels.com/photos/3137890/pexels-photo-3137890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
            backgroundImage: `url(${salBon})`
          }}
        >
          <div className="absolute inset-0 bg-green-900 bg-opacity-70"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sustainable Products from the
                <span className="text-green-300"> Sal Forest</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Supporting local communities while preserving nature through eco-friendly products
                crafted from sustainable Sal forest resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onPageChange('products')}
                  className="bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onPageChange('about')}
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-800 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of sustainable products that make a difference
              for both the environment and local communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map(product => (
              <ProductCard
                key={product._id|| product.id}
                product={product}
                onViewDetails={onViewProduct}
              />
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => onPageChange('products')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Salbon Sustain is committed to creating a sustainable future by connecting 
                eco-conscious consumers with authentic products from Sal forests while 
                ensuring fair trade practices and community empowerment.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <span>100% sustainable sourcing</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-green-600" />
                  <span>Direct support to local communities</span>
                </li>
                <li className="flex items-center space-x-3">
                  <TreePine className="h-5 w-5 text-green-600" />
                  <span>Forest conservation initiatives</span>
                </li>
              </ul>
              <button
                onClick={() => onPageChange('about')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Learn More About Us
              </button>
            </div>
            <div className="relative">
              <img
                // src="https://images.pexels.com/photos/3617457/pexels-photo-3617457.jpeg?auto=compress&cs=tinysrgb&w=800"
                src = {salTree}
                alt="Sustainable forest practices"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}