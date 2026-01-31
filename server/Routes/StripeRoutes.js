import express from 'express';
import { createCheckOut, createSubscriptionCheckout } from '../Controllers/StripeController.js';
import { Auth } from '../Middlewares/Auth.js';
import { stripeWebHook } from '../Controllers/WebHookController.js';
const routes=express.Router();

routes.post('/create-checkout-session',Auth,createCheckOut);
routes.post('/webhook/stripe',express.raw({ type:"application/json" }),stripeWebHook)

routes.post('/subscription',Auth,createSubscriptionCheckout);
export default routes;