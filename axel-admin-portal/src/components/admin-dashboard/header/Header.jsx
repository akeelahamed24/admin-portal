import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";

const Header = ({ pageTitle }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>{pageTitle}</h1>
      </div>
      <div className={styles.right}>
        <div className={styles.dateTime}>
          <p>{formatDate(currentDateTime)}</p>
          <p>{formatTime(currentDateTime)}</p>
        </div>
        <button className={styles.clockOutButton}>Clock Out</button>
        <NotificationsIcon className={styles.icon} />
        <MailIcon className={styles.icon} />
      </div>
    </header>
  );
};

export default Header;
