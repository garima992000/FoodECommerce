import MenuModel from "../Schemas/MenuSchema.js";
import RestaurantModel from "../Schemas/RestaurantSchema.js";

export const AddFood = async (req, res) => {
  try {
    const userId = req.userId;
    const restaurantId = req.params.restaurantId;
    if (!restaurantId) {
      return res.json({
        message: "Restaurant Id is not there!!",
        status: false,
      });
    }
    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.json({
        message: "Restaurant Does mot exists!!",
        status: false,
      });
    }
    if (userId !== restaurant.ownerId.toString()) {
      return res.json({
        message: "You cannot add Food items!!",
        status: false,
      });
    }
    const { name, description, price, category, isVeg, isAvailable } = req.body;
    const foodItem = new MenuModel({
      name,
      description,
      price,
      category,
      isVeg,
      isAvailable,
      restaurantId: restaurantId,
    });
    await foodItem.save();
    return res.json({
      message: "New Food Item Added!!",
      status: true,
      foodItem: foodItem,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

export const getFood = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    if (!restaurantId) {
      return res.json({ message: "Id not found!!", status: false });
    }
    const restaurant = await RestaurantModel.findById(restaurantId);
    const foodItems = await MenuModel.find({ restaurantId });
    if (foodItems.length === 0) {
      return res.json({ message: "No food Items by this Id!!", status: false });
    }
    return res.json({
      message: `Food Items of ${restaurant.name} Restaurant`,
      status: true,
      foodItems: foodItems,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

export const updateFood = async (req, res) => {
  try {
    const userId = req.userId;
    const foodId = req.params.foodId;
    if (!foodId) {
      return res.json({ message: "Id not found!!", status: false });
    }
    const foodItem = await MenuModel.findById(foodId);
    const restaurant = await RestaurantModel.findById(foodItem.restaurantId);
    if (!restaurant) {
      return res.json({ message: "Restaurant not found!!", status: false });
    }
    if (userId !== restaurant.ownerId.toString()) {
      return res.json({
        message: "You can't update food item!!!",
        status: false,
      });
    }
    const updatedFoodItem = await MenuModel.findByIdAndUpdate(
      foodId,
      req.body,
      { new: true }
    );
    return res.json({
      message: "Food Item Updated!!",
      status: true,
      updatedFooItem: updatedFoodItem,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};
