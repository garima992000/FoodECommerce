import mongoose from 'mongoose';

const RestaurantSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    cuisineTypes:{
        type:[String],
        required:true
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      }
    },
    isOpen:{
        type:Boolean,
      default:true,
      enum:[true,false]
    },
    deliveryTime:{
        type:Number,
        required:true
    },
    rating:{
        type:Number
    },
    isApproved:{
       type:Boolean,
      default:false,
      enum:[true,false] 
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
    },{timestamps:true})

    const RestaurantModel=mongoose.model('restaurant',RestaurantSchema);

    export default RestaurantModel;