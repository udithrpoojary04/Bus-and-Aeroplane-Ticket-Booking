import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import React from 'react'; // ensure React is imported if needed, or just imports
import AdminLoginPage from './pages/AdminLoginPage';
import AdminRegisterPage from './pages/AdminRegisterPage';
import DashboardPage from './pages/DashboardPage';
import AddBusPage from './pages/AddBusPage';
import AddAeroplanePage from './pages/AddAeroplanePage';
import BusBookingsPage from './pages/BusBookingsPage';
import AeroplaneBookingsPage from './pages/AeroplaneBookingsPage';
import AdminLayout from './components/AdminLayout'; // Import Layout

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return admin ? <AdminLayout>{children}</AdminLayout> : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLoginPage />} />
      <Route path="/register" element={<AdminRegisterPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/add-bus" element={<ProtectedRoute><AddBusPage /></ProtectedRoute>} />
      <Route path="/add-aeroplane" element={<ProtectedRoute><AddAeroplanePage /></ProtectedRoute>} />
      <Route path="/bus-bookings" element={<ProtectedRoute><BusBookingsPage /></ProtectedRoute>} />
      <Route path="/aeroplane-bookings" element={<ProtectedRoute><AeroplaneBookingsPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
