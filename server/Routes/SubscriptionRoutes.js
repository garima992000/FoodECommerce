import express from 'express';
import { Auth } from '../Middlewares/Auth';
import { upgradeSubscription } from '../Controllers/SubscriptionController';
const routes=express.Router();

routes.post('/subscription/upgrade',Auth,upgradeSubscription);

export default routes;