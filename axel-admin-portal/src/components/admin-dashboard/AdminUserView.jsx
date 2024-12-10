import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./AdminUserView.module.css";

const AdminUserView = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`);
        setUser(response.data);
        setUpdatedUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:8080/users/${userId}`, updatedUser);
      setUser(updatedUser);
      setIsEditing(false);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleCancelEdit = () => {
    setUpdatedUser(user);
    setIsEditing(false);
  };

  if (!user) return <p>Loading user details...</p>;

  return (
    <div className={styles.userViewPage}>
      <h1>User Details</h1>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Back to List
      </button>
      <div className={styles.userDetails}>
        {isEditing ? (
          <>
            <div className={styles.detailRow}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.detailRow}>
              <label>Contact:</label>
              <input
                type="text"
                name="contact"
                value={updatedUser.contact || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.detailRow}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.detailRow}>
              <label>Position:</label>
              <input
                type="text"
                name="position"
                value={updatedUser.position}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.detailRow}>
              <label>Status:</label>
              <select
                name="status"
                value={updatedUser.status || ""}
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Hold">Hold</option>
              </select>
            </div>
            <div className={styles.actions}>
              <button className={styles.saveButton} onClick={handleUpdateUser}>
                Save
              </button>
              <button className={styles.cancelButton} onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.detailRow}>
              <span>Name:</span> <p>{user.name}</p>
            </div>
            <div className={styles.detailRow}>
              <span>Contact:</span> <p>{user.contact || "N/A"}</p>
            </div>
            <div className={styles.detailRow}>
              <span>Email:</span> <p>{user.email}</p>
            </div>
            <div className={styles.detailRow}>
              <span>Position:</span> <p>{user.position}</p>
            </div>
            <div className={styles.detailRow}>
              <span>Status:</span> <p>{user.status || "N/A"}</p>
            </div>
            <button className={styles.editButton} onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUserView;
