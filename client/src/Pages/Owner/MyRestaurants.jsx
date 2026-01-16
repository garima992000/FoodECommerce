import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchOwnerRestaurants } from '../../Redux/Slices/RestaurantSlice';
import RestaurantCard from '../../Components/RestaurantCard';
import '../../CSS/UserHome.css'

const MyRestaurants = () => {
  const dispatch = useDispatch();
  const { restaurants, loading, error } = useSelector(
    (state) => state.restaurant
  );

  useEffect(() => {
    dispatch(fetchOwnerRestaurants());
  }, [dispatch]);

  return (
    <div className="user-home">
      <div className="user-home-inner"><h2 className="page-title">My Restaurants</h2>

      {loading && <p className="status-text">Loading restaurants...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="restaurant-grid">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
              mode="owner"
            />
          ))
        ) : (
          <p>No restaurants available</p>
        )}
      </div>
      </div>
    </div>
  );
}

export default MyRestaurants
