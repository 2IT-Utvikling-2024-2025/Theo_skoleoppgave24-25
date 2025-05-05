// src/pages/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, createOrder } from '../services/api';
import { ShoppingCart } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderForm, setOrderForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: ''
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Kunne ikke laste produktdetaljer. Prøv igjen senere.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm({
      ...orderForm,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOrderError(null);
    
    try {
      await createOrder({
        product_id: product.id,
        ...orderForm
      });
      setOrderSuccess(true);
      setOrderForm({
        customer_name: '',
        customer_email: '',
        customer_phone: ''
      });
    } catch (err) {
      setOrderError('Kunne ikke fullføre bestillingen. Vennligst prøv igjen.');
    }
  };

  if (loading) return <div className="loading">Laster produktdetaljer...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Produkt ikke funnet</div>;

  return (
    <div className="product-detail-container">
      <h1>{product.name}</h1>
      <div className="product-detail-content">
        <div className="product-info">
          <p className="product-type">{product.type}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-price">{product.price} kr</p>
          
          <div className="product-specifications">
            <h2>Spesifikasjoner</h2>
            <ul>
              {product.specifications && product.specifications.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="order-form-container">
          <h2>Bestill produkt</h2>
          {orderSuccess ? (
            <div className="order-success">
              Takk for din bestilling! Vi kontakter deg snart.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="order-form">
              {orderError && <div className="order-error">{orderError}</div>}
              
              <div className="form-group">
                <label htmlFor="customer_name">Navn</label>
                <input
                  type="text"
                  id="customer_name"
                  name="customer_name"
                  value={orderForm.customer_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="customer_email">E-post</label>
                <input
                  type="email"
                  id="customer_email"
                  name="customer_email"
                  value={orderForm.customer_email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="customer_phone">Telefon</label>
                <input
                  type="tel"
                  id="customer_phone"
                  name="customer_phone"
                  value={orderForm.customer_phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <button type="submit" className="order-button">
                <ShoppingCart size={18} />
                Bestill nå
              </button>
              
              <p className="privacy-notice">
                Ved bestilling lagres dine personopplysninger i vår database for å håndtere ordren.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;