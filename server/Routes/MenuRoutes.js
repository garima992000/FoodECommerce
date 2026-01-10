import express from 'express';
const routes=express.Router();
import { isRestaurantOwner } from '../Middlewares/IsRestaurantOwner.js';
import { Auth } from '../Middlewares/Auth.js';
import { AddFood, deleteFood, getFood, getMenu, ToggleAvailabilty, updateFood } from '../Controllers/MenuController.js';

//for restaurant owner
routes.post('/restaurants/:restaurantId/foods',Auth,isRestaurantOwner,AddFood);
routes.get('/restaurants/:restaurantId/foods',Auth,isRestaurantOwner,getFood);
routes.patch('/foods/:foodId',Auth,isRestaurantOwner,updateFood);
routes.patch('/foods/:foodId/availability',Auth,isRestaurantOwner,ToggleAvailabilty);
routes.delete('/foods/:foodId',Auth,isRestaurantOwner,deleteFood);
//for users
routes.get('/restaurants/:restaurantId/menu',getMenu)
export default routes