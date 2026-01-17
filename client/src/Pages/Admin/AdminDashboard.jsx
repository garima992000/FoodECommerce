import React, { useEffect } from "react";
import "../../CSS/AdminDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminRestaurants, fetchAllUsers, fetchPendingRestaurants } from "../../Redux/Slices/AdminSlice";
import '../../CSS/OwnerDashboard.css'
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { users = [], loading, error ,restaurants, pendingRestaurants} = useSelector((state) => state.admin);
  const navigate=useNavigate(); 
  const blockedRestaurants =
    restaurants?.filter((r) => r.isOpen === false) ||
    [];  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchAllUsers());
      dispatch(fetchAdminRestaurants());
          dispatch(fetchPendingRestaurants()).unwrap();
    }, [dispatch]);
  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card users">
          <h3>Total Users</h3>
          <p className="stat-value">{users.length}</p>
        </div>

        <div className="stat-card restaurants">
          <h3>Total Restaurants</h3>
          <p className="stat-value">{restaurants.length}</p>
        </div>

        <div className="stat-card pending">
          <h3>Pending Restaurants</h3>
          <p className="stat-value">{pendingRestaurants.length}</p>
        </div>

        <div className="stat-card blocked">
          <h3>Blocked Restaurants</h3>
          <p className="stat-value">{blockedRestaurants.length}</p>
        </div>

        <div className="dashboard-actions">
        <button
          className="dashboard-btn"
          onClick={() => navigate("/admin/restaurants")}
        >
          Manage Restaurants
        </button>

        <button
          className="dashboard-btn secondary"
          onClick={() => navigate("/admin/users")}
        >
          Manage Users
        </button>
      </div>
      </div>
    </div>
  );
};

export default AdminDashboard;