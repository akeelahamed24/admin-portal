import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import User from './routes/User';
import AdminUserView from '../src/components/admin-dashboard/AdminUserView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<User />} />
        <Route path="/users/:userId" element={<AdminUserView />} /> {/* Add this line */}
      </Routes>
    </Router>
  );
};


ReactDOM.createRoot(document.getElementById('app')).render(<App />);
