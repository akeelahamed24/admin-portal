import React from "react";
import styles from "./AdminSideBar.module.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import AppsIcon from "@mui/icons-material/Apps";
import WorkIcon from "@mui/icons-material/Work";

const AdminSideBar = () => {
  return (
    <div className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <img src="/path/to/your/logo.png" alt="Logo" />
        <h2>YOUR BRAND</h2>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <ul>
          <li className={`${styles.navItem} ${styles.active}`}>
            <DashboardIcon className={styles.icon} />
            Dashboard
          </li>
          <li className={styles.navItem}>
            <PeopleIcon className={styles.icon} />
            Customer
          </li>
          <li className={styles.navItem}>
            <SettingsIcon className={styles.icon} />
            Services
          </li>
          <li className={styles.navItem}>
            <PersonIcon className={styles.icon} />
            User Management
          </li>
          <li className={styles.navItem}>
            <AppsIcon className={styles.icon} />
            Others
          </li>
          <li className={styles.navItem}>
            <WorkIcon className={styles.icon} />
            Worklog
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        <img src="/path/to/profile/image.jpg" alt="Profile" />
        <div>
          <h4>Admin Name</h4>
          <p>View Profile</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
