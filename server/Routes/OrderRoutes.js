import express from 'express';
import { placeOrder } from '../Controllers/OrderController.js';
import {Auth} from '../Middlewares/Auth.js'
const routes=express.Router();

routes.post('/orders',Auth,placeOrder);

export default routes;