import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div className="auth-container">
            <h1 className="page-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>User Login</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', fontWeight: '500' }}>
                 TravelBooker Client Portal
            </p>
            <form onSubmit={handleSubmit} className="auth-form">
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
                <button type="submit" className="form-button">Login</button>
            </form>
            <div className="auth-link" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div>Don't have an account? <a href="/register">Register here</a></div>
                <div>Forgot your password? <a href="/forgot-password">Reset here</a></div>
            </div>
        </div>
    );
};

export default LoginPage;
