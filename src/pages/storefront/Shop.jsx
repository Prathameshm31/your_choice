import React, { useState } from 'react';
import ProductCard from '../../components/products/ProductCard';
import { useProducts } from '../../context/ProductContext';
import './Shop.css';

const Shop = () => {
  const { products } = useProducts();
  const [sortBy, setSortBy] = useState('default');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', 'shirts', 'tshirts', 'jeans', 'trousers', 'accessories', 'watches', 'shoes', 'hoodies'];

  let filteredProducts = filterCategory === 'all' 
    ? [...products] 
    : products.filter(p => p.category === filterCategory);

  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div className="container">
          <h1 className="shop-title">All Products</h1>
          <p className="shop-subtitle">Discover our complete collection</p>
        </div>
      </div>

      <div className="shop-content container">
        <div className="shop-filters">
          <div className="filter-group">
            <label>Category</label>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        <p className="shop-count">{filteredProducts.length} products</p>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
