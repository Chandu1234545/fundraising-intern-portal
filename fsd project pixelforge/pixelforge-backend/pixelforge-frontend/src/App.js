import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import { getToken } from './utils/token';

function App() {
  const token = getToken();

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/dashboard" element={token ? <DashboardPage /> : <Navigate to="/" />} />
        <Route path="/upload/:projectId" element={token ? <UploadPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
