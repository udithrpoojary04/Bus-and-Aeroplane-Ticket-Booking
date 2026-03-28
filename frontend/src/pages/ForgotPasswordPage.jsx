import { useState } from 'react';
import api from '../utils/api';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [mockLink, setMockLink] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/users/forgotpassword', { email });
            setMessage(data.message);
            // Simulating email by displaying the link directly as requested
            if (data.resetToken) {
                setMockLink(`${window.location.origin}/reset-password/${data.resetToken}`);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error occurred');
            setMockLink('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h1 className="page-title" style={{ fontSize: '2rem' }}>Forgot Password</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                Enter your email address to receive a secure password reset link.
            </p>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="form-input"
                    required
                />
                <button type="submit" className="form-button" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>

            {message && <p style={{ marginTop: '1rem', color: mockLink ? 'var(--color-success)' : 'var(--color-danger)' }}>{message}</p>}

            {/* MOCK EMAIL DISPLAY */}
            {mockLink && (
                <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(6, 182, 212, 0.08)', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.2)', textAlign: 'left' }}>
                    <h4 style={{ color: 'var(--color-accent-hover)', margin: '0 0 0.5rem 0' }}>📧 Mock Email Received!</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                        Click the secure link below to reset your password:<br/>
                        <a href={mockLink} style={{ color: 'var(--color-accent)', fontWeight: 'bold', wordBreak: 'break-all', display: 'inline-block', marginTop: '0.5rem' }}>
                            {mockLink}
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default ForgotPasswordPage;
