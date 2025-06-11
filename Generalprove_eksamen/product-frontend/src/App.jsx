import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:3001';

const ProductList = ({ products, onProductDeleted }) => {
  return (
    <div className="card">
      <h2>Alle Produkter</h2>
      {products.length === 0 ? (
        <p className="no-products">Ingen produkter funnet</p>
      ) : (
        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Navn</th>
                <th>Pris</th>
                <th>Opprettet</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.product_id}>
                  <td>{product.product_id}</td>
                  <td>{product.name}</td>
                  <td>{parseFloat(product.price).toFixed(2)} kr</td>
                  <td>{new Date(product.created_at).toLocaleDateString('no-NO')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const AddProduct = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!name.trim() || !price.trim()) {
      setMessage('Både navn og pris må fylles ut');
      return;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      setMessage('Pris må være et gyldig tall større enn 0');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          price: parseFloat(price)
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Produkt lagt til!');
        setName('');
        setPrice('');
        onProductAdded();
      } else {
        setMessage(data.error || 'Feil ved opprettelse av produkt');
      }
    } catch (error) {
      setMessage('Feil ved kommunikasjon med server');
      console.error('Feil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="card">
      <h2>Legg til Nytt Produkt</h2>
      <div className="form-group">
        <div className="input-group">
          <label htmlFor="name">Produktnavn</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Skriv inn produktnavn"
            disabled={loading}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="price">Pris (kr)</label>
          <input
            type="number"
            id="price"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="0.00"
            disabled={loading}
          />
        </div>
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? 'Legger til...' : 'Legg til Produkt'}
        </button>
        
        {message && (
          <div className={`message ${message.includes('lagt til') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

const DeleteProduct = ({ onProductDeleted }) => {
  const [productId, setProductId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!productId.trim()) {
      setMessage('Produkt ID må fylles ut');
      return;
    }

    if (isNaN(productId) || parseInt(productId) <= 0) {
      setMessage('Produkt ID må være et gyldig tall større enn 0');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/product`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: parseInt(productId)
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Produkt slettet!');
        setProductId('');
        onProductDeleted();
      } else {
        setMessage(data.error || 'Feil ved sletting av produkt');
      }
    } catch (error) {
      setMessage('Feil ved kommunikasjon med server');
      console.error('Feil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="card">
      <h2>Slett Produkt</h2>
      <div className="form-group">
        <div className="input-group">
          <label htmlFor="productId">Produkt ID</label>
          <input
            type="number"
            id="productId"
            min="1"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Skriv inn produkt ID"
            disabled={loading}
          />
        </div>
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="btn btn-danger"
        >
          {loading ? 'Sletter...' : 'Slett Produkt'}
        </button>
        
        {message && (
          <div className={`message ${message.includes('slettet') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/products`);
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setError('');
      } else {
        setError('Kunne ikke hente produkter');
      }
    } catch (error) {
      setError('Feil ved kommunikasjon med server');
      console.error('Feil:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = () => {
    fetchProducts();
  };

  const handleProductDeleted = () => {
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Laster produkter...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="main-title">Produkthåndtering</h1>
        
        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}
        
        <div className="grid">
          <AddProduct onProductAdded={handleProductAdded} />
          <DeleteProduct onProductDeleted={handleProductDeleted} />
          <div className="card">
            <h2>Instruksjoner</h2>
            <div className="instructions">
              <p>• Legg til nye produkter med navn og pris</p>
              <p>• Slett produkter ved å oppgi produkt ID</p>
              <p>• Produktlisten oppdateres automatisk</p>
              <p>• Alle endringer lagres i MySQL database</p>
              <p>• Trykk Enter for å utføre handlinger</p>
            </div>
          </div>
        </div>
        
        <ProductList 
          products={products} 
          onProductDeleted={handleProductDeleted} 
        />
      </div>
    </div>
  );
}

export default App;