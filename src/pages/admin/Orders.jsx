import React from 'react';
import { Trash2 } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import { useOrders } from '../../context/OrderContext';
import { useProducts } from '../../context/ProductContext';
import { formatCurrency } from '../../utils/currency';
import './Dashboard.css';

const ORDER_STATUSES = ['Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

const Orders = () => {
  const { orders, updateOrderStatus, deleteOrder } = useOrders();
  const { reduceStock, restoreStock } = useProducts();

  const handleStatusChange = (order, status) => {
    if (status === order.status) return;
    if (status === 'Cancelled' && order.status !== 'Cancelled') {
      restoreStock(order.items);
    } else if (order.status === 'Cancelled' && status !== 'Cancelled') {
      reduceStock(order.items);
    }
    updateOrderStatus(order.id, status);
  };

  const handleDelete = (order) => {
    if (!confirm(`Delete order ${order.id}?`)) return;
    if (order.status !== 'Cancelled') {
      restoreStock(order.items);
    }
    deleteOrder(order.id);
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Order Management</h1>
            <p className="admin-page-subtitle">Manage customer orders and stock</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="admin-table-container" style={{ padding: '2rem', textAlign: 'center' }}>
            No orders yet.
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td><strong>{order.id}</strong></td>
                    <td>
                      <div>{order.customer?.name || 'Guest'}</div>
                      <div style={{ color: 'var(--secondary-gray)', fontSize: '0.8rem' }}>{order.customer?.phone}</div>
                    </td>
                    <td style={{ maxWidth: '260px' }}>
                      {order.items?.map(item => `${item.name} x${item.quantity}`).join(', ')}
                    </td>
                    <td>{formatCurrency(order.total)}</td>
                    <td>
                      <select
                        className={`order-status-select status-${(order.status || '').toLowerCase()}`}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order, e.target.value)}
                      >
                        {ORDER_STATUSES.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn danger" onClick={() => handleDelete(order)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
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

export default Orders;
