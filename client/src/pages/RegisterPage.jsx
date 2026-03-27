import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            navigate('/');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <h1 className="page-title">Register</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="form-input"
                />
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
                <button type="submit" className="form-button">Register</button>
            </form>
            <div className="auth-link">
                Already have an account? <a href="/login">Login here</a>
            </div>
        </div>
    );
};

export default RegisterPage;
