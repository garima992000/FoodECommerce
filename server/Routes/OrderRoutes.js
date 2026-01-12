import express from 'express';
import { getMyOrders, getRestaurantOrders, placeOrder, updateOrder } from '../Controllers/OrderController.js';
import {Auth} from '../Middlewares/Auth.js'
import { isRestaurantOwner } from '../Middlewares/IsRestaurantOwner.js';
const routes=express.Router();

routes.post('/orders',Auth,placeOrder);
routes.get('/orders/my',Auth,getMyOrders);
routes.get('/restaurant/orders',Auth,isRestaurantOwner,getRestaurantOrders);
routes.patch('/orders/:orderId/status',Auth,isRestaurantOwner,updateOrder)
export default routes;