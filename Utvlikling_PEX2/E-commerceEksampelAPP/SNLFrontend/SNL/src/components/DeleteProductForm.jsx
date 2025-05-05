import { useState } from 'react';

function AddProductForm() {
    const [product_id, setProductId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/v1/products/${product_id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const results = await response.json();
                setMessage("Product deleted successfully!");
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Delete Product</h2>
            <form onSubmit={handleSubmit}>
                <label>Product ID:</label>
                <input type="text" value={product_id} onChange={(e) => setProductId(e.target.value)} />
                <button type="submit">Delete</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddProductForm;