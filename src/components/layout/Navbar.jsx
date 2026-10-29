import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import Logo from '../common/Logo';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const cartCount = getCartCount();
  const wishlistCount = wishlistItems.length;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Shirts', path: '/category/shirts' },
    { name: 'T-Shirts', path: '/category/tshirts' },
    { name: 'Jeans', path: '/category/jeans' },
    { name: 'Accessories', path: '/category/accessories' },
    { name: 'Watches', path: '/category/watches' },
    { name: 'Shoes', path: '/category/shoes' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/" className="navbar-logo">
          <Logo />
        </Link>

        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className="navbar-link">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <button className="navbar-action-btn">
            <Search size={20} />
          </button>
          <Link to="/admin/login" className="navbar-action-btn">
            <User size={20} />
          </Link>
          <Link to="/wishlist" className="navbar-action-btn">
            <Heart size={20} />
            {wishlistCount > 0 && <span className="navbar-badge">{wishlistCount}</span>}
          </Link>
          <Link to="/cart" className="navbar-action-btn">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="navbar-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="mobile-menu-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
