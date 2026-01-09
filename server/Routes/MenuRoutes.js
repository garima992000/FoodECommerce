import express from 'express';
const routes=express.Router();
import { isRestaurantOwner } from '../Middlewares/IsRestaurantOwner.js';
import { Auth } from '../Middlewares/Auth.js';
import { AddFood, getFood, updateFood } from '../Controllers/MenuController.js';

//for reastaurant owner
routes.post('/restaurants/:restaurantId/foods',Auth,isRestaurantOwner,AddFood);
routes.get('/restaurants/:restaurantId/foods',Auth,isRestaurantOwner,getFood);
routes.patch('/foods/:foodId',Auth,isRestaurantOwner,updateFood);
export default routes