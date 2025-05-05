// src/pages/ProductList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import { Monitor, Laptop, Video, ViewInAr } from 'lucide-react';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Kunne ikke laste produkter. Prøv igjen senere.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductIcon = (type) => {
    switch(type) {
      case 'Stasjonær PC':
        return <Monitor size={24} />;
      case 'Bærbar PC':
        return <Laptop size={24} />;
      case 'Projektor Trådløst':
        return <Video size={24} />;
      case 'AR':
        return <ViewInAr size={24} />;
      default:
        return null;
    }
  };

  if (loading) return <div className="loading">Laster produkter...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-list-container">
      <h1>VHD Produktkatalog</h1>
      <div className="product-grid">
        {products.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <div className="product-icon">
              {getProductIcon(product.type)}
            </div>
            <h2>{product.name}</h2>
            <p className="product-type">{product.type}</p>
            <p className="product-price">{product.price} kr</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;