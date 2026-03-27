import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import '../App.css'; // Utilizing global styles for now

const Sidebar = () => {
    const { logout } = useContext(AuthContext);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>AdminPanel</h2>
            </div>
            <ul className="sidebar-menu">
                <li>
                    <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/add-bus" className={isActive('/add-bus') ? 'active' : ''}>
                        Add Bus
                    </Link>
                </li>
                <li>
                    <Link to="/add-aeroplane" className={isActive('/add-aeroplane') ? 'active' : ''}>
                        Add Aeroplane
                    </Link>
                </li>
                <li>
                    <Link to="/bus-bookings" className={isActive('/bus-bookings') ? 'active' : ''}>
                        Bus Bookings
                    </Link>
                </li>
                <li>
                    <Link to="/aeroplane-bookings" className={isActive('/aeroplane-bookings') ? 'active' : ''}>
                        Flight Bookings
                    </Link>
                </li>
                {/* Future links: Users, Bookings, Settings */}
            </ul>
            <div className="sidebar-footer">
                <button onClick={logout} className="logout-btn">
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
