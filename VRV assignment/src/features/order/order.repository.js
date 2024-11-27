import { ApplicationError } from "../../error-handler/applicationError.js";
import mongoose from 'mongoose'
import { orderSchema } from "./order.schema.js";
import { productSchema } from "../product/product.schema.js";
import { cartItemSchema } from "../cartItems/cartItem.schema.js";

const cartItemModel = new mongoose.model('CartItem', cartItemSchema)
const productModel = new mongoose.model('Product', productSchema)
const orderModel = new mongoose.model('Order', orderSchema)

export default class OrderRepository {
  async placeOrder(userID) {
    const session = await mongoose.startSession();
    try{
     
      session.startTransaction();

    //1. Get the cartitem and calculate total amount
    const items = await this.getTotalAmount(userID, session);
    const finalTotalAmount = items.reduce(
      (acc, item) => acc + item.totalAmount,
      0
    );
    console.log(finalTotalAmount);

    //2. Create an order record
    const newOrder = new orderModel({
      userID:new mongoose.Types.ObjectId(userID),
      totalAmount: finalTotalAmount,
      timeStamp: new Date(),
    });
    await newOrder.save({ session });

    //3. Reduce the stock
    for (const item of items) {
      await productModel.updateOne(
        { _id: item.productID },
        { $inc: { inStock: -item.quantity } },
        { session }
      );
    }
    //throw new Error("Something went wrong in placeOrder")
    //4. clear the cart item
    await cartItemModel.deleteMany({ userID:new mongoose.Types.ObjectId(userID) }, { session });
    await session.commitTransaction();
    session.endSession();
    return newOrder;
  }catch(err){
    await session.abortTransaction();
      session.endSession();
      console.error(err);
    throw new ApplicationError("Something went wrong with database", 500);
}
  }

  async getTotalAmount(userID, session) {
    try {
    const items = await cartItemModel.aggregate([
      // 1. Match cart items for the user
      {
        $match: { userID:new mongoose.Types.ObjectId(userID) },
      },
        // 2. Get the products form products collection.
        {
          $lookup: {
            from: "products", // MongoDB collection name for products
            localField: "productID",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        // 3. Unwind the productinfo.
        {
          $unwind: "$productInfo",
        },
        // 4. Calculate totalAmount for each cartitems.
        {
          $addFields: {
            totalAmount: {
              $multiply: ["$productInfo.price", "$quantity"],
            },
          },
        },
      ]).session(session);

      return items;
    } catch (err) {
      console.error(err);
      throw new ApplicationError("Failed to calculate the total amount", 500);
    }
  }
}
