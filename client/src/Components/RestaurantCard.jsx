import React from "react";
import "../CSS/RestaurantCard.css";
import { useNavigate } from "react-router-dom";
const RestaurantCard = ({ restaurant ,mode}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (mode === "user") {
      navigate(`/restaurants/${restaurant._id}/menu`);
    }

    if (mode === "restaurant_owner") {
      navigate(`/restaurants/${restaurant._id}/foods`);
    }

    // if (mode === "admin") {
    //   navigate("/admin/restaurants");
    // }
  };
  return (
    <div
      className="restaurant-card"
      onClick={() => {
        handleClick();
      }}
    >
      <div className="restaurant-card-header">
        <h3 className="restaurant-name">{restaurant.name}</h3>
        <span
          className={`restaurant-status ${
            restaurant.isOpen ? "open" : "closed"
          }`}
        >
          {restaurant.isOpen ? "Open" : "Closed"}
        </span>
      </div>

      <p className="restaurant-cuisine">{restaurant.cuisineTypes}</p>

      <div className="restaurant-info">
        <span>📍 {restaurant.address.city}</span>
        <span>{restaurant.desc}</span>
      </div>
    </div>
  );
};

export default RestaurantCard;
