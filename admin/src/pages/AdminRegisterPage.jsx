import { useState, useContext } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AdminRegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin', { email, password });
            // Auto login after register
            await login(email, password);
            navigate('/dashboard');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <h1 style={{ marginBottom: '1.5rem' }}>Admin Register</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="form-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="form-input"
                />
                <button type="submit" className="form-button btn-primary">Register</button>
            </form>
        </div>
    );
};

export default AdminRegisterPage;
