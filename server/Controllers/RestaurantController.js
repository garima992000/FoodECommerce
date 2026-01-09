import RestaurantModel from "../Schemas/RestaurantSchema.js";

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
    const allRestaurants = await RestaurantModel.find({ isApproved: true });
    if (allRestaurants.length === 0) {
      return res.json({ message: "No Restaurants Found!!", status: false });
    }

    return res.json({
      message: "Got all Restaurants!!",
      status: true,
      allRestaurants: allRestaurants,
    });
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
    if(!restaurant){
      return res.json({message:"Restaurant not Found!!",status:false})
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
    const restaurants = await RestaurantModel.find({ isApproved: false });
    if (restaurants.length===0) {
      return res.json({
        message: "No Pending Restaurants there!!",
        status: false,
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
      { isApproved: true },
      { new: true }
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
      { isApproved: false, isOpen: false },
      { new: true }
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

export const UnBlockRestaurants=async(req,res)=>{
  try {
    const id = req.params.id;
    if (!id) {
      return res.json({ message: "Id not Found!!", status: false });
    }
    const unblockedRestaurant = await RestaurantModel.findByIdAndUpdate(
      id,
      { isApproved: true, isOpen: true },
      { new: true }
    );
    return res.json({
      message: "Restaurant is unblocked Now!!",
      status: true,
      unblockedRestaurant: unblockedRestaurant,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
}
