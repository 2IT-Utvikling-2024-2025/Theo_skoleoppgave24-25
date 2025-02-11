import { useState, useEffect } from 'react';
import "./admin.css"; // Eller hva du kaller den

function RouteList() {
    const [routes, setRoutes] = useState([]);
    const [routeId, setRouteId] = useState('');
    const [name, setName] = useState('');
    const [stationId, setStationId] = useState('');

    useEffect(() => {
        fetchRoutes();
    }, []);

    async function fetchRoutes() {
        try {
            const response = await fetch('http://localhost:3000/v1/routes');
            if (!response.ok) {
                throw new Error('Failed to fetch routes');
            }
            const results = await response.json();
            setRoutes(results.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function addRoute(event) {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/v1/routes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ routeId, name, stationId }),
            });
            if (!response.ok) {
                throw new Error('Failed to add route');
            }
            // Hent nye data
            fetchRoutes();
            // Tøm inputfelt
            setRouteId('');
            setName('');
            setStationId('');
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteRoute(id) {
        try {
            const response = await fetch(`http://localhost:3000/v1/routes/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete route');
            }
            // Hent oppdatert liste igjen
            fetchRoutes();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="admin-container">
            <h1 className="admin-title">Forskjellige ruter</h1>

            <form onSubmit={addRoute} className="route-form">
                <input
                    type="text"
                    placeholder="Route ID"
                    value={routeId}
                    onChange={(e) => setRouteId(e.target.value)}
                    className="input-box"
                />
                <input
                    type="text"
                    placeholder="Navn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-box"
                />
                <input
                    type="text"
                    placeholder="Station ID"
                    value={stationId}
                    onChange={(e) => setStationId(e.target.value)}
                    className="input-box"
                />

                <div className="button-group">
                    <button type="submit" className="action-button add-button">Add Route</button>
                </div>
            </form>

            <ul className="route-list">
                {routes.map((route) => (
                    <li key={route.routeId} className="route-item">
                        <span className="route-info">
                            {route.name} – {route.stationId}
                        </span>
                        <button
                            className="delete-button"
                            onClick={() => deleteRoute(route.routeId)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RouteList;
