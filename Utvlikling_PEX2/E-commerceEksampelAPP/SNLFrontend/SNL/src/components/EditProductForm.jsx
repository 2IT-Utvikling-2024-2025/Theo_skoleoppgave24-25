import { useState } from 'react';

function EditProductForm() {
    const [product_id, setProductId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/v1/products/${product_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, price }),
            });

            if (response.ok) {
                const results = await response.json();
                setMessage("Product: " + name + " updated successfully!");
            } else {
                console.error('Failed to update product');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <label>Product ID:</label>
                <input type="text" value={product_id} onChange={(e) => setProductId(e.target.value)} />
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label>Price:</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                <button type="submit">Update Product</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default EditProductForm;