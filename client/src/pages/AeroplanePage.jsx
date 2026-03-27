import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AeroplanePage = () => {
    const navigate = useNavigate();
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);

    // Tomorrow's date as minimum for search
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    // Initial fetch for all planes
    useEffect(() => {
        fetchPlanes();
    }, []);

    const fetchPlanes = async (searchParams = {}) => {
        setLoading(true);
        try {
            const query = new URLSearchParams({ ...searchParams, type: 'Aeroplane' }).toString();
            const { data } = await api.get(`/vehicles?${query}`);
            setVehicles(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPlanes({ from, to, date });
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Book a Flight</h1>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="From Airport"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="To Airport"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="form-input"
                />
                <input
                    type="date"
                    value={date}
                    min={minDate}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-input"
                />
                <button type="submit" className="form-button btn-primary">Search Flights</button>
            </form>

            <div className="results-container">
                {loading ? <p>Loading flights...</p> : (
                    vehicles.length > 0 ? (
                        <div className="vehicle-grid">
                            {vehicles.map(vehicle => (
                                <div key={vehicle._id} className="vehicle-card">
                                    <div className="card-header">
                                        <h3>{vehicle.name}</h3>
                                        <span className="badge plane">Flight</span>
                                    </div>
                                    <div className="card-body">
                                        <p><strong>Route:</strong> {vehicle.from} ➝ {vehicle.to}</p>
                                        <p><strong>Flight ID:</strong> {vehicle.aeroplaneId || 'N/A'}</p>
                                        <p><strong>Date:</strong> {new Date(vehicle.date).toLocaleDateString()}</p>
                                        <p><strong>Time:</strong> {vehicle.departureTime}</p>
                                        <p><strong>Seats Available:</strong> {vehicle.totalSeats - (vehicle.bookedSeats?.length || 0)} / {vehicle.totalSeats}</p>
                                        <p className="price">₹{vehicle.price}</p>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/book/${vehicle._id}`)}
                                        className="form-button btn-secondary"
                                    >
                                        Select Seats
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-results">No flights found for your search.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default AeroplanePage;
