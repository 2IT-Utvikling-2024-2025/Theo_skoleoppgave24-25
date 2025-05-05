import React, { useEffect, useState } from 'react';
import './App.css';

import ProductList from './components/Productlist';
import OrderForm from './components/Orderform';
import OrderList from './components/OrderList';

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // Hent produkter
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Feil ved henting av products:', err));
  }, []);

  // Hent ordre
  useEffect(() => {
    fetch('http://localhost:5000/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error('Feil ved henting av orders:', err));
  }, []);

  // Oppdatere ordre
  const refreshOrders = () => {
    fetch('http://localhost:5000/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h1>VHD</h1>

      <section>
        <h2>Produkter</h2>
        <ProductList products={products} />
      </section>

      <section>
        <h2>Bestill et produkt</h2>
        <OrderForm products={products} onOrderCreated={refreshOrders} />
      </section>

      <section>
        <h2>Ordreoversikt</h2>
        <OrderList orders={orders} />
      </section>
    </div>
  );
}

export default App;
