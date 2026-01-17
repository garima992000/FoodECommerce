import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminRestaurants,
  fetchPendingRestaurants,
  fetchUpdateApprove,
  fetchUpdateBlock,
  fetchUpdateUnblock,
} from "../../Redux/Slices/AdminSlice";
import RestaurantCard from "../../Components/RestaurantCard";
import "../../CSS/UserHome.css";
import { toast } from "react-toastify";

const Restraunts = () => {
  const dispatch = useDispatch();
  const { restaurants, pendingRestaurants, loading, error } = useSelector(
    (state) => state.admin
  );
  const approvedRestaurants =
    restaurants?.filter((r) => r.isApproved === true && r.isOpen===true) || [];
  const blockedRestaurants =
    restaurants?.filter((r) => r.isOpen === false) ||
    [];
  const handleApprove = async ({ id }) => {
    const res = await dispatch(fetchUpdateApprove({ id })).unwrap();
    const { message, status } = res;
    if (status === true) {
      toast.success(message);
    } else {
      toast.error("Something went wrong!!");
    }
    await dispatch(fetchAdminRestaurants());
    await dispatch(fetchPendingRestaurants());
  };
  const handleBlock = async ({ id }) => {
    const res = await dispatch(fetchUpdateBlock({ id })).unwrap();

    const { message, status } = res;
    if (status === true) {
      toast.success(message);
    } else {
      toast.error("Something went wrong!!");
    }
    await dispatch(fetchAdminRestaurants());
    await dispatch(fetchPendingRestaurants());
  };

  const handleUnblock = async ({ id }) => {
    const res = await dispatch(fetchUpdateUnblock({ id })).unwrap();
    const { message, status } = res;
    if (status === true) {
      toast.success(message);
    } else {
      toast.error("Something went wrong!!");
    }
    await dispatch(fetchAdminRestaurants());
    await dispatch(fetchPendingRestaurants());
  };
  useEffect(() => {
    dispatch(fetchAdminRestaurants());
    dispatch(fetchPendingRestaurants()).unwrap();
  }, [dispatch]);
  return (
    <div className="user-home">
      <div className="user-home-inner">
        <h2 className="page-title">Restaurant Management</h2>

        {loading && <p className="status-text">Loading restaurants...</p>}
        {error && <p className="error-text">{error}</p>}

        <section className="restaurant-section">
          <h3 className="section-title pending">Pending Restaurants</h3>

          <div className="restaurant-grid">
            {pendingRestaurants?.length > 0 ? (
              pendingRestaurants?.map((restaurant) => (
                <div key={restaurant._id} className="restaurant-card-wrapper">
                  <RestaurantCard restaurant={restaurant} mode="admin" />
                  <button
                    className="action-btn approve-btn"
                    onClick={() => handleApprove({ id: restaurant._id })}
                  >
                    Approve
                  </button>
                </div>
              ))
            ) : (
              <p>No pending restaurants available</p>
            )}
          </div>
        </section>

        <section className="restaurant-section">
          <h3 className="section-title approved">Approved Restaurants</h3>

          <div className="restaurant-grid">
            {approvedRestaurants.length > 0 ? (
              approvedRestaurants.map((restaurant) => (
                <div key={restaurant._id} className="restaurant-card-wrapper">
                  <RestaurantCard restaurant={restaurant} mode="admin" />
                  <button
                    className="action-btn block-btn"
                    onClick={() => handleBlock({ id: restaurant._id })}
                  >
                    Block
                  </button>
                </div>
              ))
            ) : (
              <p>No approved restaurants available</p>
            )}
          </div>
        </section>

        <section className="restaurant-section">
          <h3 className="section-title blocked">Blocked Restaurants</h3>

          <div className="restaurant-grid">
            {blockedRestaurants.length > 0 ? (
              blockedRestaurants.map((restaurant) => (
                <div key={restaurant._id} className="restaurant-card-wrapper">
                  <RestaurantCard restaurant={restaurant} mode="admin" />
                  <button
                    className="action-btn unblock-btn"
                    onClick={() => handleUnblock({ id: restaurant._id })}
                  >
                    Unblock
                  </button>
                </div>
              ))
            ) : (
              <p>No blocked restaurants available</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Restraunts;
