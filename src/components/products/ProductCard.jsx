import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/currency';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const hasBackImage = product.backImage && product.backImage.trim() !== '';
  const currentImage = isHovered && hasBackImage ? product.backImage : product.frontImage || product.mainImage;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.sizes && product.sizes.length > 0 && product.colors && product.colors.length > 0) {
      addToCart(product, product.sizes[0], product.colors[0], 1);
    } else {
      addToCart(product, 'One Size', product.colors?.[0] || 'Default', 1);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-card-image-wrapper">
          {product.newArrival && <span className="product-badge badge-new">New</span>}
          {product.bestseller && !product.newArrival && <span className="product-badge badge-bestseller">Best Seller</span>}
          {product.discountPercentage > 0 && (
            <span className="product-badge badge-discount">-{product.discountPercentage}%</span>
          )}
          <button className={`wishlist-btn ${inWishlist ? 'active' : ''}`} onClick={handleWishlist}>
            <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
          {!imgError ? (
            <img
              src={currentImage}
              alt={product.name}
              className="product-card-image"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="product-card-placeholder">Your Choice</div>
          )}
          <button className="quick-add-btn" onClick={handleAddToCart}>
            <ShoppingBag size={16} /> Quick Add
          </button>
        </div>
        <div className="product-card-info">
          <h3 className="product-card-name">{product.name}</h3>
          <p className="product-card-category">{product.category}</p>
          <div className="product-card-prices">
            <span className="product-card-price">{formatCurrency(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="product-card-original-price">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
