import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await api.get('/bookings');
                setBookings(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return <div>Loading dashboard...</div>;

    const totalBookings = bookings.length;
    const busBookings = bookings.filter(b => b.vehicle?.type === 'Bus').length;
    const planeBookings = bookings.filter(b => b.vehicle?.type === 'Aeroplane').length;

    return (
        <div>
            <h2>Dashboard Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                <div className="card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#64748b' }}>Total Bookings</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0f172a', margin: '0.5rem 0' }}>{totalBookings}</p>
                </div>
                
                <Link to="/bus-bookings" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ textAlign: 'center', padding: '2rem 1rem', cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid transparent' }} 
                         onMouseEnter={e => e.currentTarget.style.border = '1px solid #3b82f6'} 
                         onMouseLeave={e => e.currentTarget.style.border = '1px solid transparent'}>
                        <h3 style={{ fontSize: '1.2rem', color: '#64748b' }}>Bus Bookings</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6', margin: '0.5rem 0' }}>{busBookings}</p>
                        <span style={{ fontSize: '0.9rem', color: '#3b82f6' }}>View Details ➜</span>
                    </div>
                </Link>

                <Link to="/aeroplane-bookings" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ textAlign: 'center', padding: '2rem 1rem', cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid transparent' }}
                         onMouseEnter={e => e.currentTarget.style.border = '1px solid #3b82f6'} 
                         onMouseLeave={e => e.currentTarget.style.border = '1px solid transparent'}>
                        <h3 style={{ fontSize: '1.2rem', color: '#64748b' }}>Flight Bookings</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6', margin: '0.5rem 0' }}>{planeBookings}</p>
                        <span style={{ fontSize: '0.9rem', color: '#3b82f6' }}>View Details ➜</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default DashboardPage;
