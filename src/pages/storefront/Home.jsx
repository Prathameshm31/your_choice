import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../../components/products/ProductCard';
import { useProducts } from '../../context/ProductContext';
import { categories } from '../../data/categories';
import { brandConfig } from '../../config/brand';
import './Home.css';

const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const newArrivals = products.filter(p => p.newArrival).slice(0, 4);
  const bestSellers = products.filter(p => p.bestseller).slice(0, 4);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">{brandConfig.tagline}</h1>
            <p className="hero-subtitle">
              Discover modern essentials designed for confidence, comfort, and timeless style.
            </p>
            <div className="hero-buttons">
              <Link to="/shop" className="btn-primary">Shop Collection</Link>
              <Link to="/shop" className="btn-secondary">Explore New Arrivals</Link>
            </div>
          </motion.div>
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src="/images/banners/home-hero.jpg" alt="Premium Men's Fashion" onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800';}} />
          </motion.div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link to={`/category/${category.slug}`} key={category.id} className="category-card">
                <div className="category-card-image">
                  <img src={category.image} alt={category.name} onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400';}} />
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-title">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Best Sellers</h2>
            <Link to="/shop" className="section-link">View All</Link>
          </div>
          <div className="products-grid">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
            <Link to="/shop" className="section-link">View All</Link>
          </div>
          <div className="products-grid">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner">
        <div className="promo-banner-container">
          <div className="promo-banner-image">
            <img src="/images/banners/seasonal-collection.jpg" alt="Seasonal Collection" onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200';}} />
          </div>
          <div className="promo-banner-content">
            <h2 className="promo-banner-title">Seasonal Collection</h2>
            <p className="promo-banner-subtitle">Curated pieces for the modern gentleman</p>
            <Link to="/shop" className="btn-primary">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose {brandConfig.displayName}</h2>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Modern Styles</h3>
              <p>Contemporary designs for the modern man</p>
            </div>
            <div className="benefit-card">
              <h3>Everyday Comfort</h3>
              <p>Crafted for all-day wear</p>
            </div>
            <div className="benefit-card">
              <h3>Quality Materials</h3>
              <p>Premium fabrics for lasting appeal</p>
            </div>
            <div className="benefit-card">
              <h3>Affordable Fashion</h3>
              <p>Style without compromise</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
