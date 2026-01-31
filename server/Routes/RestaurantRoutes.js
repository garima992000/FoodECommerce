import express from 'express';
import { ApproveRestaurants, BlockRestaurants, createRestaurant, getallRestaurants, getallRestaurantsAdmin, getByIdRestaurant, getOwnerRestaurants, PendingRestaurants, UnBlockRestaurants } from '../Controllers/RestaurantController.js';
import { isRestaurantOwner } from '../Middlewares/IsRestaurantOwner.js';
import { Auth } from '../Middlewares/Auth.js';
import { isAdmin } from '../Middlewares/RoleCheck.js';
const routes =express.Router();

routes.post('/restaurants',Auth,isRestaurantOwner,createRestaurant);
//for restaurant owner
routes.get('/restaurants/my',Auth,isRestaurantOwner,getOwnerRestaurants)
//for users
routes.get('/restaurants',Auth,getallRestaurants)
routes.get('/restaurants/:id',getByIdRestaurant);
//for admin
routes.get('/admin/restaurants',Auth,isAdmin,getallRestaurantsAdmin)
routes.get('/admin/restaurants/pending',Auth,isAdmin,PendingRestaurants)
routes.patch('/admin/restaurants/:id/approve',Auth,isAdmin,ApproveRestaurants);
routes.patch('/admin/restaurants/:id/block',Auth,isAdmin,BlockRestaurants);
routes.patch('/admin/restaurants/:id/unblock',Auth,isAdmin,UnBlockRestaurants)

export default routes;