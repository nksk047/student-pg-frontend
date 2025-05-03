import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('pgUserToken');
  const role = localStorage.getItem('pgUserRole');

  const handleLogout = () => {
    localStorage.removeItem('pgUserToken');
    localStorage.removeItem('pgUserRole');
    navigate('/login');
  };

  return (
    <div className="main-layout">
      <header className="main-header">
        <div className="logo">
          <Link to="/">🏠 Student PG Finder</Link>
        </div>
        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/listings">Browse</Link>
          {token ? (
            <>
              <Link to={`/${role}/dashboard`}>Dashboard</Link>
              {role === 'owner' && (
  <Link to="/owner/add">Post PG</Link>
)}

              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </header>

      <main className="main-content">{children}</main>

      <footer className="main-footer">
        <p>© {new Date().getFullYear()} Student PG Finder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
