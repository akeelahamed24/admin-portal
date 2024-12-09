import React, { useState } from "react";
import styles from "./AdminUserAdd.module.css";
import axios from "axios";

const AdminUserAdd = ({ onAddUser, onCancel }) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    email: "",
    firstName: "",
    password: "",
    position: "",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      id: formData.employeeId,
      email: formData.email,
      name: formData.firstName,
      password: formData.password,
      position: formData.position,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8080/add_user/", userData);
      alert(response.data.message);
    } catch (error) {
      alert("Error adding user: " + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Add New User</h1>
        <button className={styles.backButton} onClick={onCancel}>
          Back to List
        </button>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Enter Employee ID"
              required
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter Employee Name"
              required
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.inputGroupFull}>
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Enter Position"
              required
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Set Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              required
            />
          </div>
        </div>
        <div className={styles.footer}>
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={styles.submitButton}>
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminUserAdd;
 