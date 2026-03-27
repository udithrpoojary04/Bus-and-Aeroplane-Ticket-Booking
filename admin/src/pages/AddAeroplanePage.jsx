import { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AddAeroplanePage = () => {
    const [formData, setFormData] = useState({
        name: '', aeroplaneId: '', from: '', to: '',
        date: '', departureTime: '', price: '', totalSeats: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/vehicles', { ...formData, type: 'Aeroplane' });
            alert(`Aeroplane Added`);
            navigate('/dashboard');
        } catch (error) {
            alert(`Failed to add aeroplane`);
        }
    };

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    return (
        <div>
            <h2>Add New Flight</h2>

            <div className="card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input name="name" placeholder="Airline Name" value={formData.name} onChange={handleChange} required className="form-input" />
                        <input name="aeroplaneId" placeholder="Aeroplane ID" value={formData.aeroplaneId} onChange={handleChange} required className="form-input" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input name="from" placeholder="From Location" value={formData.from} onChange={handleChange} required className="form-input" />
                        <input name="to" placeholder="To Location" value={formData.to} onChange={handleChange} required className="form-input" />
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.2rem'}}>Departs (Min: Tomorrow)</label>
                            <input name="date" type="date" min={minDate} value={formData.date} onChange={handleChange} required className="form-input" />
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.2rem'}}>Departure Time</label>
                            <input name="departureTime" type="time" placeholder="Departure Time" value={formData.departureTime} onChange={handleChange} required className="form-input" />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input name="price" type="number" placeholder="Ticket Price" value={formData.price} onChange={handleChange} required className="form-input" />
                        <input name="totalSeats" type="number" placeholder="Total Seats" value={formData.totalSeats} onChange={handleChange} required className="form-input" />
                    </div>
                    <button type="submit" className="form-button btn-primary">Add Aeroplane</button>
                </form>
            </div>
        </div>
    );
};

export default AddAeroplanePage;
