import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import { useProducts } from '../../context/ProductContext';
import './Dashboard.css';

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    category: 'shirts',
    shortDescription: '',
    fullDescription: '',
    price: '',
    originalPrice: '',
    frontImage: '',
    backImage: '',
    sizes: 'S,M,L,XL',
    colors: 'Black,White',
    stockQuantity: '',
    material: '',
    featured: false,
    newArrival: false,
    bestseller: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const price = Number(formData.price);
    const originalPrice = Number(formData.originalPrice) || price;
    const discountPercentage = originalPrice > price ? Math.floor(((originalPrice - price) / originalPrice) * 100) : 0;
    
    addProduct({
      ...formData,
      price,
      originalPrice,
      discountPercentage,
      sizes: formData.sizes.split(',').map(s => s.trim()),
      colors: formData.colors.split(',').map(c => c.trim()),
      stockQuantity: Number(formData.stockQuantity),
      mainImage: formData.frontImage,
    });
    alert('Product added!');
    navigate('/admin/products');
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <h1 className="admin-page-title">Add New Product</h1>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Product Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option value="shirts">Shirts</option>
                <option value="tshirts">T-Shirts</option>
                <option value="jeans">Jeans</option>
                <option value="trousers">Trousers</option>
                <option value="accessories">Accessories</option>
                <option value="watches">Watches</option>
                <option value="shoes">Shoes</option>
                <option value="hoodies">Hoodies</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price (INR) *</label>
              <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Original Price (INR)</label>
              <input type="number" value={formData.originalPrice} onChange={(e) => setFormData({...formData, originalPrice: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Stock Quantity *</label>
              <input type="number" value={formData.stockQuantity} onChange={(e) => setFormData({...formData, stockQuantity: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Material</label>
              <input type="text" value={formData.material} onChange={(e) => setFormData({...formData, material: e.target.value})} />
            </div>
            <div className="form-group full-width">
              <label>Short Description</label>
              <input type="text" value={formData.shortDescription} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} />
            </div>
            <div className="form-group full-width">
              <label>Full Description</label>
              <textarea rows="4" value={formData.fullDescription} onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}></textarea>
            </div>
            <div className="form-group">
              <label>Front Image Path</label>
              <input type="text" value={formData.frontImage} onChange={(e) => setFormData({...formData, frontImage: e.target.value})} placeholder="/images/products/..." />
            </div>
            <div className="form-group">
              <label>Back Image Path</label>
              <input type="text" value={formData.backImage} onChange={(e) => setFormData({...formData, backImage: e.target.value})} placeholder="/images/products/..." />
            </div>
            <div className="form-group">
              <label>Sizes (comma separated)</label>
              <input type="text" value={formData.sizes} onChange={(e) => setFormData({...formData, sizes: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Colors (comma separated)</label>
              <input type="text" value={formData.colors} onChange={(e) => setFormData({...formData, colors: e.target.value})} />
            </div>
          </div>
          <div className="checkbox-group">
            <label><input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} /> Featured</label>
            <label><input type="checkbox" checked={formData.newArrival} onChange={(e) => setFormData({...formData, newArrival: e.target.checked})} /> New Arrival</label>
            <label><input type="checkbox" checked={formData.bestseller} onChange={(e) => setFormData({...formData, bestseller: e.target.checked})} /> Bestseller</label>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Add Product</button>
            <button type="button" className="btn-secondary" onClick={() => navigate('/admin/products')}>Cancel</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
