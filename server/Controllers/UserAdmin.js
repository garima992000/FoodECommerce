
import UserModel from "../Schemas/UserAdminSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, phone, password, address,role} = req.body;
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
      role
      
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

    if(checkEmail.isActive===false){
      return res.json({message:'Your Account is Blocked!!',status:false})
    }
    const jwtToken = jwt.sign(
      { id: checkEmail._id, email: checkEmail.email,role:checkEmail.role},
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.json({
      message: "Successfully Logged In !!",
      status: true,
      jwtToken,
      name: checkEmail.name,
      role:checkEmail.role
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

export const getAllUsers=async(req,res)=>{
  const searchedText=req.query.search;
  try {
    if(!searchedText){
      const allUsers=await UserModel.find({role:'user'});
    if(allUsers.length===0){
      return res.json({message:"No User Found!!",status:false})
    }
    return res.json({message:"All Users Found!!",status:true,allUsers:allUsers})
    }
    const normalizedSearch=searchedText.trim().toLowerCase().replace(/\s+/,'');
    console.log(normalizedSearch);
    const allUsers=await UserModel.find({role:'user',name:{
      $regex:normalizedSearch.split('').join('\\s*'),
      $options:'i'
    }});
    if(allUsers.length===0){
      return res.json({message:"No User Found!!",status:false})
    }
    return res.json({message:"All Users Found!!",status:true,allUsers:allUsers})
    
  } catch (error) {
    return res.json({message:error.message,status:false})
  }
}

export const viewUser=async(req,res)=>{
  try {
    const id=req.params.userId;
    if(!id){
      return res.json({message:'Id not found',status:false})
    }
    const user=await UserModel.findById(id)
    return res.json({message:'User:',user:user,status:true})
  } catch (error) {
    return res.json({message:error.message,status:false})
  }
}

export const blockUser=async(req,res)=>{
  try {
    const id=req.params.userId;
    if(!id){
      return res.json({message:'Id not found!!',status:false})
    }
    const changedUser=await UserModel.findByIdAndUpdate(id,{isActive:false},{new:true});
    return res.json({message:'User Blocked !!',status:true,changedUser:changedUser})
  } catch (error) {
    return res.json({message:error.message,status:false})
  }
}

export const unblockUser=async(req,res)=>{
  try {
    const id=req.params.userId;
    if(!id){
      return res.json({message:'Id not found!!',status:false})
    }
    const changedUser=await UserModel.findByIdAndUpdate(id,{isActive:true},{new:true});
    return res.json({message:'User UnBlocked !!',status:true,user:changedUser})
  } catch (error) {
    return res.json({message:error.message,status:false})
  }
}