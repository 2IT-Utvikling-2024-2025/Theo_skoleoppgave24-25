import { useState, useEffect } from 'react';



function RouteList() {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
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

        fetchRoutes();
    }, []);

    return (
        <div>
            <h1>Forskjellige ruter</h1>
            <ul>
                {routes.map(route => (
                    <li key={route.routeId}>{route.startPointId} - {route.endPointId} - Departure Time: {route.departureTime}</li>
                ))}
            </ul>
        </div>
    );
}

export default RouteList;
