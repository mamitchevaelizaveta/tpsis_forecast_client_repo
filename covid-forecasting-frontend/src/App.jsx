import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import LoginPage from './components/Pages/LoginPage';
import DataManagementPage from './components/Pages/DataManagementPage';
import ForecastingPage from './components/Pages/ForecastingPage';
import HistoryPage from './components/Pages/HistoryPage';
import NotificationsPage from './components/Pages/NotificationsPage';
import UsersPage from './components/Pages/UsersPage';

export default function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const handleLogin = () => {
    setUser({ name: 'Мамичева Е.А.', role: 'analyst' });
  };

  const handleLogout = () => setUser(null);

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Хедер на всю ширину */}
      <TopBar unreadCount={2} />

      {/* Контент под хедером */}
      <Box sx={{ display: 'flex', pt: '64px' }}>
        <Sidebar user={user} onLogout={handleLogout} />

        <Box
          component="main"
          sx={{
            flex: 1,
            ml: '240px',
            p: 3,
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          <Routes>
            <Route path="/data"          element={<DataManagementPage />} />
            <Route path="/forecast"      element={<ForecastingPage />} />
            <Route path="/history"       element={<HistoryPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/users"         element={<UsersPage />} />
            <Route path="*" element={<Navigate to="/forecast" replace />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}