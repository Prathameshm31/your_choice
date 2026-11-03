import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';
import { getFromStorage, setToStorage } from '../utils/storage';

const PRODUCTS_STORAGE_KEY = 'yourchoice_products';
const PRODUCTS_IMAGE_VERSION_KEY = 'yourchoice_products_image_version';
const PRODUCTS_IMAGE_VERSION = '2';

const syncProductImages = (storedProducts) =>
  storedProducts.map((product) => {
    const source = initialProducts.find((p) => p.id === product.id);
    if (!source) return product;
    return {
      ...product,
      mainImage: source.mainImage,
      frontImage: source.frontImage,
      backImage: source.backImage,
    };
  });

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const stored = getFromStorage(PRODUCTS_STORAGE_KEY, null);
    if (!stored) return initialProducts;
    const storedVersion = getFromStorage(PRODUCTS_IMAGE_VERSION_KEY, null);
    if (storedVersion === PRODUCTS_IMAGE_VERSION) return stored;
    return syncProductImages(stored);
  });

  useEffect(() => {
    setToStorage(PRODUCTS_STORAGE_KEY, products);
    setToStorage(PRODUCTS_IMAGE_VERSION_KEY, PRODUCTS_IMAGE_VERSION);
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: product.id || `prod-${Date.now()}`,
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedProduct } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProductById = (id) => {
    return products.find(p => p.id === id);
  };

  const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsByCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
