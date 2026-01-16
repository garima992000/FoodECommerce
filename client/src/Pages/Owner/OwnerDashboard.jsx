import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwnerOrders } from "../../Redux/Slices/OrderSlice";
import { fetchOwnerRestaurants } from "../../Redux/Slices/RestaurantSlice";
import { useNavigate } from "react-router-dom";
import '../../CSS/OwnerDashboard.css'
const OwnerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders = [] } = useSelector((state) => state.order);
  const { restaurants = [] } = useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(fetchOwnerOrders());
    dispatch(fetchOwnerRestaurants());
  }, [dispatch]);

  const pendingOrders = orders.filter(
    (order) =>
      order.orderStatus !== "DELIVERED" &&
      order.orderStatus !== "CANCELLED"
  );

  return (
    <div className="owner-dashboard">
    <div className="dashboard-container">
      <h1 className="dashboard-title">Owner Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>My Restaurants</h3>
          <p>{restaurants.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Orders</h3>
          <p>{pendingOrders.length}</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <button
          className="dashboard-btn"
          onClick={() => navigate("/owner/restaurants")}
        >
          Manage Restaurants
        </button>

        <button
          className="dashboard-btn secondary"
          onClick={() => navigate("/owner/orders")}
        >
          View Orders
        </button>
      </div>
    </div>
  </div>
  );
};


export default OwnerDashboard;
