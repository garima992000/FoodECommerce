import UserModel from "../Schemas/UserAdminSchema.js";

export const isAdmin = async (req, res, next) => {
  try {
    const id = req.userId;
    if (!id) {
      return res.json({ message: "UnAuthorized Access", status: false });
    }
    const user = await UserModel.findById(id);
    if (!user) {
      return res.json({ message: "User not found!!", status: false });
    }
    if (!user.isActive) {
      return res.json({ message: "User is blocked!!", status: false });
    }
    if (user.role !== "admin") {
      return res.json({ message: "Access Denied!!", status: false });
    }
    next();
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};
