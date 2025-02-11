import { useState } from 'react';
import "./v1.css";

export default function V1() {
    const [routes, setRoutes] = useState([]);

    const handleGetRoutes = async () => {
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
    };

    // Grupperer data etter sone (routeId)
    const groupedRoutes = routes.reduce((acc, route) => {
        if (!acc[route.routeId]) {
            acc[route.routeId] = [];
        }
        acc[route.routeId].push(route);
        return acc;
    }, {});

    return (
        <div className="container">
            <h1 className="title">Bussruter</h1>

            <button className="search-button" onClick={handleGetRoutes}>
                Se alle ruter
            </button>

            {/* Legg alle tabellene i en egen "table-container" for å kunne bruke CSS-grid */}
            <div className="table-container">
                {Object.entries(groupedRoutes).map(([routeId, stations]) => (
                    <table className="routes-table" key={routeId}>
                        <thead>
                            {/* Overskrift for hver sone */}
                            <tr>
                                <th colSpan="2" className="sone-header">
                                    Sone: {routeId}
                                </th>
                            </tr>
                            <tr>
                                <th>Stasjon </th>
                                <th>Navn </th>
                            </tr>
                        </thead>
                        <tbody>
                            {stations.map((station) => (
                                <tr key={station.stationId}>
                                    <td>{station.stationId}</td>
                                    <td>{station.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ))}
            </div>
        </div>
    );
}
