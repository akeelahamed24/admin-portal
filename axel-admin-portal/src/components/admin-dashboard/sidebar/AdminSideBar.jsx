import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AdminSideBar.module.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AppsIcon from "@mui/icons-material/Apps";
import WorkIcon from "@mui/icons-material/Work";
import Logo from "../../../assets/logo.png";
import Profile from "../../../assets/image.jpg";

const AdminSideBar = () => {
  const [userManagementOpen, setUserManagementOpen] = useState(false);

  const toggleDropdown = () => {
    setUserManagementOpen(!userManagementOpen);
  };

  return (
    <div className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <img src={Logo} alt="Logo" />
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <ul>
          <li className={styles.navItem}>
            <Link to="/dashboard" className={styles.navLink}>
              <DashboardIcon className={styles.icon} />
              Dashboard
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/customers" className={styles.navLink}>
              <PeopleIcon className={styles.icon} />
              Customer
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/services" className={styles.navLink}>
              <SettingsIcon className={styles.icon} />
              Services
            </Link>
          </li>
          <li
            className={styles.navItem}
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}
          >
            <PersonIcon className={styles.icon} />
            User Management
            {userManagementOpen ? (
              <ExpandLessIcon className={styles.dropdownIcon} />
            ) : (
              <ExpandMoreIcon className={styles.dropdownIcon} />
            )}
          </li>
          {userManagementOpen && (
            <ul className={styles.dropdownMenu}>
              <li className={styles.dropdownItem}>
                <Link to="/users" className={styles.navLink}>
                  View Users
                </Link>
              </li>
              <li className={styles.dropdownItem}>
                <Link to="/users/add" className={styles.navLink}>
                   Roles and Permissions
                </Link>
              </li>
            </ul>
          )}
          <li className={styles.navItem}>
            <Link to="/others" className={styles.navLink}>
              <AppsIcon className={styles.icon} />
              Others
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/worklog" className={styles.navLink}>
              <WorkIcon className={styles.icon} />
              Worklog
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        <img src={Profile} alt="Profile" />
        <div>
          <h4>Admin Name</h4>
          <p>View Profile</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
