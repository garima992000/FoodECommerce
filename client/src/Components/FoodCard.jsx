import React from "react";
import "../CSS/FoodCard.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Slices/CartSlice";

const FoodCard = ({ food, role, handleEdit,handleDelete,handleAdd }) => {
  const dispatch = useDispatch();
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
        {role === "user" && (
          <button
            className="add-btn"
            disabled={!food.isAvailable}
            onClick={() => {
              handleAdd({ foodId: food._id, quantity: 1 });
            }}
          >
            {food.isAvailable ? "Add" : "Unavailable"}
          </button>
        )}
        {role === "owner" && (
          <>
            <div className="food-actions">
              <button className="edit-btn" onClick={() => handleEdit(food)}>
                Edit
              </button>
              <button className="delete-btn" onClick={()=>{handleDelete({foodId:food._id})}}>Delete</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
