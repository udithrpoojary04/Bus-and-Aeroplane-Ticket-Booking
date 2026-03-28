import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-glow"></div>
            <div className="footer-content">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <h3 className="footer-logo">TravelBooker</h3>
                        <p className="footer-tagline">
                            Your trusted companion for seamless bus and flight bookings. 
                            Travel smart, travel easy.
                        </p>
                        <div className="footer-socials">
                            <a href="#" className="social-link" aria-label="Twitter">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </a>
                            <a href="#" className="social-link" aria-label="GitHub">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                            </a>
                            <a href="#" className="social-link" aria-label="LinkedIn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/buses">Book a Bus</Link></li>
                            <li><Link to="/flights">Book a Flight</Link></li>
                            <li><Link to="/my-bookings">My Bookings</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Support</h4>
                        <ul className="footer-links">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Cancellation Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Contact</h4>
                        <ul className="footer-links contact-info">
                            <li>
                                <span className="contact-icon">📧</span>
                                support@travelbooker.com
                            </li>
                            <li>
                                <span className="contact-icon">📞</span>
                                +91 98765 43210
                            </li>
                            <li>
                                <span className="contact-icon">📍</span>
                                Mangalore, Karnataka, India
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p>© {currentYear} TravelBooker. All rights reserved.</p>
                    <p className="footer-credit">Crafted with ✨ for seamless travel experiences</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
