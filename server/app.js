import express from 'express';
import cors from 'cors';
import UserRoutes from './Routes/routes.js'
const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/food',UserRoutes)
app.get('/',(req,res)=>{
    res.send('WELCOME')
})

export default app;
