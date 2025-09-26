import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Import pages and protected route component
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SchedulerPage from './pages/SchedulerPage';
import NotificationsPage from './pages/NotificationsPage';
import ProtectedRoute from './components/ProtectedRoute';
// We no longer need to fetch data here, it will be done inside HomePage

function App() {
  return (
    <Routes>
      {/* Public route for login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes for the main app */}
      <Route element={<ProtectedRoute />}>
        {/* These routes can only be accessed after login */}
        <Route path="/" element={<HomePage />} />
        <Route path="/scheduler" element={<SchedulerPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Route>
    </Routes>
  );
}

export default App;