import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import { formatCurrency } from '../../utils/currency';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Dashboard.css';

const DashboardOverview = () => {
  const { products } = useProducts();
  const { orders } = useOrders();

  const activeOrders = orders.filter(order => order.status !== 'Cancelled');
  const revenue = activeOrders.reduce((sum, order) => sum + (order.total || 0), 0);
  const lowStockProducts = products.filter(p => (p.stockQuantity || 0) > 0 && (p.stockQuantity || 0) <= 5);
  const outOfStockProducts = products.filter(p => (p.stockQuantity || 0) === 0);

  const stats = [
    { label: 'Total Products', value: products.length },
    { label: 'Featured', value: products.filter(p => p.featured).length },
    { label: 'New Arrivals', value: products.filter(p => p.newArrival).length },
    { label: 'Best Sellers', value: products.filter(p => p.bestseller).length },
  ];

  const orderStats = [
    { label: 'Total Orders', value: orders.length },
    { label: 'Revenue', value: formatCurrency(revenue) },
    { label: 'Low Stock', value: lowStockProducts.length },
    { label: 'Out of Stock', value: outOfStockProducts.length },
  ];

  const categoryData = [
    { name: 'Shirts', value: products.filter(p => p.category === 'shirts').length },
    { name: 'T-Shirts', value: products.filter(p => p.category === 'tshirts').length },
    { name: 'Jeans', value: products.filter(p => p.category === 'jeans').length },
    { name: 'Trousers', value: products.filter(p => p.category === 'trousers').length },
    { name: 'Others', value: products.filter(p => !['shirts','tshirts','jeans','trousers'].includes(p.category)).length },
  ];

  const COLORS = ['#263D32', '#B89B63', '#8D3434', '#777777', '#202020'];
  const recentOrders = orders.slice(0, 5);

  return (
    <AdminLayout>
      <div className="admin-page">
        <h1 className="admin-page-title">Dashboard Overview</h1>
        <p className="admin-page-subtitle">Live store analytics</p>

        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="stats-grid">
          {orderStats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h2>Products by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#263D32" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h2>Category Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="admin-page-header" style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem' }}>Recent Orders</h2>
          <Link to="/admin/orders" className="section-link">View All</Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="admin-table-container" style={{ padding: '1.5rem', textAlign: 'center' }}>
            No orders yet.
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td><strong>{order.id}</strong></td>
                    <td>{order.customer?.name || 'Guest'}</td>
                    <td>{formatCurrency(order.total)}</td>
                    <td>
                      <span className={`status-pill status-${(order.status || '').toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="admin-page-header" style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem' }}>Low Stock Alerts</h2>
          <Link to="/admin/products" className="section-link">Manage Products</Link>
        </div>

        {lowStockProducts.length === 0 && outOfStockProducts.length === 0 ? (
          <div className="admin-table-container" style={{ padding: '1.5rem', textAlign: 'center' }}>
            All products are well stocked.
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[...outOfStockProducts, ...lowStockProducts].map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td style={{ textTransform: 'capitalize' }}>{product.category}</td>
                    <td>{product.stockQuantity || 0}</td>
                    <td>
                      <span className={`stock-badge ${(product.stockQuantity || 0) === 0 ? 'stock-out' : 'stock-low'}`}>
                        {(product.stockQuantity || 0) === 0 ? 'Out of Stock' : 'Low Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default DashboardOverview;
