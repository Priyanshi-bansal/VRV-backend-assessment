import mongoose from "mongoose";

export const cartItemSchema = new mongoose.Schema({
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Auth'
    },
    quantity:Number
})