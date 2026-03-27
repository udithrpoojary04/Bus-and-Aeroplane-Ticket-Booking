import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './Navbar.css'; // Assume we will create styles, or use inline/styled-components. I'll use inline for speed or create generic css later.

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">TravelBooker</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/buses">Buses</Link></li>
                <li><Link to="/flights">Flights</Link></li>
                {user ? (
                    <>
                        <li><Link to="/my-bookings">My Bookings</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><button onClick={logout}>Logout</button></li>
                        <li>Welcome, {user.name}</li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
