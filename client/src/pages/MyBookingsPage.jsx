import { useState, useEffect } from 'react';
import api from '../utils/api';

const MyBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyBookings = async () => {
        try {
            const { data } = await api.get('/bookings/mybookings');
            setBookings(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBookings();
    }, []);

    const handleCancel = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;
        
        try {
            await api.delete(`/bookings/${id}`);
            alert('Booking successfully cancelled');
            fetchMyBookings(); // Refresh the list
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to cancel booking');
        }
    };

    const isCancellable = (vehicle) => {
        if (!vehicle) return false;
        const departureDate = new Date(vehicle.date);
        if (vehicle.departureTime) {
            const [hours, minutes] = vehicle.departureTime.split(':');
            departureDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
        }
        const hoursLeft = (departureDate.getTime() - Date.now()) / (1000 * 60 * 60);
        return hoursLeft >= 24;
    };

    if (loading) return <div>Loading your bookings...</div>;

    return (
        <div className="page-container">
            <h1 className="page-title">My Bookings</h1>

            {bookings.length === 0 ? (
                <p className="no-results">You have no bookings yet.</p>
            ) : (
                <div className="vehicle-grid">
                    {bookings.map(booking => {
                        const canCancel = isCancellable(booking.vehicle);
                        return (
                            <div key={booking._id} className="vehicle-card" style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="card-header">
                                    <h3>{booking.vehicle?.name || 'Unknown Vehicle'}</h3>
                                    <span className={`badge ${booking.vehicle?.type === 'Bus' ? 'bus' : 'plane'}`}>
                                        {booking.vehicle?.type || 'N/A'}
                                    </span>
                                </div>
                                <div className="card-body" style={{ flexGrow: 1 }}>
                                    <p><strong>Route:</strong> {booking.vehicle?.from} ➝ {booking.vehicle?.to}</p>
                                    <p><strong>Date:</strong> {booking.vehicle ? new Date(booking.vehicle.date).toLocaleDateString() : 'N/A'}</p>
                                    <p><strong>Time:</strong> {booking.vehicle?.departureTime || 'N/A'}</p>
                                    <p><strong>Seat Number:</strong> {booking.seatNumber}</p>
                                    <p className="price">Paid: ${booking.vehicle?.price || '0'}</p>
                                    
                                    {!canCancel && booking.vehicle && (
                                        <p style={{ color: 'var(--color-danger)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                                            Cancellation unavailable (Departs in less than 24 hours)
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleCancel(booking._id)}
                                    disabled={!canCancel}
                                    className={`form-button ${canCancel ? 'btn-red' : 'btn-disabled'}`}
                                    style={{ 
                                        background: canCancel ? 'linear-gradient(135deg, #f43f5e, #e11d48)' : 'var(--color-bg-tertiary)', 
                                        color: canCancel ? '#fff' : 'var(--color-text-secondary)',
                                        cursor: canCancel ? 'pointer' : 'not-allowed',
                                        marginTop: 'auto',
                                        boxShadow: canCancel ? '0 0 15px rgba(244, 63, 94, 0.3)' : 'none',
                                        border: 'none'
                                    }}
                                >
                                    Cancel Booking
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyBookingsPage;
