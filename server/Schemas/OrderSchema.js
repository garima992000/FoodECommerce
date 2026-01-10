import mongoose from "mongoose";
const OrderItemSchema = new mongoose.Schema(
  {
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "menu",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
      required: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      default: "PLACED",
      enum: [
        "PLACED",
        "CONFIRMED",
        "PREPARING",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      default: "COD",
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "PENDING",
      enum: ["PAID", "PENDING", "FAILED"],
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", OrderSchema);

export default OrderModel;
