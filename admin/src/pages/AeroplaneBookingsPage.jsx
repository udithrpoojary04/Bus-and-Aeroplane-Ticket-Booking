import { useState, useEffect } from 'react';
import api from '../utils/api';

const AeroplaneBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await api.get('/bookings');
                // Filter only Aeroplane bookings
                const planeBookings = data.filter(b => b.vehicle?.type === 'Aeroplane');
                setBookings(planeBookings);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return <div>Loading flight bookings...</div>;

    return (
        <div>
            <h2>Flight Bookings</h2>
            {bookings.length === 0 ? (
                <p>No flight bookings found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Airline</th>
                            <th>Flight ID</th>
                            <th>Seat Number</th>
                            <th>Booking Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking._id}>
                                <td>{booking.user?.name}</td>
                                <td>{booking.user?.email}</td>
                                <td>{booking.vehicle?.name}</td>
                                <td>{booking.vehicle?.aeroplaneId || 'N/A'}</td>
                                <td>{booking.seatNumber}</td>
                                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AeroplaneBookingsPage;
