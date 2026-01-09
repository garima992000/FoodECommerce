import express from 'express';
import { login, me, register, update } from '../Controllers/User.js';
import Auth from '../Middlewares/Auth.js';
const routes=express.Router();

routes.post('/auth/register',register);
routes.post('/auth/login',login);
routes.get('/auth/me',Auth,me)
routes.patch('/auth/update',Auth,update)
export default routes;