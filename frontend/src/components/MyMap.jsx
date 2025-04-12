import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Red marker icon
const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Component to update the map view
const ChangeMapView = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
        if (coords) map.setView(coords, 13);
    }, [coords, map]);
    return null;
};

// Component to handle map events like double click
const MapEvents = ({ onDoubleClick }) => {
    const map = useMap();

    useEffect(() => {
        map.on('dblclick', onDoubleClick);
        return () => {
            map.off('dblclick', onDoubleClick);
        };
    }, [map, onDoubleClick]);

    return null;
};

// Custom Locate Me Button
const LocateButton = ({ onClick }) => (
    <button
        onClick={onClick}
        style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            height: '40px',
            width: '40px',
            padding: '0',
            backgroundColor: 'rgba(211, 211, 211, 0.6)',
            border: 'none',
            borderRadius: '50%',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        aria-label="Locate me"
    >
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <path
                d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                fill="#000000"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.08296 7C2.50448 4.48749 4.48749 2.50448 7 2.08296V0H9V2.08296C11.5125 2.50448 13.4955 4.48749 13.917 7H16V9H13.917C13.4955 11.5125 11.5125 13.4955 9 13.917V16H7V13.917C4.48749 13.4955 2.50448 11.5125 2.08296 9H0V7H2.08296ZM4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8Z"
                fill="#000000"
            />
        </svg>
    </button>
);

// Haversine formula to compute distances
const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const MyMap = () => {
    const [position, setPosition] = useState([28.6139, 77.2090]); // Default to Delhi
    const [hasLocation, setHasLocation] = useState(false);
    const [hospitals, setHospitals] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [shortestRouteIdx, setShortestRouteIdx] = useState(null);

    const fetchHospitals = async (lat, lon) => {
        const query = `
        [out:json];
        (
            node["amenity"="hospital"](around:30000,${lat},${lon});
            way["amenity"="hospital"](around:30000,${lat},${lon});
            relation["amenity"="hospital"](around:30000,${lat},${lon});
        );
        out center;
        `;
        try {
            const res = await axios.post('https://overpass-api.de/api/interpreter', query, {
                headers: { 'Content-Type': 'text/plain' },
            });
            setHospitals(res.data.elements);
        } catch (err) {
            console.error('Hospital fetch error:', err);
        }
    };

    const locateUser = () => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const coords = [pos.coords.latitude, pos.coords.longitude];
                setPosition(coords);
                setHasLocation(true);
                fetchHospitals(coords[0], coords[1]);
            },
            (err) => console.error('Geolocation error:', err)
        );
    };

    useEffect(() => {
        locateUser();

        // Optional: clear routes when popup closes
        const map = document.querySelector('.leaflet-container')?._leaflet_map;
        if (map) {
            map.on('popupclose', () => {
                setRoutes([]);
                setShortestRouteIdx(null);
            });
        }

        return () => {
            if (map) map.off('popupclose');
        };
    }, []);

    const drawRoute = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://router.project-osrm.org/route/v1/driving/${position[1]},${position[0]};${lon},${lat}?overview=full&geometries=geojson`
            );
            const coords = response.data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
            const newRoute = { coords, distance: response.data.routes[0].distance };
            setRoutes([newRoute]);
            setShortestRouteIdx(0);
        } catch (err) {
            console.error('Route error:', err);
        }
    };

    return (
        <div style={{ height: '500px', width: '100%', position: 'relative' }}>
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                doubleClickZoom={false}
            >
                <MapEvents
                    onDoubleClick={() => {
                        setRoutes([]);
                        setShortestRouteIdx(null);
                    }}
                />

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                <ChangeMapView coords={position} />

                {hasLocation && (
                    <Marker position={position}>
                        <Popup>You are here</Popup>
                    </Marker>
                )}

                {hospitals.map((hospital, idx) => {
                    const lat = hospital.lat || hospital.center?.lat;
                    const lon = hospital.lon || hospital.center?.lon;
                    const dist = haversineDistance(position[0], position[1], lat, lon).toFixed(2);
                    return (
                        lat &&
                        lon && (
                            <Marker key={idx} position={[lat, lon]} icon={redIcon}>
                                <Popup>
                                    <div style={{ cursor: 'pointer' }} onClick={() => drawRoute(lat, lon)}>
                                        🏥 {hospital.tags?.name || 'Unnamed Hospital'} <br />
                                        📍 {dist} km away <br />
                                        🧭 Click to get route
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    );
                })}

                {routes.map((route, idx) => (
                    <Polyline
                        key={idx}
                        positions={route.coords}
                        color={idx === shortestRouteIdx ? 'blue' : 'grey'}
                        weight={idx === shortestRouteIdx ? 5 : 3}
                    />
                ))}
            </MapContainer>

            <LocateButton onClick={locateUser} />
        </div>
    );
};

export default MyMap;