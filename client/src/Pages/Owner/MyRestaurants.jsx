import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createRestaurant,
  fetchOwnerRestaurants,
} from "../../Redux/Slices/RestaurantSlice";
import RestaurantCard from "../../Components/RestaurantCard";
import "../../CSS/UserHome.css";
import { useState } from "react";
import { toast } from "react-toastify";
const initialModalData = {
  name: "",
  desc: "",
  cuisineTypes: "",
  street: "",
  city: "",
  pincode: "",
  deliveryTime: "",
  isOpen: "true",
};
const MyRestaurants = () => {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(initialModalData);

  const dispatch = useDispatch();
  const { restaurants=[], loading, error } = useSelector(
    (state) => state.restaurant
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      name: modalData.name,
      desc: modalData.desc,

      cuisineTypes: modalData.cuisineTypes
        .split(",")
        .map((c) => c.trim()),

      address: {
        street: modalData.street,
        city: modalData.city,
        pincode: Number(modalData.pincode),
      },

      deliveryTime: Number(modalData.deliveryTime),
      isOpen: modalData.isOpen === "true",
    };

    const res = await dispatch(createRestaurant(payload)).unwrap();
    const { message, status } = res;

    if (status === true) {
      toast.success(message);
      setModalData(initialModalData);
      setModal(false);
      dispatch(fetchOwnerRestaurants());
    } else {
      toast.error(message);
    }

    console.log("RestCreated", res);
  } catch (err) {
    toast.error(err?.message || "Failed to create restaurant");
  }
};
  useEffect(() => {
    dispatch(fetchOwnerRestaurants());
  }, [dispatch]);

  return (
    <div className="user-home">
      <div className="user-home-inner">
        <h2 className="page-title">My Restaurants</h2>

        <button
          className="create-restaurant-btn"
          onClick={() => setModal(true)}
        >
          + Create Restaurant
        </button>

        {loading && <p className="status-text">Loading restaurants...</p>}
        {error && <p className="error-text">{error}</p>}

        <div className="restaurant-grid">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant._id}
                restaurant={restaurant}
                mode="restaurant_owner"
              />
            ))
          ) : (
            <p>No restaurants available</p>
          )}
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Create Restaurant</h3>
              <span className="close-btn" onClick={() => setModal(false)}>
                ✕
              </span>
            </div>

            <form className="modal-form">
              <input
                type="text"
                name="name"
                value={modalData.name}
                placeholder="Restaurant Name"
                onChange={handleChange}
              />

              <textarea
                name="desc"
                value={modalData.desc}
                placeholder="Description"
                onChange={handleChange}
              />

              <input
                type="text"
                name="cuisineTypes"
                value={modalData.cuisineTypes}
                placeholder="Cuisine Types (comma separated)"
                onChange={handleChange}
              />

              <input
                type="text"
                name="street"
                value={modalData.street}
                placeholder="Street"
                onChange={handleChange}
              />

              <input
                type="text"
                name="city"
                value={modalData.city}
                placeholder="City"
                onChange={handleChange}
              />

              <input
                type="number"
                name="pincode"
                value={modalData.pincode}
                placeholder="Pincode"
                onChange={handleChange}
              />

              <input
                type="number"
                name="deliveryTime"
                value={modalData.deliveryTime}
                placeholder="Delivery Time (mins)"
                onChange={handleChange}
              />

              <select
                name="isOpen"
                value={modalData.isOpen}
                onChange={handleChange}
              >
                <option value="true">Open</option>
                <option value="false">Closed</option>
              </select>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="submit-btn"
                  onClick={handleSubmit}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRestaurants;
