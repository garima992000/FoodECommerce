import express from 'express';
import { createCheckOut } from '../Controllers/StripeController.js';
import { Auth } from '../Middlewares/Auth.js';
import { stripeWebHook } from '../Controllers/WebHookController.js';
const routes=express.Router();

routes.post('/create-checkout-session',Auth,createCheckOut);
routes.post('/webhook/stripe',express.raw({ type:"application/json" }),stripeWebHook)

export default routes;