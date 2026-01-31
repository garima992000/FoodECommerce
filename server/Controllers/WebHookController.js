import Stripe from "stripe";
import dotenv from "dotenv";
import CartModel from "../Schemas/CartSchema.js";
import OrderModel from "../Schemas/OrderSchema.js";
import UserModel from "../Schemas/UserAdminSchema.js";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_KEY);
console.log(process.env.ENDPOINT_SECRET);
export const stripeWebHook = async (req, res) => {
 let event;
  const sig = req.headers["stripe-signature"];

  try {
   event = stripe.webhooks.constructEvent(
  req.body,              // Buffer ✅
  sig,
  'whsec_EIL9R0JgTs2n29exqMQzvKYNJEa28sIJ'
);

  } catch (err) {
    console.log("Webhook signature verification failed", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  console.log("🔥 Stripe event:", event); 
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if(session.mode==='payment'){
      const { userId, restaurantId, cartId } = session.metadata;
    const cart = await CartModel.findById(cartId);
    if (!cart) return;
    await OrderModel.create({
      userId,
      restaurantId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      paymentMethod: "CARD",
      paymentStatus: "PAID",
      orderStatus: "PLACED",
    });
    await CartModel.findByIdAndDelete(cartId);
    }

    if(session.mode==='subscription'){
      const{userId,plan}=session.metadata;

      await UserModel.findByIdAndUpdate(userId,{
        subscriptionPlan:plan,
        subscriptionActive:true,
        subscriptionStartedAt:new Date()
      })
    }
    

    console.log("✅ Order created via webhook");
  }
  res.json({ received: true });
};
