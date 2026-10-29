import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, LogOut, Home } from 'lucide-react';
import Logo from '../components/common/Logo';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('yourchoice_admin');
    navigate('/admin/login');
  };

  React.useEffect(() => {
    if (!localStorage.getItem('yourchoice_admin')) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Logo />
        </div>
        <nav className="admin-sidebar-nav">
          <Link to="/admin" className="admin-nav-link">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/admin/products" className="admin-nav-link">
            <Package size={18} /> Products
          </Link>
          <Link to="/" className="admin-nav-link">
            <Home size={18} /> View Store
          </Link>
        </nav>
        <button onClick={handleLogout} className="admin-logout">
          <LogOut size={18} /> Logout
        </button>
      </aside>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
