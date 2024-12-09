import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdminUser.module.css";
import AdminSideBar from "./sidebar/AdminSideBar";
import Header from "./header/Header";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AdminUserAdd from "./AdminUserAdd";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users/");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

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

  // Pagination logic
  const totalPages = Math.ceil(users.length / usersPerPage);
  const currentUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
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
                <button onClick={() => filterUsers("name", "asc")}>Name (A-Z)</button>
                <button onClick={() => filterUsers("name", "desc")}>Name (Z-A)</button>
              </div>
            )}
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Position</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.contact || "N/A"}</td>
                    <td>{user.email}</td>
                    <td>{user.position}</td>
                    <td>{user.status || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.pagination}>
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.pageButton}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`${styles.pageButton} ${
                    currentPage === index + 1 ? styles.activePage : ""
                  }`}
                  onClick={() => goToPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.pageButton}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminUser;
