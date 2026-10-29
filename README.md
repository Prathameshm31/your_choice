# Your_Choice - Premium Men's Fashion E-Commerce Website

A complete, modern, premium men's clothing e-commerce website built with React.js, Vite, and modern web technologies.

## Brand Identity
- **Brand Name:** Your_Choice
- **Display Name:** Your Choice
- **Tagline:** Your Style. Your Choice.
- **Logo:** Located at `/home/prathamesh_mangaonkar/Documents/Your_Choice_react/Logo/Logo.jpeg` (copied to `public/images/logo/your-choice-logo.png`)

## Features

### Storefront
- **Home Page** - Hero section, categories, best sellers, new arrivals, promotional banner
- **Shop** - All products with filters and sorting
- **Category Pages** - Separate pages for Shirts, T-Shirts, Jeans, Trousers, Accessories, Watches, Shoes, Hoodies
- **Product Details** - Image gallery, size/color selection, add to cart/wishlist
- **Shopping Cart** - Add, update, remove items with LocalStorage persistence
- **Wishlist** - Save favorite products
- **Checkout** - Demo checkout (no real payment)
- **About & Contact** - Brand information

### Admin Dashboard
- **Dashboard Overview** - Analytics with charts (Recharts)
- **Product Management** - CRUD operations for products
- **Add/Edit Products** - Forms with image path inputs
- **Category Management** - View categories
- **Order Management** - View orders (demo data)
- **Inventory Management** - Stock tracking
- **Analytics** - Sales insights
- **Store Settings** - Configuration

## Tech Stack
- React.js 19
- Vite
- React Router DOM
- Framer Motion
- Lucide React
- Recharts
- React Context API
- LocalStorage
- CSS3

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## Project Structure
See detailed structure in the codebase. Key folders:
- `src/config/brand.js` - Brand configuration
- `src/data/products.js` - Static product data (40+ products)
- `src/services/productService.js` - Data access layer (ready for Spring Boot API)
- `src/context/` - Global state management
- `public/images/` - Image assets

## Image Management

### Adding Product Images
Place your product images in the appropriate folders:
```
public/images/products/
├── shirts/
├── tshirts/
├── jeans/
├── trousers/
├── accessories/
├── watches/
├── shoes/
└── hoodies/
```

Use descriptive names like:
- `black-formal-shirt-front.jpg`
- `black-formal-shirt-back.jpg`

### Updating Image Paths
Edit product data in `src/data/products.js` or use the Admin Dashboard to update image paths.

### Logo
The logo is used from `public/images/logo/your-choice-logo.png` (copied from the provided path). To replace it, update `src/config/brand.js` and replace the file.

## Product Data

Products are stored in `src/data/products.js` with:
- ID, name, category, descriptions
- Price, original price, discount
- Images (front, back, gallery)
- Sizes, colors
- Stock, featured/new/bestseller flags
- Material, rating, reviews

Prices are in INR (₹). Use `src/utils/currency.js` for formatting.

## Future Java Spring Boot Integration

The frontend is structured for easy backend integration:

1. **Data Layer**: All data operations go through `src/services/productService.js`
2. **Replace Implementation**: Change the service methods to make REST API calls
3. **API Endpoints**: Plan for endpoints like `/api/products`, `/api/orders`, etc.
4. **Authentication**: Replace demo admin auth with JWT
5. **State Management**: Context API can be adapted or replaced

Example future implementation:
```javascript
// Replace in productService.js
getAllProducts: async () => {
  const response = await fetch('http://localhost:8080/api/products');
  return response.json();
}
```

## LocalStorage
- Cart: `yourchoice_cart`
- Wishlist: `yourchoice_wishlist`
- Products: `yourchoice_products` (synced from admin)
- Admin session: `yourchoice_admin`

Data persists in browser only.

## Admin Access
- URL: `/admin/login`
- Demo credentials: username `admin`, password `admin`

## Responsive Design
Works on desktop, laptop, tablet, and mobile devices.

## Notes
- All data is static/demo - no backend
- No real payment processing
- No actual email subscriptions
- Images are placeholders if not provided
