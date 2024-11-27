import mongoose from "mongoose";
import { authSchema } from "./auth.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

const AuthModel = mongoose.model("Auth", authSchema);

export default class AuthRepository {

    async resetPassword(userID, hashedPassword){
        try {
            let user = await AuthModel.findById(userID);
            if(user){
                user.password = hashedPassword;
                await user.save()
            }else{
                throw new Error("no such user found")
            }
            
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

  async signUp(user) {
    try {
      // create instance of model
      const newUser = new AuthModel(user);
      await newUser.save();
      return newUser;
    } catch (err) {
      if(err instanceof mongoose.Error.ValidationError){
        throw err;
      }else{
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
      }
    }
  }

  async signIn() {
    try {
        // create instance of model
        return  await AuthModel.findOne({email, password})
      } catch (err) {
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
      }
  }

  async findByEmail(email) {
    try{
    return await AuthModel.findOne({email});
    } catch(err){
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
