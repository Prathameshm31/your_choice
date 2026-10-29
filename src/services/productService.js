import { products as initialProducts } from '../data/products';
import { getFromStorage, setToStorage } from '../utils/storage';

// Data access layer - can be replaced with REST API calls in future
export const productService = {
  getAllProducts: () => {
    const stored = getFromStorage('yourchoice_products', null);
    return stored || initialProducts;
  },

  getProductById: (id) => {
    const products = productService.getAllProducts();
    return products.find(p => p.id === id);
  },

  getProductsByCategory: (category) => {
    const products = productService.getAllProducts();
    return products.filter(p => p.category === category);
  },

  createProduct: (product) => {
    const products = productService.getAllProducts();
    const newProduct = { ...product, id: product.id || `prod-${Date.now()}` };
    const updated = [...products, newProduct];
    setToStorage('yourchoice_products', updated);
    return newProduct;
  },

  updateProduct: (id, product) => {
    const products = productService.getAllProducts();
    const updated = products.map(p => (p.id === id ? { ...p, ...product } : p));
    setToStorage('yourchoice_products', updated);
    return updated.find(p => p.id === id);
  },

  deleteProduct: (id) => {
    const products = productService.getAllProducts();
    const updated = products.filter(p => p.id !== id);
    setToStorage('yourchoice_products', updated);
    return true;
  }
};
