import mongoose from 'mongoose';

const CartItemSchema=new mongoose.Schema({
    foodId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'menu',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        min:1,
        required:true
    }

},{_id:false})

const CartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
        unique:true
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'restaurant',
        required:true
    },
    items:{
        type:[CartItemSchema],
        default:[]
    },
    totalAmount:{
        type:Number,
        required:true,
        default:0
    },
    originalAmount:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
        required:true
    }
},{timestamps:true})

const CartModel=mongoose.model('cart',CartSchema);

export default CartModel;