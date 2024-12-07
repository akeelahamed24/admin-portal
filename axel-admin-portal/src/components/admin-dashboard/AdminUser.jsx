import React, { useState } from "react";
import styles from "./AdminUser.module.css";
import AdminSideBar from "./sidebar/AdminSideBar";
import Header from "./header/Header";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AdminUserAdd from "./AdminUserAdd";

const AdminUser = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      contact: "1234567890",
      email: "john.doe@example.com",
      organization: "NCR Zonal Office",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      contact: "0987654321",
      email: "jane.smith@example.com",
      organization: "Chandigarh Zonal Office",
      role: "Manager",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Alice Johnson",
      contact: "9876543210",
      email: "alice.johnson@example.com",
      organization: "Jaipur Zonal Office",
      role: "Supervisor",
      status: "Active",
    },
    {
      id: 4,
      name: "Bob Brown",
      contact: "5678901234",
      email: "bob.brown@example.com",
      organization: "Lucknow Zonal Office",
      role: "Executive",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Charlie Davis",
      contact: "6789012345",
      email: "charlie.davis@example.com",
      organization: "Bhopal Zonal Office",
      role: "Assistant",
      status: "Active",
    },
  ]);

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const filterUsers = (field, order) => {
    const sortedUsers = [...users].sort((a, b) => {
      if (order === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    setUsers(sortedUsers);
    setIsFilterOpen(false);
  };

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, { ...newUser, id: prevUsers.length + 1 }]);
    setIsAddingUser(false);
  };

  return (
    <div className={styles.userPage}>
      <Header pageTitle="User Management" />
      <AdminSideBar />
      <main className={styles.mainContent}>
        {isAddingUser ? (
          <AdminUserAdd onAddUser={handleAddUser} onCancel={() => setIsAddingUser(false)} />
        ) : (
          <>
            <div className={styles.header}>
              <h1>User Management</h1>
              <p>Total Users: {users.length}</p>
              <button className={styles.addButton} onClick={() => setIsAddingUser(true)}>
                + Add New User
              </button>
            </div>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search..."
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>
                <SearchIcon />
              </button>
              <button className={styles.filterButton} onClick={toggleFilter}>
                <FilterListIcon />
              </button>
            </div>
            {isFilterOpen && (
              <div className={styles.filterMenu}>
                <p>Sort By:</p>
                <button onClick={() => filterUsers("name", "asc")}>
                  Name (A-Z)
                </button>
                <button onClick={() => filterUsers("name", "desc")}>
                  Name (Z-A)
                </button>
                <button onClick={() => filterUsers("organization", "asc")}>
                  Organization (A-Z)
                </button>
                <button onClick={() => filterUsers("organization", "desc")}>
                  Organization (Z-A)
                </button>
              </div>
            )}
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Contact Number</th>
                  <th>Email</th>
                  <th>Organization</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className={user.status === "Inactive" ? styles.inactiveRow : ""}
                  >
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.contact}</td>
                    <td>{user.email}</td>
                    <td>{user.organization}</td>
                    <td>{user.role}</td>
                    <td>
                      <span
                        className={`${styles.statusTag} ${
                          user.status === "Active" ? styles.active : styles.inactive
                        }`}
                      >
                        <span className={styles.statusDot}></span>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminUser;
