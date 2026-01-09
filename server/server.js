import app from './app.js';
import './Config/db.js'
import dotenv from 'dotenv';
dotenv.config();

const PORT=process.env.PORT||3001;

app.listen(PORT,()=>{console.log(`Server connected to Port: ${PORT}`)})