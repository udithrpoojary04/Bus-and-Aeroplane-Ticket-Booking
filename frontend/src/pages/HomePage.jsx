import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="home-container">
            <h1 className="hero-title">Welcome to TravelApp</h1>
            <p className="hero-subtitle">Choose your preferred mode of travel and start your journey today.</p>

            <div className="selection-cards">
                <div className="selection-card" onClick={() => navigate('/buses')}>
                    <span className="icon">🚌</span>
                    <h2>Book a Bus</h2>
                    <p>Comfortable rides at affordable prices.</p>
                </div>

                <div className="selection-card" onClick={() => navigate('/flights')}>
                    <span className="icon">✈️</span>
                    <h2>Book a Flight</h2>
                    <p>Fast and convenient air travel.</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
