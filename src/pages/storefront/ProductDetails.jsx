import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/currency';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = getProductById(id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          <h2>Product not found</h2>
          <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/shop')}>
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  React.useEffect(() => {
    if (product.sizes && product.sizes.length > 0) setSelectedSize(product.sizes[0]);
    if (product.colors && product.colors.length > 0) setSelectedColor(product.colors[0]);
  }, [product]);

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert('Please select a color');
      return;
    }
    addToCart(product, selectedSize || 'One Size', selectedColor || 'Default', quantity);
    alert('Added to cart!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="product-details-page">
      <div className="container">
        <div className="product-details-grid">
          <div className="product-details-images">
            {!imgError ? (
              <img
                src={product.frontImage || product.mainImage}
                alt={product.name}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="product-details-placeholder">Your Choice</div>
            )}
          </div>

          <div className="product-details-info">
            <h1 className="product-details-title">{product.name}</h1>
            <p className="product-details-category">{product.category}</p>
            
            <div className="product-details-prices">
              <span className="product-details-price">{formatCurrency(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="product-details-original">{formatCurrency(product.originalPrice)}</span>
                  <span className="product-details-discount">-{product.discountPercentage}% OFF</span>
                </>
              )}
            </div>

            <p className="product-details-desc">{product.fullDescription}</p>

            {product.colors && product.colors.length > 0 && (
              <div className="product-details-section">
                <label className="product-details-label">Color</label>
                <div className="color-options">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`color-option ${selectedColor === color ? 'active' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="product-details-section">
                <label className="product-details-label">Size</label>
                <div className="size-options">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="product-details-section">
              <label className="product-details-label">Quantity</label>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <p className="stock-info">{product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}</p>

            <div className="product-details-actions">
              <button className="btn-primary" onClick={handleAddToCart} disabled={product.stockQuantity === 0}>
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button className="btn-secondary" onClick={handleBuyNow} disabled={product.stockQuantity === 0}>
                Buy Now
              </button>
              <button className={`wishlist-large ${inWishlist ? 'active' : ''}`} onClick={() => toggleWishlist(product)}>
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="product-details-meta">
              <p><strong>Material:</strong> {product.material}</p>
              <p><strong>Rating:</strong> {product.rating} ({product.reviewCount} reviews)</p>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2 className="related-title">Related Products</h2>
            <div className="products-grid">
              {relatedProducts.map(p => (
                <div key={p.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${p.id}`)}>
                  <div className="related-card">
                    <img src={p.frontImage || p.mainImage} alt={p.name} onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400';}} />
                    <h4>{p.name}</h4>
                    <p>{formatCurrency(p.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
