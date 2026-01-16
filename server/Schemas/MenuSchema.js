import mongoose from "mongoose";
const MenuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["starter", "Main Course", "dessert", "beverage", "snacks"],
      required: true,
    },
    isVeg: {
      type: Boolean,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
    },
  },
  { timestamps: true }
);

const MenuModel = mongoose.model("menu", MenuSchema);

export default MenuModel;
