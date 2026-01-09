import express from 'express';
import { blockUser, getAllUsers, login, me, register, unblockUser, update, viewUser } from '../Controllers/UserAdmin.js';
import { isAdmin } from '../Middlewares/RoleCheck.js';
import { Auth } from '../Middlewares/Auth.js';
const routes=express.Router();

//USER
routes.post('/auth/register',register); //user register
routes.post('/auth/login',login); //login user
routes.get('/auth/me',Auth,me);  //own profile
routes.patch('/auth/update',Auth,update); //update user profile

//ADMIN
routes.get('/admin/users',Auth,isAdmin,getAllUsers); //see all users
routes.get('/admin/users/:userId',Auth,isAdmin,viewUser); //view single user
routes.patch('/admin/users/:userId/block',Auth,isAdmin,blockUser);//block user
routes.patch('/admin/users/:userId/unblock',Auth,isAdmin,unblockUser);//unblock user
export default routes;