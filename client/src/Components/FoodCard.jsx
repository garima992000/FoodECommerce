import React from "react";
import "../CSS/FoodCard.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Slices/CartSlice";

const FoodCard = ({ food }) => {
    const dispatch=useDispatch();
  return (
    <div className={`food-card ${!food.isAvailable ? "disabled" : ""}`}>
      <div className="food-header">
        <h4 className="food-name">{food.name}</h4>
        <span className={`food-type ${food.isVeg ? "veg" : "non-veg"}`}>
          {food.isVeg ? "Veg" : "Non-Veg"}
        </span>
      </div>

      <p className="food-desc">{food.description}</p>

      <div className="food-footer">
        <span className="food-price">₹{food.price}</span>

        <button
          className="add-btn"
          disabled={!food.isAvailable}
          onClick={()=>{dispatch(addToCart({foodId:food._id,quantity:1}))}}
        >
          {food.isAvailable ? "Add" : "Unavailable"}
        </button>
      </div>
    </div>
  );
};

export default FoodCard;