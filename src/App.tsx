import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Metrics from './pages/Metrics';
import Events from './pages/Events';
import MicroService from './pages/MicroServices';
import Applications from './pages/Applications';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Monitoring from './pages/Monitoring';
import ErrorLogs from './pages/ErrorLogs';

const App = () => (
  <Routes>
    {/* Login route outside layout */}
    <Route path="/login" element={<Login />} />

    {/* All routes inside AppLayout */}
    <Route
      path="*"
      element={
        <AppLayout>
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Navigate to="/applications/app-links" replace />} />
            <Route path="/applications/app-links" element={<Applications />} />
            <Route path="/applications/service-links" element={<MicroService />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/events" element={<Events />} />
            <Route path="/logging" element={<ErrorLogs />} />
          </Routes>
        </AppLayout>
      }
    />
  </Routes>
);

export default App;
