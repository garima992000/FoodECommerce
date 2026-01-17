import React from "react";
import "../CSS/UserCard.css";

const UserCard = ({ user , handleBlock,handleUnblock}) => {
  return (
    <div className="user-card">
      <div className="user-header">
        <h3>{user.name}</h3>
        <span
          className={`status ${
            user.isActive ? "Active" : "Blocked"
          }`}
        >
          {user.isActive ? "Active" : "Blocked"}
        </span>
      </div>

      <div className="user-body">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Role:</strong> {user.role || "User"}
        </p>
        <p>
          <strong>Joined:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="user-actions">
        {/* <button className="view-btn">View</button> */}
        <button
          className={user.isActive ? "block-btn":"unblock-btn"  }
          onClick={() => {
  user.isActive
    ? handleBlock({id:user._id})
    : handleUnblock({id:user._id});
}}
        >
          {user.isActive ?  "Block":"Unblock" }
        </button>
      </div>
    </div>
  );
};

export default UserCard;
