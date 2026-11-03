import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import { formatCurrency } from '../../utils/currency';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { getProductById, reduceStock } = useProducts();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);

  const subtotal = getCartTotal();
  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderPlaced) return;
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill all required fields');
      return;
    }
    const quantityById = cartItems.reduce((acc, item) => {
      acc[item.id] = (acc[item.id] || 0) + item.quantity;
      return acc;
    }, {});
    const invalidId = Object.keys(quantityById).find((id) => {
      const product = getProductById(id);
      return !product || quantityById[id] > (product.stockQuantity || 0);
    });
    if (invalidId) {
      const product = getProductById(invalidId);
      const item = cartItems.find(i => i.id === invalidId);
      alert(
        product
          ? `Only ${product.stockQuantity || 0} left for ${item.name}. Please update your cart.`
          : `${item.name} is no longer available.`
      );
      return;
    }
    const id = 'YC-' + Date.now().toString().slice(-8);
    const orderItems = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
      frontImage: item.frontImage || item.mainImage,
    }));
    reduceStock(orderItems);
    placeOrder({
      id,
      items: orderItems,
      subtotal,
      shipping,
      total,
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      paymentMethod: formData.paymentMethod,
    });
    setOrderId(id);
    setOrderTotal(total);
    setOrderPlaced(true);
    clearCart();
  };

  if (cartItems.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center', maxWidth: '600px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Order Confirmed!</h1>
          <p style={{ color: 'var(--secondary-gray)', marginBottom: '1.5rem' }}>
            Thank you for your purchase. Your order has been received.
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            <strong>Order ID:</strong> {orderId}
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            <strong>Total:</strong> {formatCurrency(orderTotal)}
          </p>
          <p style={{ color: 'var(--muted-burgundy)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            This is a demo checkout - no payment has been processed.
          </p>
          <button className="btn-primary" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>
        <p className="demo-notice">Demo Checkout - No real payment processing</p>
        <div className="checkout-grid">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Shipping Details</h2>
            <div className="form-row">
              <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required />
            </div>
            <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address *" value={formData.address} onChange={handleChange} required />
            <div className="form-row">
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
              <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
              <input type="text" name="pincode" placeholder="PIN Code" value={formData.pincode} onChange={handleChange} />
            </div>

            <h2 style={{ marginTop: '2rem' }}>Payment Method</h2>
            <div className="payment-options">
              <label>
                <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} />
                Cash on Delivery (Demo)
              </label>
              <label>
                <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} />
                Card (Demo - No details collected)
              </label>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '2rem' }}>Place Order</button>
          </form>

          <div className="checkout-summary">
            <h2>Order Summary</h2>
            {cartItems.map((item, idx) => (
              <div key={idx} className="checkout-item">
                <img src={item.frontImage || item.mainImage} alt={item.name} />
                <div>
                  <p style={{ fontSize: '0.9rem' }}>{item.name}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--secondary-gray)' }}>Qty: {item.quantity}</p>
                  <p style={{ fontSize: '0.9rem' }}>{formatCurrency(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
