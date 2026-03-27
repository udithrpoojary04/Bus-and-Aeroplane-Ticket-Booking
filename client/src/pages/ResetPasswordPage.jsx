import { useState } from 'react';
import api from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.put(`/users/resetpassword/${token}`, { password });
            setMessage(data.message);
            // On success, redirect to login after 2 seconds
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error occurred. Token might be expired.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h1 className="page-title" style={{ fontSize: '2rem' }}>Reset Password</h1>
            
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="form-input"
                    required
                    minLength="6"
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="form-input"
                    required
                    minLength="6"
                />
                <button type="submit" className="form-button" disabled={loading}>
                    {loading ? 'Resetting...' : 'Change Password'}
                </button>
            </form>

            {message && (
                <p style={{ marginTop: '1rem', color: message.includes('success') ? '#10b981' : '#ef4444' }}>
                    {message}
                </p>
            )}
            
            <div className="auth-link" style={{ marginTop: '1.5rem' }}>
                <a href="/login" style={{ textDecoration: 'none', color: '#64748b' }}>← Back to Login</a>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
