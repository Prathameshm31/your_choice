import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StoreLayout from '../layouts/StoreLayout';
import Home from '../pages/storefront/Home';
import Shop from '../pages/storefront/Shop';
import CategoryPage from '../pages/storefront/CategoryPage';
import ProductDetails from '../pages/storefront/ProductDetails';
import Cart from '../pages/storefront/Cart';
import Wishlist from '../pages/storefront/Wishlist';
import Checkout from '../pages/storefront/Checkout';
import About from '../pages/storefront/About';
import Contact from '../pages/storefront/Contact';
import AdminLogin from '../pages/admin/AdminLogin';
import DashboardOverview from '../pages/admin/DashboardOverview';
import Products from '../pages/admin/Products';
import AddProduct from '../pages/admin/AddProduct';
import EditProduct from '../pages/admin/EditProduct';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StoreLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="category/:slug" element={<CategoryPage />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<DashboardOverview />} />
      <Route path="/admin/products" element={<Products />} />
      <Route path="/admin/products/new" element={<AddProduct />} />
      <Route path="/admin/products/:id/edit" element={<EditProduct />} />
    </Routes>
  );
};

export default AppRoutes;
