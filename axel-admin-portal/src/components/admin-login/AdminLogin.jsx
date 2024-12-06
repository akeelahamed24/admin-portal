import React from 'react';
import styles from './AdminLogin.module.css';

const AdminLogin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Admin Login</h2>
        <form className={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.inputField}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.inputField}
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
