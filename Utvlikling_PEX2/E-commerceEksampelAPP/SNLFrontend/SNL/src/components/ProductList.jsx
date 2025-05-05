import { useState, useEffect } from 'react';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('http://localhost:3000/v1/products');
                const results = await response.json();
                setProducts(results.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map(product => (
                    <li key={product.product_id}>{product.name} - ${product.price} - Product ID: {product.product_id}</li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;