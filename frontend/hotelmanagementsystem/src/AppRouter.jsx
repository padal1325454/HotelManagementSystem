import * as React from 'react';
import AdminDashboard from './components/admin/AdminDashboard';
import UserDashboard from './components/user/UserDashboard';
import Login from './components/Login';
import { useState } from 'react';
import { ThemeProviderWrapper } from './components/ThemeContext';

export default function AppRouter() {
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);
  };

  if (!userRole) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <ThemeProviderWrapper>
      {userRole === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </ThemeProviderWrapper>
  );
}
