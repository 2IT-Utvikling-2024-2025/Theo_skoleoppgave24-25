import React from 'react';

function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <p>Laster produkter...</p>;
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-card">
          <div className="product-card-title">
            {product.name} ({product.type}) – {product.price} kr (inkl. mva: {product.price * 1.27})  
          </div>
          <div className="product-card-subtitle">
            {product.description}
          </div>
          {product.specs && product.specs.length > 0 && (
            <>
              <strong>Spesifikasjoner:</strong>
              <ul className="product-specs">
                {product.specs.map((spec, idx) => (
                  <li key={idx}>{spec}</li>
                ))}
              </ul>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
