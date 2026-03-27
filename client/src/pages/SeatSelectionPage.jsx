import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';
import './SeatSelection.css';

const SeatSelectionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [vehicle, setVehicle] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const { data } = await api.get(`/vehicles/${id}`);
                setVehicle(data);
            } catch (error) {
                console.error('Error fetching vehicle:', error);
            }
        };
        fetchVehicle();
    }, [id]);

    const toggleSeat = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else {
            if (selectedSeats.length >= 6) {
                alert('Maximum 6 seats can be booked at a time');
                return;
            }
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const handleBook = async () => {
        if (selectedSeats.length === 0) return alert('Select at least one seat');
        if (!user) return navigate('/login');

        try {
            await api.post('/bookings', {
                vehicleId: id,
                seatNumbers: selectedSeats
            });
            alert(`${selectedSeats.length} seat(s) booked successfully!`);
            navigate('/my-bookings');
        } catch (error) {
            alert(error.response?.data?.message || 'Booking Failed');
            const { data } = await api.get(`/vehicles/${id}`);
            setVehicle(data);
            setSelectedSeats([]);
        }
    };

    if (!vehicle) return <div className="loading">Loading...</div>;

    const totalSeats = Number(vehicle.totalSeats) || 0;
    const bookedSeats = vehicle.bookedSeats || [];
    const isBus = vehicle.type === 'Bus';

    // Generate bus layout: 2+2 config with last row of 5
    const generateBusLayout = () => {
        if (totalSeats === 0) return [];
        
        const rows = [];
        let seatNum = 1;
        const regularRows = Math.ceil((totalSeats - 5) / 4); // rows of 4 seats
        const hasLastRow = totalSeats > 4;

        for (let i = 0; i < regularRows && seatNum <= totalSeats; i++) {
            const row = [];
            // Left pair (window + aisle)
            if (seatNum <= totalSeats) row.push(seatNum++);
            if (seatNum <= totalSeats) row.push(seatNum++);
            // Aisle gap
            row.push(null);
            // Right pair (aisle + window)
            if (seatNum <= totalSeats) row.push(seatNum++);
            if (seatNum <= totalSeats) row.push(seatNum++);
            rows.push({ type: 'regular', seats: row });
        }

        // Last row - 5 seats across (no aisle gap)
        if (hasLastRow && seatNum <= totalSeats) {
            const lastRow = [];
            for (let i = 0; i < 5 && seatNum <= totalSeats; i++) {
                lastRow.push(seatNum++);
            }
            rows.push({ type: 'last', seats: lastRow });
        }

        // Handle remaining seats
        while (seatNum <= totalSeats) {
            const row = [];
            if (seatNum <= totalSeats) row.push(seatNum++);
            if (seatNum <= totalSeats) row.push(seatNum++);
            row.push(null);
            if (seatNum <= totalSeats) row.push(seatNum++);
            if (seatNum <= totalSeats) row.push(seatNum++);
            rows.push({ type: 'regular', seats: row });
        }

        return rows;
    };

    // Simple grid for planes
    const generatePlaneLayout = () => {
        if (totalSeats === 0) return [];
        const rows = [];
        let seatNum = 1;
        const seatsPerRow = 6; // 3+3 layout
        
        while (seatNum <= totalSeats) {
            const row = [];
            for (let i = 0; i < 3 && seatNum <= totalSeats; i++) row.push(seatNum++);
            row.push(null); // aisle
            for (let i = 0; i < 3 && seatNum <= totalSeats; i++) row.push(seatNum++);
            rows.push({ type: 'regular', seats: row });
        }
        return rows;
    };

    const layout = isBus ? generateBusLayout() : generatePlaneLayout();
    const availableSeats = totalSeats - bookedSeats.length;

    return (
        <div className="seat-page">
            {/* Vehicle Info Header */}
            <div className="seat-page-header">
                <div>
                    <h1 className="page-title">{vehicle.name}</h1>
                    <div className="route-info">
                        <span className="route-city">{vehicle.from}</span>
                        <span className="route-arrow">→</span>
                        <span className="route-city">{vehicle.to}</span>
                    </div>
                    <p className="departure-info">
                        {new Date(vehicle.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                        {vehicle.departureTime && ` • ${vehicle.departureTime}`}
                    </p>
                </div>
                <div className="seat-meta">
                    <span className={`badge ${isBus ? 'bus' : 'plane'}`}>{vehicle.type}</span>
                    <span className="price-tag">₹{vehicle.price}<small>/seat</small></span>
                </div>
            </div>

            <div className="seat-layout-wrapper">
                {/* Legend */}
                <div className="seat-legend">
                    <div className="legend-item">
                        <div className="legend-box available"></div>
                        <span>Available</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-box selected"></div>
                        <span>Selected</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-box booked"></div>
                        <span>Booked</span>
                    </div>
                </div>

                {totalSeats === 0 ? (
                    <p>No seats configured for this vehicle.</p>
                ) : (
                    <div className={`bus-container ${isBus ? 'bus-type' : 'plane-type'}`}>
                        {/* Driver / Cockpit area */}
                        <div className="driver-area">
                            <div className="steering-icon">
                                {isBus ? '🚌' : '✈️'}
                            </div>
                            <span className="driver-label">{isBus ? 'Driver' : 'Cockpit'}</span>
                        </div>

                        {/* Seat rows */}
                        <div className="seat-rows">
                            {layout.map((row, rowIdx) => (
                                <div key={rowIdx} className={`seat-row ${row.type === 'last' ? 'last-row' : ''}`}>
                                    {row.seats.map((seat, colIdx) => {
                                        if (seat === null) {
                                            return <div key={`aisle-${colIdx}`} className="aisle"></div>;
                                        }
                                        const isBooked = bookedSeats.includes(seat);
                                        const isSelected = selectedSeats.includes(seat);
                                        return (
                                            <button
                                                key={seat}
                                                className={`bus-seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                                                disabled={isBooked}
                                                onClick={() => toggleSeat(seat)}
                                                title={isBooked ? 'Seat booked' : `Seat ${seat}`}
                                            >
                                                <span className="seat-number">{seat}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>

                        {/* Door indicator */}
                        <div className="door-indicator">
                            <span>🚪 {isBus ? 'Door' : 'Exit'}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Booking Summary */}
            <div className="booking-summary">
                <div className="summary-details">
                    <div className="summary-row">
                        <span>Selected Seats</span>
                        <span className="selected-seats-list">
                            {selectedSeats.length > 0 
                                ? selectedSeats.sort((a,b) => a-b).join(', ')
                                : 'None'}
                        </span>
                    </div>
                    <div className="summary-row">
                        <span>Available Seats</span>
                        <span>{availableSeats} / {totalSeats}</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total Amount</span>
                        <span className="total-price">₹{(vehicle.price * selectedSeats.length).toLocaleString()}</span>
                    </div>
                </div>
                <button 
                    onClick={handleBook} 
                    disabled={selectedSeats.length === 0} 
                    className="form-button btn-primary book-btn"
                >
                    {selectedSeats.length > 0 
                        ? `Book ${selectedSeats.length} Seat${selectedSeats.length > 1 ? 's' : ''} — ₹${(vehicle.price * selectedSeats.length).toLocaleString()}`
                        : 'Select seats to continue'}
                </button>
            </div>
        </div>
    );
};

export default SeatSelectionPage;
