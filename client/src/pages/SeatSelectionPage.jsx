import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';
import './SeatSelection.css'; // Need some styles for grid

const SeatSelectionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [vehicle, setVehicle] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const { data } = await api.get(`/vehicles/${id}`);
                console.log('Fetched Vehicle Data:', data); // DEBUG LOG
                setVehicle(data);
            } catch (error) {
                console.error('Error fetching vehicle:', error);
            }
        };
        fetchVehicle();
    }, [id]);

    const handleBook = async () => {
        if (!selectedSeat) return alert('Select a seat');
        if (!user) return navigate('/login');

        try {
            await api.post('/bookings', {
                vehicleId: id,
                seatNumber: selectedSeat
            });
            alert('Booking Confirmed!');
            navigate('/my-bookings');
        } catch (error) {
            alert(error.response.data.message || 'Booking Failed');
            // Refresh logic to show taken seat?
            const { data } = await api.get(`/vehicles/${id}`);
            setVehicle(data);
        }
    };

    if (!vehicle) return <div className="loading">Loading...</div>;

    // Create array of seats
    const totalSeats = Number(vehicle.totalSeats) || 0;
    const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);
    const bookedSeats = vehicle.bookedSeats || [];

    return (
        <div className="seat-selection">
            <h1 className="page-title">Select Seat for {vehicle.name}</h1>
            <p>Total Seats: {vehicle.totalSeats}</p> {/* DEBUG DISPLAY */}

            {totalSeats === 0 ? (
                <p>No seats configuration available for this vehicle.</p>
            ) : (
                <div className="seat-grid">
                    {seats.map(seat => {
                        const isBooked = bookedSeats.includes(seat);
                        const isSelected = selectedSeat === seat;
                        return (
                            <button
                                key={seat}
                                className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                                disabled={isBooked}
                                onClick={() => setSelectedSeat(seat)}
                            >
                                {seat}
                            </button>
                        );
                    })}
                </div>
            )}
            <div className="info">
                <p>Selected Seat: {selectedSeat || 'None'}</p>
                <p>Price: ${vehicle.price}</p>
                <button onClick={handleBook} disabled={!selectedSeat} className="form-button btn-primary" style={{ marginTop: '1rem' }}>Confirm Booking</button>
            </div>

        </div>
    );
};

export default SeatSelectionPage;
