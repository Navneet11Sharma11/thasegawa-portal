import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Metrics from './pages/Metrics';
import Events from './pages/Events';
import MicroService from './pages/MicroServices';
import Applications from './pages/Applications';
import Login from './pages/Login';

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
             <Route path="/" element={<Navigate to="/applications/app-links" replace />} />
            <Route path="/applications/app-links" element={<Applications />} />
            <Route path="/applications/service-links" element={<MicroService />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </AppLayout>
      }
    />
  </Routes>
);

export default App;
