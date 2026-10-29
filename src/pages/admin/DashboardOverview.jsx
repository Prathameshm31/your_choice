import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useProducts } from '../../context/ProductContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Dashboard.css';

const DashboardOverview = () => {
  const { products } = useProducts();

  const stats = [
    { label: 'Total Products', value: products.length },
    { label: 'Featured', value: products.filter(p => p.featured).length },
    { label: 'New Arrivals', value: products.filter(p => p.newArrival).length },
    { label: 'Best Sellers', value: products.filter(p => p.bestseller).length },
  ];

  const categoryData = [
    { name: 'Shirts', value: products.filter(p => p.category === 'shirts').length },
    { name: 'T-Shirts', value: products.filter(p => p.category === 'tshirts').length },
    { name: 'Jeans', value: products.filter(p => p.category === 'jeans').length },
    { name: 'Trousers', value: products.filter(p => p.category === 'trousers').length },
    { name: 'Others', value: products.filter(p => !['shirts','tshirts','jeans','trousers'].includes(p.category)).length },
  ];

  const COLORS = ['#263D32', '#B89B63', '#8D3434', '#777777', '#202020'];

  return (
    <AdminLayout>
      <div className="admin-page">
        <h1 className="admin-page-title">Dashboard Overview</h1>
        <p className="admin-page-subtitle">Sample Analytics</p>

        <div className="stats-grid">
          {stats.map((stat, idx) => (
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
      </div>
    </AdminLayout>
  );
};

export default DashboardOverview;
