import CartModel from '../Schemas/CartSchema.js';
import RestaurantModel from "../Schemas/RestaurantSchema.js";

export const placeOrder=async(req,res)=>{
    try {
        const userId=req.userId;
        const cart=await CartModel.findOne({userId});
        if(!cart){
            return res.json({message:'Cart is empty. Cannot place order.',status:false})
        }
        const restaurant=await RestaurantModel.findOne({_id:cart.restaurantId});
        if(!restaurant){
            return res.json({message:"Restaurant not found!!",status:false})
        }
        if(restaurant.isApproved===false){
            return res.json({message:"Restaurant not Approved!!",status:false})
        }
        if(restaurant.isOpen===false){
            return res.json({message:"Restaurant not Open!!",status:false})
        }
        console.log(cart);
    } catch (error) {
        return res.json({message:error.message,status:false})
    }
}