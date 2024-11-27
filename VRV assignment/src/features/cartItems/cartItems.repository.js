
import { ApplicationError } from "../../error-handler/applicationError.js";
import mongoose from "mongoose";
import { authSchema } from "../auth/auth.schema.js";
import { cartItemSchema } from "./cartItem.schema.js";

const CartItemModel = mongoose.model("CartItem", cartItemSchema);
const AuthModel = mongoose.model('Auth', authSchema);

class CartItemRepository {
  async add(userID, productID, quantity) {
    try {
      const cartItem = await CartItemModel.findOneAndUpdate(
        { userID:new mongoose.Types.ObjectId(userID), productID: new mongoose.Types.ObjectId(productID) },
        {
          $inc: { quantity: quantity }, // Increment quantity
        },
        { upsert: true, new: true, setDefaultsOnInsert: true } // Upsert and return the updated document
      );
      return cartItem;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async get(userID) {
    try {
      const items = await CartItemModel.find({ userID:new mongoose.Types.ObjectId(userID) }).populate("productID");
      return items;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async delete(userID, cartItemID) {
    try {
      const result = await CartItemModel.deleteOne({
        _id:new mongoose.Types.ObjectId(cartItemID),
        userID:new mongoose.Types.ObjectId(userID),
      });

      return result.deletedCount > 0;
    } catch (err) {
      console.error(err);
      throw new ApplicationError("Failed to delete cart item", 500);
    }
  }

}

export default CartItemRepository;
