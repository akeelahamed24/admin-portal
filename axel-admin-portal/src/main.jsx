import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import User from './routes/User';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<User />} />

      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
