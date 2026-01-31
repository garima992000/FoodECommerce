import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";
import CartModel from "../Schemas/CartSchema.js";
import RestaurantModel from "../Schemas/RestaurantSchema.js";
import MenuModel from "../Schemas/MenuSchema.js";
import UserModel from "../Schemas/UserAdminSchema.js";

const stripe = new Stripe(process.env.STRIPE_KEY);

export const createCheckOut = async (req, res) => {
  try {
    const userId = req.userId;
    const cart = await CartModel.findOne({ userId: userId });
    if (!cart) {
      return res.json({ message: "Cart is Empty!!", status: false });
    }
    if (!cart.items || cart.items.length === 0) {
      return res.json({ message: "Cart has no items", status: false });
    }
    const restaurant = await RestaurantModel.findById(
      cart.restaurantId,
    );
    if (!restaurant) {
      return res.json({ message: "Restaurant not found!!", status: false });
    }
    if (restaurant.isApproved === false) {
      return res.json({
        message: "Restaurant is not approved yet!!",
        status: false,
      });
    }
    if (restaurant.isOpen === false) {
      return res.json({
        message: "Restaurant is not opened yet!!",
        status: false,
      });
    }

    for (const item of cart.items) {
      let food = await MenuModel.findById(  item.foodId );
      if (!food) {
        return res.json({ message: "Cart is Stale!!", status: false });
      }
      if (food.isAvailable === false) {
        return res.json({
          message: `${food.name} is not available now !!`,
          status: false,
        });
      }
    }
    const user=await UserModel.findById(userId);
    let discount=0;
    if(user.subscriptionPlan==='BASIC') discount=0.1;
    if(user.subscriptionPlan==='ADVANCED') discount=0.5;

    const line_items = cart.items.map((item) => {
      const finalPrice=item.price-item.price*discount;
      return {price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(finalPrice * 100),
      },
      quantity: item.quantity,
    }
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/myorders",
      cancel_url: "http://localhost:5173/Cancel",
      metadata:{
        userId:userId.toString(),
        restaurantId:cart.restaurantId.toString(),
        cartId:cart._id.toString()
      }
    });
    return res.json({ url: session.url });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

export const createSubscriptionCheckout=async(req,res)=>{
  try {
   
    const userId=req.userId;
    const {plan}=req.body;
    
    if(!['basic','advanced'].includes(plan)){
      return res.json({message:'Plan not Valid'})
    }

    const user=await UserModel.findById(userId);
    if(!user){
      return res.json({message:'User not found!!',status:false})
    }

    const PLAN_PRICE={
      basic:process.env.STRIPE_BASIC_PRICE_ID,
      advanced:process.env.STRIPE_ADVANCED_PRICE_ID
    }

    const session=await stripe.checkout.sessions.create({
      mode:'subscription',
      payment_method_types:['card'],
      customer_email:user.email,
      line_items:[{
        price:PLAN_PRICE[plan],
        quantity:1
      }],
      success_url:'http://localhost:5173/',
      cancel_url:'http://localhost:5173/subscription',
      metadata:{
        userId:userId.toString(),
        plan
      }
    })
    return res.json({status:true,url:session.url})
  } catch (error) {
    return res.json({message:error.message,status:false})
  }
}