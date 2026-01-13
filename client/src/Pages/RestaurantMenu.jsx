import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchMenu } from '../Redux/Slices/MenuSlice';
import FoodCard from '../Components/FoodCard';
import "../CSS/FoodCard.css";

const RestaurantMenu = () => {
  const { menuItems = [], loading, error } = useSelector(
    (state) => state.menu
  );
  const { restaurantId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMenu(restaurantId));
  }, [dispatch, restaurantId]);

  return (
    <div className="menu-page">
      <div className="menu-container">
        {loading && <p className="menu-status">Loading Menu...</p>}

        {!loading && error && (
          <p className="menu-error">{error}</p>
        )}

        {!loading && !error && menuItems.length === 0 && (
          <p className="menu-empty">
            No food items available!!
          </p>
        )}

        {!loading && !error && menuItems.length > 0 && (
          <div className="menu-grid">
            {menuItems.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;