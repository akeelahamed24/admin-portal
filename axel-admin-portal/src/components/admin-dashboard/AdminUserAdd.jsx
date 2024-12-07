import React, { useState } from "react";
import styles from "./AdminUserAdd.module.css";

const AdminUserAdd = ({ onAddUser, onCancel }) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    organization: "NCR Zonal Office",
  });

  const organizations = [
    "NCR Zonal Office",
    "Chandigarh Zonal Office",
    "Jaipur Zonal Office",
    "Lucknow Zonal Office",
    "Bhopal Zonal Office",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser(formData); // Pass form data to parent
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
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"
              required
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.inputGroupFull}>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address"
              required
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
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
        <div className={styles.row}>
          <div className={styles.inputGroupFull}>
            <label>Organization</label>
            <select
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              required
            >
              {organizations.map((org, index) => (
                <option key={index} value={org}>
                  {org}
                </option>
              ))}
            </select>
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
