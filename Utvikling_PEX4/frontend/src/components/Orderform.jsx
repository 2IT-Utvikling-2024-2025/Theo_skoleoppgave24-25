import React, { useState } from 'react';

function OrderForm({ products, onOrderCreated }) {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const handleOrder = (e) => {
    e.preventDefault();
    if (!selectedProductId || !customerName || !customerEmail) {
      alert('Du må velge produkt og fylle ut nødvendige felter.');
      return;
    }
    const newOrder = {
      product_id: parseInt(selectedProductId),
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone
    };

    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(`Feil ved oppretting av ordre: ${data.error}`);
        } else {
          alert(`Ordre opprettet med ID: ${data.orderId}`);
          // Nullstill
          setSelectedProductId('');
          setCustomerName('');
          setCustomerEmail('');
          setCustomerPhone('');
          // Oppdater ordre
          if (onOrderCreated) {
            onOrderCreated();
          }
        }
      })
      .catch((err) => console.error('Feil ved POST /orders:', err));
  };

  return (
    <form className="order-form" onSubmit={handleOrder}>
      <label>Velg produkt:</label>
      <select
        value={selectedProductId}
        onChange={(e) => setSelectedProductId(e.target.value)}
      >
        <option value="">- Velg -</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <label>Navn:</label>
      <input
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />

      <label>E-post:</label>
      <input
        type="email"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
        required
      />

      <label>Telefon (valgfritt):</label>
      <input
        type="text"
        value={customerPhone}
        onChange={(e) => setCustomerPhone(e.target.value)}
      />

      <button type="submit">Fullfør bestilling</button>
    </form>
  );
}

export default OrderForm;
