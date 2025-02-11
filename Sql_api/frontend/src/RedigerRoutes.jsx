import { useState } from 'react';
import "./EditRoutes.css"; // Import av CSS

function EditRoutes() {
    const [routeId, setRouteId] = useState('');
    const [name, setName] = useState('');
    const [stationId, setStationId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:3000/v1/routes/${routeId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, stationId }),
                }
            );

            if (response.ok) {
                const results = await response.json();
                setMessage(`Route: ${name} updated successfully!`);
            } else {
                console.error('Failed to update route');
                setMessage('Failed to update route');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred while updating the route');
        }
    };

    return (
        <div className="edit-route-container">
            <h1 className="edit-route-title">Edit Route</h1>

            <form onSubmit={handleSubmit} className="edit-form">
                <label>Route ID:</label>
                <input 
                    type="text" 
                    value={routeId} 
                    onChange={(e) => setRouteId(e.target.value)} 
                />

                <label>Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />

                <label>Station ID:</label>
                <input 
                    type="text" 
                    value={stationId} 
                    onChange={(e) => setStationId(e.target.value)} 
                />

                <button type="submit">Update Route</button>
            </form>

            {message && <p className="success-message">{message}</p>}
        </div>
    );
}

export default EditRoutes;
