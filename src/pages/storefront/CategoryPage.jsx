import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/products/ProductCard';
import { useProducts } from '../../context/ProductContext';
import { categories } from '../../data/categories';
import './CategoryPage.css';

const watchBanners = [
  '/images/banners/watches/watch_I_will_3d_product_an.jpg',
  '/images/banners/watches/watch_TIME_WEARS_BETTER___.jpg',
  '/images/banners/watches/watch_Watch_render.jpeg.jpg',
  '/images/banners/watches/watch_1.jpeg.jpg',
  '/images/banners/watches/watch_.jpeg.jpg',
  '/images/banners/watches/watch_.jpeg.jpg',
  '/images/banners/watches/watch_2026-10-29_11-23-13.jpg',
  '/images/banners/watches/watch_2026-10-29_11-23-14.jpg',
];

const CategoryPage = () => {
  const { slug } = useParams();
  const { getProductsByCategory } = useProducts();
  const [sortBy, setSortBy] = useState('default');
  const [currentWatchBanner, setCurrentWatchBanner] = useState(0);

  useEffect(() => {
    if (slug === 'watches') {
      const interval = setInterval(() => {
        setCurrentWatchBanner((prev) => (prev + 1) % watchBanners.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [slug]);

  const category = categories.find(c => c.slug === slug);
  let products = getProductsByCategory(slug);

  if (sortBy === 'price-low') {
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    products = [...products].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    products = [...products].sort((a, b) => a.name.localeCompare(b.name));
  }

  if (!category) {
    return (
      <div className="category-page">
        <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          <h2>Category not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="category-banner">
        {slug === 'watches' ? (
          <div className="category-banner-image">
            <img
              src={watchBanners[currentWatchBanner]}
              alt="Watches Collection"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.5s ease' }}
              onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200';}}
            />
          </div>
        ) : (
          <div className="category-banner-image">
            <img src={category.image} alt={category.name} onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200';}} />
          </div>
        )}
        <div className="category-banner-content">
          <h1 className="category-banner-title">{category.name}</h1>
          <p className="category-banner-desc">{category.description}</p>
        </div>
      </div>

      <div className="category-content container">
        <div className="category-toolbar">
          <p className="category-count">{products.length} products</p>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>No products found in this category.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
