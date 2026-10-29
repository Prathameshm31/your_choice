import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { brandConfig } from '../../config/brand';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <Logo />
          <p className="footer-tagline">{brandConfig.tagline}</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Categories</h4>
          <ul className="footer-links">
            <li><Link to="/category/shirts">Shirts</Link></li>
            <li><Link to="/category/tshirts">T-Shirts</Link></li>
            <li><Link to="/category/jeans">Jeans</Link></li>
            <li><Link to="/category/trousers">Trousers</Link></li>
            <li><Link to="/category/hoodies">Hoodies</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Customer Care</h4>
          <ul className="footer-links">
            <li><Link to="/cart">Shopping Cart</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/admin/login">Admin</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {brandConfig.displayName}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
