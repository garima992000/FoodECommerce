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

    const user = await UserModel.findById(userId);
    let discount = 0;
    if (user.subscriptionPlan === "basic") discount = 0.1;
    if (user.subscriptionPlan === "advanced") discount = 0.5;

    const originalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const discountAmount = originalAmount * discount;
    const totalAmount = originalAmount - discountAmount;

    const order = new OrderModel({
      userId,
      restaurantId: cart.restaurantId,
      items: cart.items,
      totalAmount,
      originalAmount,
      discountAmount,
      subscriptionPlan: user.subscriptionPlan,
      orderStatus: "PLACED",
      paymentMethod: "COD",
      paymentStatus: "PENDING",
    });
    console.log(
  "FINAL VALUES 👉",
  typeof originalAmount,
  typeof discountAmount,
  originalAmount,
  discountAmount
);
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

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const myOrders = await OrderModel.find({ userId })
      .populate("restaurantId", "name address.city")
      .sort({ createdAt: -1 });
    return res.json({
      message: "Orders fetched Succesfully!!",
      status: true,
      orders: myOrders,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

export const getRestaurantOrders = async (req, res) => {
  try {
    const ownerId = req.userId;
    const restaurants = await RestaurantModel.find({ ownerId });
    if (restaurants.length === 0) {
      return res.json({
        message: "No Restaurant !!",
        status: true,
        orders: [],
      });
    }
    const resturantIds = restaurants.map((restaurant) => restaurant._id);
    const restaurantOrders = await OrderModel.find({
      restaurantId: { $in: resturantIds },
    })
      .populate("userId", "name")
      .sort({ createdAt: -1 });
    return res.json({
      message: "Orders fetched Successfully!!",
      status: true,
      orders: restaurantOrders,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const ownerId = req.userId;
    const orderId = req.params.orderId;
    const { newStatus } = req.body;
    if (!newStatus) {
      return res.json({ message: "Status is required!!", status: false });
    }
    const allowedStatuses = [
      "PLACED",
      "CONFIRMED",
      "PREPARING",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "CANCELLED",
    ];
    if (!allowedStatuses.includes(newStatus)) {
      return res.json({ message: "Status not Allowed!!", status: false });
    }
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.json({ message: "Order not Found!!", status: false });
    }
    const restaurant = await RestaurantModel.findById(order.restaurantId);
    if (!restaurant) {
      return res.json({ message: "Restaurant not Found!!", status: false });
    }
    if (restaurant.ownerId.toString() !== ownerId) {
      return res.json({ message: "Access denied!!", status: false });
    }
    if (
      order.orderStatus === "CANCELLED" ||
      order.orderStatus === "DELIVERED"
    ) {
      return res.json({
        message: "Order is already Completed.Status cannot be updated",
        status: false,
      });
    }
    if (order.orderStatus === newStatus) {
      return res.json({
        message: "Order is already in this status",
        status: false,
      });
    }
    order.orderStatus = newStatus;
    await order.save();

    return res.json({
      message: "Order status updated successfully",
      status: true,
      order,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};
