import express from 'express';
import { Auth } from '../Middlewares/Auth.js';
import { addToCart, deleteItem, getCart, RemoveCart, updateCart } from '../Controllers/CartController.js';
const routes=express.Router();

routes.post('/cart/add',Auth,addToCart);
routes.get('/cart',Auth,getCart);
routes.patch('/cart/item/:foodId',Auth,updateCart);
routes.delete('/cart/item/:foodId',Auth,deleteItem);
routes.delete('/cart/clear',Auth,RemoveCart);
export default routes;