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
    const userId=req.userId;
    const restaurantId = req.params.restaurantId;
    if (!restaurantId) {
      return res.json({ message: "Id not found!!", status: false });
    }
    const restaurant = await RestaurantModel.findById(restaurantId);
    if(!restaurant){
      return res.json({message:'Restaurant not found!!',status:false})
    }
    if (userId !== restaurant.ownerId.toString()) {
      return res.json({
        message: "You are not allowed to view these food items",
        status: false,
      });
    }
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
    if (!foodItem) {
      return res.json({ message: "FoodItem Not found!!", status: false });
    }
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
      updatedFoodItem: updatedFoodItem,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

export const ToggleAvailabilty = async (req, res) => {
  try {
    const userId = req.userId;
    const foodId = req.params.foodId;
    if (!foodId) {
      return res.json({ message: "Id not found!!", status: false });
    }
    const foodItem = await MenuModel.findById(foodId);
    if (!foodItem) {
      return res.json({ message: "FoodItem Not found!!", status: false });
    }
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
      { isAvailable: !foodItem.isAvailable },
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

export const deleteFood = async (req, res) => {
  try {
    const userId = req.userId;
    const foodId = req.params.foodId;
    if (!foodId) {
      return res.json({ message: "Food Id not Found!!", status: false });
    }
    const foodItem = await MenuModel.findOne({ _id: foodId });
    if (!foodItem) {
      return res.json({ message: "Food Item not found!!", status: false });
    }
    const restaurant = await RestaurantModel.findById(foodItem.restaurantId);
    if (!restaurant) {
      return res.json({ message: "Restaurant not found!!", status: false });
    }
    console.log(restaurant.ownerId);
    if (userId !== restaurant.ownerId.toString()) {
      return res.json({
        message: "You can't delete food items!!",
        status: false,
      });
    }
    await MenuModel.findByIdAndDelete({ _id: foodId });
    return res.json({ message: "Food Item Deleted!!", status: true ,deletedFoodId: foodId});
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

export const getMenu = async (req, res) => {
  try {
    const id = req.params.restaurantId;
    if (!id) {
      return res.json({ message: "Id not Found!!", status: false });
    }
    const restaurant = await RestaurantModel.findOne({
      _id: id,
      isApproved: true,
    });
    if (!restaurant) {
      return res.json({ message: "Restaurant not found!!", status: false });
    }
    const menu = await MenuModel.find({ restaurantId: id, isAvailable: true });
    if (menu.length===0) {
      return res.json({ message: "Menu not found!!", status: false });
    }
    return res.json({ message: "Menu Found!!", status: true, menuItems: menu });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};
