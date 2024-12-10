import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Admin Login</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="#" className={styles.forgotPassword}>
            Forgot Password?
          </a>
          <button type="submit" className={styles.loginButton}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
