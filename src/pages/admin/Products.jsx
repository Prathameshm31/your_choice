import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import { useProducts } from '../../context/ProductContext';
import { formatCurrency } from '../../utils/currency';
import './Dashboard.css';

const Products = () => {
  const { products, deleteProduct } = useProducts();

  const handleDelete = (id, name) => {
    if (confirm(`Delete ${name}?`)) {
      deleteProduct(id);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Product Management</h1>
            <p className="admin-page-subtitle">Manage your product catalog</p>
          </div>
          <Link to="/admin/products/new" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Add Product
          </Link>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <div className="product-cell">
                      <img src={product.frontImage || product.mainImage} alt={product.name} onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=60';}} />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>{product.category}</td>
                  <td>{formatCurrency(product.price)}</td>
                  <td>{product.stockQuantity}</td>
                  <td>{product.featured ? 'Yes' : 'No'}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/admin/products/${product.id}/edit`} className="action-btn">
                        <Edit size={16} />
                      </Link>
                      <button className="action-btn danger" onClick={() => handleDelete(product.id, product.name)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Products;
