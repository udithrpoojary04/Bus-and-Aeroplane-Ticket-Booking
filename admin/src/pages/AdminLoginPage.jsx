import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div className="auth-container">
            <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', color: '#111827' }}>Admin Access</h1>
            <p style={{ color: '#6B7280', marginBottom: '2rem', fontWeight: '600' }}>
                Secure Dashboard Access Only
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Admin Email"
                    className="form-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="form-input"
                />
                <button type="submit" className="form-button btn-primary">Login</button>
            </form>
        </div>
    );
};

export default AdminLoginPage;
