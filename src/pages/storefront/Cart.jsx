import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { formatCurrency } from '../../utils/currency';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { getProductById } = useProducts();
  const navigate = useNavigate();
  const subtotal = getCartTotal();
  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal + shipping;
  const quantityById = cartItems.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + item.quantity;
    return acc;
  }, {});
  const hasStockIssue = Object.keys(quantityById).some(id => {
    const product = getProductById(id);
    return !product || quantityById[id] > (product.stockQuantity || 0);
  });

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          <h2>Your cart is empty</h2>
          <Link to="/shop" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="cart-grid">
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="cart-item">
                <img src={item.frontImage || item.mainImage} alt={item.name} onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200';}} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Size: {item.size} | Color: {item.color}</p>
                  <p className="cart-item-price">{formatCurrency(item.price)}</p>
                  <div className="cart-item-actions">
                    <div className="quantity-selector small">
                      <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        disabled={(quantityById[item.id] || 0) >= (getProductById(item.id)?.stockQuantity || 0)}
                      >+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id, item.size, item.color)}>
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
                <div className="cart-item-total">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
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
            {hasStockIssue && (
              <p style={{ color: 'var(--muted-burgundy)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                Some items exceed available stock. Please reduce the quantity.
              </p>
            )}
            <button
              className="btn-primary"
              style={{ width: '100%', marginBottom: '0.75rem' }}
              onClick={() => navigate('/checkout')}
              disabled={hasStockIssue}
            >
              Proceed to Checkout
            </button>
            <Link to="/shop" className="btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
