import mongoose from "mongoose";

export const authSchema = new mongoose.Schema({
    name: { type: String,maxLength:[25, "Name can't be greater than 25 characters"]},
    email:{type:String, unique:true, required:true,
        match:[/.+\@.+\../,"Please enter a valid email"]
    },
    password: {type: String},
    role:{type:String},
    // role:{type:String, enum:['Admin', 'User', 'Moderator'], default: 'User' }
})