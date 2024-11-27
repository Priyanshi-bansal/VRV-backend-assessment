import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category:String,
    description: { type: String, default: "" },
    inStock: { type: Number, default: 0 },
    sizes: [String],
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});