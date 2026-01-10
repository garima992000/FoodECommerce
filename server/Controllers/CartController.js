import CartModel from "../Schemas/CartSchema.js";
import MenuModel from "../Schemas/MenuSchema.js";
import RestaurantModel from "../Schemas/RestaurantSchema.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId)
    const { foodId, quantity } = req.body;

    const foodItem = await MenuModel.findById(foodId);
    if (!foodItem) {
      return res.json({ message: "Food item not found", status: false });
    }

    if (!foodItem.isAvailable) {
      return res.json({
        message: "Food item is not available",
        status: false,
      });
    }

    const restaurant = await RestaurantModel.findById(foodItem.restaurantId);
    if (!restaurant || !restaurant.isApproved) {
      return res.json({
        message: "Restaurant is not available",
        status: false,
      });
    }

    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = new CartModel({
        userId,
        restaurantId: foodItem.restaurantId,
        items: [],
        totalAmount: 0,
      });
    } else {
      if (cart.restaurantId.toString() !== foodItem.restaurantId.toString()) {
        return res.json({
          message:
            "You can order from only one restaurant at a time. Clear cart first.",
          status: false,
        });
      }
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.foodId.toString() === foodItem._id.toString()
    );

    const itemQuantity = quantity && quantity > 0 ? quantity : 1;

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += itemQuantity;
    } else {
      cart.items.push({
        foodId: foodItem._id,
        name: foodItem.name,
        price: foodItem.price,
        quantity: itemQuantity,
      });
    }

    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    return res.json({
      message: "Item added to cart successfully",
      status: true,
      cart,
    });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

export const getCart=async(req,res)=>{
    try {
        const userId=req.userId;
        const cart=await CartModel.findOne({userId});
        if(!cart){
            return res.json({message:'User has not added anything yet!!',status:false})
        }
        return res.json({message:'Success!!',restaurantId:cart.restaurantId,items:cart.items,totalAmount:cart.totalAmount})
    } catch (error) {
        return res.json({message:error.message,status:false})
    }
}

export const updateCart=async(req,res)=>{
    try {
      const userId=req.userId;
      const foodId=req.params.foodId;
      const {quantity}=req.body;
      const cart=await CartModel.findOne({userId});
      if(!cart){
        return res.json({message:'Cart does not exists!!',status:false})
      }
      
      const itemIndex=cart.items.findIndex(item=>item.foodId.toString()===foodId);
      if(itemIndex===-1){
        return res.json({message:'Food Item is not in cart!!',status:false})
      }
      cart.items[itemIndex].quantity=quantity;

      cart.totalAmount=cart.items.reduce((total,item)=>total+item.price*item.quantity,0);
      await cart.save();
      return res.json({message:'Cart is Updated Now!!',status:true,cart:cart})
    } catch (error) {
       return res.json({message:error.message,status:false}) 
    }
}

export const deleteItem=async(req,res)=>{
    try {
       const userId=req.userId;
       const foodId=req.params.foodId;
       const cart=await CartModel.findOne({userId});
       if(!cart){
       return res.json({message:'cart does not exists for this user!!',status:false}) ;
       }
       const itemIndex=cart.items.findIndex(item=>item.foodId.toString()===foodId);
       if(itemIndex===-1){
        return res.json({message:"Food Item is currently not present in the cart!!",status:false})
       }
       cart.items=cart.items.filter(item=>item.foodId.toString()!==foodId);
       cart.totalAmount=cart.items.reduce((total,item)=>total+item.price*item.quantity,0);
       await cart.save();
       return res.json({message:'Food Item removed from cart!!',status:true,cart:cart});
    } catch (error) {
        return res.json({message:error.message,status:false})
    }
}

export const RemoveCart=async(req,res)=>{
    try {
      const userId=req.userId;
      const cart=await CartModel.findOne({userId});
      if(!cart){
        return res.json({message:'Cart is already not there'})
      }
      await CartModel.findByIdAndDelete(cart._id);
      return res.json({message:'Cart removed!!',status:true})  
    } catch (error) {
        return res.json({message:error.message,status:false})
    }
}
