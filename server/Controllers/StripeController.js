import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";
import CartModel from "../Schemas/CartSchema.js";
import RestaurantModel from "../Schemas/RestaurantSchema.js";
import MenuModel from "../Schemas/MenuSchema.js";

const stripe = new Stripe(process.env.STRIPE_KEY);

export const createCheckOut = async (req, res) => {
  try {
    const userId = req.userId;
    const cart = await CartModel.findOne({ userId: userId });
    if (!cart) {
      return res.json({ message: "Cart is Empty!!", status: false });
    }
    if (!cart.items || cart.items.length === 0) {
      return res.json({ message: "Cart has no items", status: false });
    }
    const restaurant = await RestaurantModel.findById(
      cart.restaurantId,
    );
    if (!restaurant) {
      return res.json({ message: "Restaurant not found!!", status: false });
    }
    if (restaurant.isApproved === false) {
      return res.json({
        message: "Restaurant is not approved yet!!",
        status: false,
      });
    }
    if (restaurant.isOpen === false) {
      return res.json({
        message: "Restaurant is not opened yet!!",
        status: false,
      });
    }

    for (const item of cart.items) {
      let food = await MenuModel.findById(  item.foodId );
      if (!food) {
        return res.json({ message: "Cart is Stale!!", status: false });
      }
      if (food.isAvailable === false) {
        return res.json({
          message: `${food.name} is not available now !!`,
          status: false,
        });
      }
    }
    const line_items = cart.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/myorders",
      cancel_url: "http://localhost:5173/Cancel",
      metadata:{
        userId:userId.toString(),
        restaurantId:cart.restaurantId.toString(),
        cartId:cart._id.toString()
      }
    });
    return res.json({ url: session.url });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};
//price integrity