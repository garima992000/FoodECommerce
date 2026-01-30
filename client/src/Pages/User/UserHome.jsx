import React, { useEffect, useState } from "react";
import { fetchRestaurants } from "../../Redux/Slices/RestaurantSlice";
import { useDispatch, useSelector } from "react-redux";
import RestaurantCard from "../../Components/RestaurantCard";
import "../../CSS/UserHome.css";
import { useDebounce } from "../../CustomHooks/useDebounce";
const UserHome = () => {
  const [searchText, setSearchText] = useState("");
  const debouncedText = useDebounce(searchText, 800);

  useEffect(() => {
    if (debouncedText) {
    }
  }, [debouncedText]);
  const dispatch = useDispatch();
  const { restaurants, loading, error } = useSelector(
    (state) => state.restaurant,
  );

  useEffect(() => {
    dispatch(fetchRestaurants(debouncedText));
  }, [dispatch,debouncedText]);
  // const filterRestaurants = (restaurants, debouncedText) => {
  //   if (!restaurants || restaurants.length === 0) {
  //     return [];
  //   }
  //   const normalizedSearch = debouncedText
  //     .trim()
  //     .toLowerCase()
  //     .replace(/\s+/g, "");

  //   if (normalizedSearch === "") {
  //     return restaurants;
  //   }
  //   return restaurants.filter((restaurant) => {
  //     if (!restaurant?.name) return false;
  //     return restaurant.name
  //       .trim()
  //       .toLowerCase()
  //       .replace(/\s+/g, "")
  //       .includes(normalizedSearch);
  //   });
  // };
  // const filteredRestaurants = filterRestaurants(restaurants, debouncedText);
  return (
    <div className="user-home">
      <div className="user-home-inner">
        <h2 className="page-title">Restaurants near you</h2>
        <input
          type="text"
          placeholder="Search Restaurants..."
          className="page-searchbar"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        {loading && <p className="status-text">Loading restaurants...</p>}
        {error && <p className="error-text">{error}</p>}

        <div className="restaurant-grid">
          {restaurants?.length > 0 ? (
            restaurants?.map((restaurant) => (
              <RestaurantCard
                key={restaurant._id}
                restaurant={restaurant}
                mode="user"
              />
            ))
          ) : (
            <p>No restaurants available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
