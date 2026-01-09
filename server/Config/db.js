import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://admin:admin123@cluster0.h9fzijr.mongodb.net/food?appName=Cluster0')
.then(()=>{console.log('MONGODB is Connected !!')})
.catch((err)=>{console.log(err)})