import React from "react";
import styles from "./AdminDashboard.module.css";
import AdminSideBar from "./sidebar/AdminSideBar";
import Header from "./header/Header";

const AdminDashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Header pageTitle="Admin Dashboard" />
      <AdminSideBar />
      <main className={styles.mainContent}>
        <h2>Welcome to the Admin Dashboard</h2>
        <p>Here you can manage your application.</p>
      </main>
    </div>
  );
};

export default AdminDashboard;
