import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth", // Assuming there's a User model
        required: true,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
      timeStamp: {
        type: Date,
        default: Date.now, // Default to current date/time if not provided
      },
})