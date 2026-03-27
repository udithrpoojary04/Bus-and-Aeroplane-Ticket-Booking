import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import MyBookingsPage from './pages/MyBookingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import SeatSelectionPage from './pages/SeatSelectionPage';

import BusPage from './pages/BusPage';
import AeroplanePage from './pages/AeroplanePage';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buses" element={<BusPage />} />
          <Route path="/flights" element={<AeroplanePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/book/:id" element={<SeatSelectionPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
