import React from 'react';

function OrderList({ orders }) {
  if (!orders || orders.length === 0) {
    return <p>Ingen ordre enda.</p>;
  }

  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>Ordre ID</th>
          <th>Produkt</th>
          <th>Kundenavn</th>
          <th>E-post</th>
          <th>Telefon</th>
          <th>Dato</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o.id}>
            <td>{o.id}</td>
            <td>{o.product_name}</td>
            <td>{o.customer_name}</td>
            <td>{o.customer_email}</td>
            <td>{o.customer_phone}</td>
            <td>{o.order_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderList;
