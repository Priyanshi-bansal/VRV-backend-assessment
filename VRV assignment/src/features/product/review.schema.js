
import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Auth'
    },
   rating:Number
})