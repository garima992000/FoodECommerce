export const create = async (req, res) => {
  try {
    const { name,desc, cuisineTypes, address,deliveryTime,rating} = req.body;
    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      return res.json({ message: "User Already Exists!!", status: false });
    }
    const checkPhone = await UserModel.findOne({ phone });
    if (checkPhone) {
      return res.json({
        message: "Same Phone number is already there!!",
        status: false,
      });
    }
    const newUser = new UserModel({
      name,
      email,
      phone,
      password,
      address,
      
    });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    return res.json({
      message: "Successfully registered!!",
      status: true,
      user: newUser,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};