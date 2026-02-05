
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProviderWrapper } from './components/ThemeContext';
import Home from './components/Home';
import UserDashboard from './components/user/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import RoomManagement from './components/admin/RoomManagement';
import EmployeeManagement from './components/admin/EmployeeManagement';
import BookingManagement from './components/admin/BookingManagement';
import PaymentManagement from './components/admin/PaymentManagement';
import FoodOrderManagement from './components/admin/FoodOrderManagement';
import HousekeepingMaintenance from './components/admin/HousekeepingMaintenance';
import InventoryManagement from './components/admin/InventoryManagement';
import FeedbackManagement from './components/admin/FeedbackManagement';
import LoyaltyProgramManagement from './components/admin/LoyaltyProgramManagement';
import EventManagement from './components/admin/EventManagement';
import Reports from './components/admin/Reports';
import SupplierManagement from './components/admin/SupplierManagement';

function App() {
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : null;
  });

  const handleLogin = async (userId, role) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        localStorage.setItem('userData', JSON.stringify(data));
      } else {
        const fallback = { id: userId, role, name: role === 'ADMIN' ? 'Admin User' : 'John Doe' };
        setUserData(fallback);
        localStorage.setItem('userData', JSON.stringify(fallback));
      }
    } catch (err) {
      const fallback = { id: userId, role, name: role === 'ADMIN' ? 'Admin User' : 'John Doe' };
      setUserData(fallback);
      localStorage.setItem('userData', JSON.stringify(fallback));
    }
  };

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem('userData');
  };

  return (
    <ThemeProviderWrapper>
      <Router>
        <Routes>
          {/* Default Home Page */}
          <Route
            path="/"
            element={
              userData ? <Navigate to="/dashboard" replace /> : <Home onLogin={handleLogin} />
            }
          />

          {/* Role-Based Dashboard Navigation */}
          <Route
            path="/dashboard/*"
            element={
              userData ? (
                userData.role === 'ADMIN' ? (
                  <AdminDashboard userData={userData} onLogout={handleLogout} />
                ) : (
                  <UserDashboard userData={userData} onLogout={handleLogout} />
                )
              ) : (
                <Navigate to="/" replace />
              )
            }
          >
            {/* Admin Nested Routes */}
            <Route path="rooms" element={<RoomManagement />} />
            <Route path="employees" element={<EmployeeManagement />} />
            <Route path="bookings" element={<BookingManagement />} />
            <Route path="payments" element={<PaymentManagement />} />
            <Route path="food-orders" element={<FoodOrderManagement />} />
            <Route path="housekeeping" element={<HousekeepingMaintenance />} />
            <Route path="supplier" element={<SupplierManagement/>}/>
            <Route path="inventory" element={<InventoryManagement />} />
            <Route path="feedback" element={<FeedbackManagement />} />
            <Route path="loyalty" element={<LoyaltyProgramManagement />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          {/* Catch-All Route for Undefined Paths */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </ThemeProviderWrapper>
  );
}

export default App;
