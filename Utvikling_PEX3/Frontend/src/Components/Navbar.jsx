// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo"> 
          VHD Produkter
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Hjem</Link>
          <Link to="/" className="navbar-link">Produkter</Link>
          <Link to="/" className="navbar-link">Om oss</Link>
          <Link to="/" className="navbar-link">Kontakt</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;