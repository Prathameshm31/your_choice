import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/currency';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    if (product.sizes && product.sizes.length > 0 && product.colors && product.colors.length > 0) {
      addToCart(product, product.sizes[0], product.colors[0], 1);
    } else {
      addToCart(product, 'One Size', product.colors?.[0] || 'Default', 1);
    }
    removeFromWishlist(product.id);
    alert('Moved to cart!');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          <h2>Your wishlist is empty</h2>
          <Link to="/shop" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1 className="wishlist-title">My Wishlist</h1>
        <div className="wishlist-grid">
          {wishlistItems.map((product) => (
            <div key={product.id} className="wishlist-item">
              <Link to={`/product/${product.id}`}>
                <img src={product.frontImage || product.mainImage} alt={product.name} onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300';}} />
              </Link>
              <div className="wishlist-item-info">
                <Link to={`/product/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <p className="wishlist-item-price">{formatCurrency(product.price)}</p>
                <div className="wishlist-item-actions">
                  <button className="btn-primary" onClick={() => handleMoveToCart(product)}>Move to Cart</button>
                  <button className="btn-secondary" onClick={() => removeFromWishlist(product.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
