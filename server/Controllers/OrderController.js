import CartModel from "../Schemas/CartSchema.js";
import MenuModel from "../Schemas/MenuSchema.js";
import OrderModel from "../Schemas/OrderSchema.js";
import RestaurantModel from "../Schemas/RestaurantSchema.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.json({
        message: "Cart is empty. Cannot place order.",
        status: false,
      });
    }
    const restaurant = await RestaurantModel.findOne({
      _id: cart.restaurantId,
    });
    if (!restaurant) {
      return res.json({ message: "Restaurant not found!!", status: false });
    }
    if (restaurant.isApproved === false) {
      return res.json({ message: "Restaurant not Approved!!", status: false });
    }
    if (restaurant.isOpen === false) {
      return res.json({ message: "Restaurant not Open!!", status: false });
    }
    console.log(cart);
    for (const item of cart.items) {
      const food = await MenuModel.findById(item.foodId);
      if (!food) {
        return res.json({
          message: `Food item ${item.name} no longer exists`,
          status: false,
        });
      }
      if (food.isAvailable === false) {
        return res.json({
          message: `Food item ${item.name} no longer available`,
          status: false,
        });
      }
    }
    const order = new OrderModel({
      userId,
      restaurantId: cart.restaurantId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      orderStatus: "PLACED",
      paymentMethod: "COD",
      paymentStatus: "PENDING",
    });
    await order.save();

    await CartModel.findByIdAndDelete(cart._id);

    return res.json({
      message: "Order placed successfully!!",
      status: true,
      order,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};
