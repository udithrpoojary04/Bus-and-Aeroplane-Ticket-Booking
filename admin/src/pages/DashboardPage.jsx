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

    if (loading) return <div style={{ padding: '2rem', color: 'var(--color-text-secondary)' }}>Loading dashboard...</div>;

    const totalBookings = bookings.length;
    const busBookings = bookings.filter(b => b.vehicle?.type === 'Bus').length;
    const planeBookings = bookings.filter(b => b.vehicle?.type === 'Aeroplane').length;

    return (
        <div>
            <h2 style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>
                Dashboard Overview
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                <div className="card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Total Bookings</h3>
                    <p style={{ fontSize: '3rem', fontWeight: 'bold', background: 'var(--gradient-glow)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0.5rem 0' }}>{totalBookings}</p>
                </div>
                
                <Link to="/bus-bookings" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ textAlign: 'center', padding: '2rem 1rem', cursor: 'pointer', transition: 'all 0.3s', borderColor: 'transparent' }} 
                         onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.15)'; }}
                         onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <h3 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Bus Bookings</h3>
                        <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#60a5fa', margin: '0.5rem 0' }}>{busBookings}</p>
                        <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 600 }}>View Details ➜</span>
                    </div>
                </Link>

                <Link to="/aeroplane-bookings" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ textAlign: 'center', padding: '2rem 1rem', cursor: 'pointer', transition: 'all 0.3s', borderColor: 'transparent' }}
                         onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.15)'; }}
                         onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <h3 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Flight Bookings</h3>
                        <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#a78bfa', margin: '0.5rem 0' }}>{planeBookings}</p>
                        <span style={{ fontSize: '0.85rem', color: '#a78bfa', fontWeight: 600 }}>View Details ➜</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default DashboardPage;
