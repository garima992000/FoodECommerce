import UserModel from "../Schemas/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, phone, password, address} = req.body;
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await UserModel.findOne({ email });
    if (!checkEmail) {
      return res.json({
        message: "Email entered is Incorrect!!",
        status: false,
      });
    }
    const checkPassword = await bcrypt.compare(password, checkEmail.password);
    if (!checkPassword) {
      return res.json({
        message: "Password entered is Incorrect!!",
        status: false,
      });
    }
    const jwtToken = jwt.sign(
      { id: checkEmail._id, email: checkEmail.email},
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.json({
      message: "Successfully Logged In !!",
      status: true,
      jwtToken,
      name: checkEmail.name,
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const me=async(req,res)=>{
    const id=req.userId;
    const user=await UserModel.findById(id);
    if(!user){
        return res.json({message:"User Not Found !!",status:false})
    }
    return res.json({message:"User Found!!",status:true,user:user})
}

export const update=async(req,res)=>{
  try {
    const id=req.userId;
    if(!id){
      return res.json({message:'Id not Found!!',status:false})
    }
    const user=await UserModel.findByIdAndUpdate(id,req.body,{new:true});
    return res.json({message:'User Updated!!',status:true,user:user})
  } catch (error) {
    return res.json({message:error.message,status:false})
  }
}
