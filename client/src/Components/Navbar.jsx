import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";
import { Link } from "react-router-dom";
import "../CSS/Navbar.css";

const Navbar = () => {
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      
      <div className="navbar-left">
        <span className="logo">🍔 Foodify</span>

        <span className="role-badge">
          {role?.toUpperCase()}
        </span>
      </div>

      
      <div className="navbar-links">
        {role === "admin" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/restaurants">Restaurants</Link>
          </>
        )}

        {role === "user" && (
          <>
            <Link to="/">Home</Link>
            <Link to="/myorders">My Orders</Link>
            <Link to="/cart">Cart</Link>
          </>
        )}

        {role === "restaurant_owner" && (
          <>
            <Link to="/owner">Dashboard</Link>
            <Link to="/owner/restaurants">My Restaurants</Link>
            <Link to="/owner/orders">Orders</Link>
          </>
        )}
      </div>

     
      <button
        className="logout-btn"
        onClick={() => dispatch(logout())}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
