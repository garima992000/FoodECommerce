import RestaurantModel from "../Schemas/RestaurantSchema.js";
import UserModel from "../Schemas/UserAdminSchema.js";

export const createRestaurant = async (req, res) => {
  try {
    const { name, desc, cuisineTypes, address, deliveryTime } = req.body;
    const existingRestaurant = await RestaurantModel.findOne({
      name,
      ownerId: req.userId,
    });
    if (existingRestaurant) {
      return res.json({
        message: "You already have a restaurant with same name!!",
        status: false,
      });
    }
    const newRestaurant = new RestaurantModel({
      name,
      desc,
      cuisineTypes,
      address,
      deliveryTime,
      ownerId: req.userId,
    });
    await newRestaurant.save();
    return res.json({
      message: "New Restaurant Created!!",
      status: true,
      restaurant: newRestaurant,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

export const getallRestaurants = async (req, res) => {
  try {
    const userId = req.userId;
    const searchedText = req.query.search;
    const user = await UserModel.findById(userId);
    console.log(user);
    if (!searchedText) {
      if (
        user.subscriptionPlan === "basic" ||
        user.subscriptionPlan === "free"
      ) {
        const allRestaurants = await RestaurantModel.find({
          isApproved: true,
          isPremium: false,
        });
        if (allRestaurants.length === 0) {
          return res.json({ message: "No Restaurants Found!!", status: false });
        }

        return res.json({
          message: "Got all Restaurants!!",
          status: true,
          allRestaurants: allRestaurants,
        });
      }
      if (user.subscriptionPlan === "advanced") {
        const allRestaurants = await RestaurantModel.find({
          isApproved: true,
          isPremium: true,
        });
        if (allRestaurants.length === 0) {
          return res.json({ message: "No Restaurants Found!!", status: false });
        }

        return res.json({
          message: "Got all Restaurants!!",
          status: true,
          allRestaurants: allRestaurants,
        });
      }
    }
    const normalizedSearch = searchedText
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "");
    if (user.subscriptionPlan === "basic" || user.subscriptionPlan === "free") {
      const allRestaurants = await RestaurantModel.find({
        isApproved: true,
        name: {
          $regex: normalizedSearch.split("").join("\\s*"),
          $options: "i",
        },
        isPremium: false,
      });
      if (allRestaurants.length === 0) {
        return res.json({ message: "No Restaurants Found!!", status: false });
      }

      return res.json({
        message: "Found Restaurant!!",
        status: true,
        allRestaurants: allRestaurants,
      });
    }
    if (user.subscriptionPlan === "advanced") {
      const allRestaurants = await RestaurantModel.find({
        isApproved: true,
        name: {
          $regex: normalizedSearch.split("").join("\\s*"),
          $options: "i",
        },
        isPremium: true,
      });
      if (allRestaurants.length === 0) {
        return res.json({ message: "No Restaurants Found!!", status: false });
      }

      return res.json({
        message: "Found Restaurant!!",
        status: true,
        allRestaurants: allRestaurants,
      });
    }
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

export const getByIdRestaurant = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.json({ message: "Id not found!!", status: false });
    }
    const restaurant = await RestaurantModel.findOne({
      _id: id,
      isApproved: true,
    });
    if (!restaurant) {
      return res.json({ message: "Restaurant not Found!!", status: false });
    }
    return res.json({
      message: "Restaurant Found!!",
      status: true,
      restaurants: restaurant,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

export const getOwnerRestaurants = async (req, res) => {
  try {
    const ownerId = req.userId;
    if (!ownerId) {
      return res.json({ message: "Id is not there!!", status: false });
    }
    const restaurant = await RestaurantModel.find({ ownerId });
    return res.json({
      message: "Restaurant by owner:",
      status: true,
      restaurant: restaurant,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

export const getallRestaurantsAdmin = async (req, res) => {
  try {
    const allRestaurants = await RestaurantModel.find();
    if (allRestaurants.length === 0) {
      return res.json({ message: "No restaurants found!!", status: false });
    }
    return res.json({
      message: "All restaurants found!!",
      status: true,
      allRestaurants: allRestaurants,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

export const PendingRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find({
      isApproved: false,
      isOpen: true,
    });
    if (restaurants.length === 0) {
      return res.json({
        message: "No Pending Restaurants there!!",
        status: true,
        pendingRestaurants: restaurants,
      });
    }
    return res.json({
      message: "Pending Restaurants:",
      status: true,
      pendingRestaurants: restaurants,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

export const ApproveRestaurants = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.json({ message: "Id not Found!!", status: false });
    }
    const approvedRestaurant = await RestaurantModel.findByIdAndUpdate(
      id,
      { isApproved: true, isOpen: true },
      { new: true },
    );
    return res.json({
      message: "Restaurant is Approved Now!!",
      status: true,
      approvedRestaurant: approvedRestaurant,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

export const BlockRestaurants = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.json({ message: "Id not Found!!", status: false });
    }
    const blockedRestaurant = await RestaurantModel.findByIdAndUpdate(
      id,
      { isOpen: false },
      { new: true },
    );
    return res.json({
      message: "Restaurant is blocked Now!!",
      status: true,
      blockedRestaurant: blockedRestaurant,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

export const UnBlockRestaurants = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.json({ message: "Id not Found!!", status: false });
    }
    const unblockedRestaurant = await RestaurantModel.findByIdAndUpdate(
      id,
      { isOpen: true },
      { new: true },
    );
    return res.json({
      message: "Restaurant is unblocked Now!!",
      status: true,
      unblockedRestaurant: unblockedRestaurant,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};
