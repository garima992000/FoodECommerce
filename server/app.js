import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import UserRoutes from './Routes/UserAdminRoutes.js'
import RestaurantRoutes from './Routes/RestaurantRoutes.js'
import MenuRoutes from './Routes/MenuRoutes.js'
import CartRoutes from './Routes/CartRoutes.js'
import OrderRoutes from './Routes/OrderRoutes.js'
const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/food',UserRoutes);
app.use('/food',RestaurantRoutes);
app.use('/food',MenuRoutes);
app.use('/food',CartRoutes);
app.use('/food',OrderRoutes)
app.get('/',(req,res)=>{
    res.send('WELCOME')
})

export default app;
