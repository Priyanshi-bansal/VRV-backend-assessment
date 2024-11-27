
import { ApplicationError } from "../../error-handler/applicationError.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";

const ProductModel = mongoose.model("Product", productSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);

class ProductRepository {

  async add(newProduct) {
    try {
      const product = new ProductModel(newProduct);
      await product.save();
      return product;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getAll() {
    try {
      const products = await ProductModel.find();
      console.log(products);
      return products;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async get(id) {
    try {
      return await ProductModel.findById({ _id: new mongoose.Types.ObjectId(id) });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async filter(minPrice, maxPrice, category) {
    try {
    const filterExpression = {
        price: { $gte: minPrice, $lte: maxPrice },
      };
      if (category) {
        filterExpression.category = category;
      }
      return await ProductModel.find(filterExpression);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async rate(userID, productID, rating) {
    try {
      //1. check if product exist or not
      const productToUpdate = await ProductModel.findById(new mongoose.Types.ObjectId(productID));
      if (!productToUpdate) {
        throw new Error("Product not found");
      }
      //2. check the existing review
      const userReview = await ReviewModel.findOne({
        product: new mongoose.Types.ObjectId(productID),
        user: new mongoose.Types.ObjectId(userID),
      });
      if (userReview) {
        userReview.rating = rating;
        await userReview.save();
      } else {
        const newReview = new ReviewModel({
          product: new mongoose.Types.ObjectId(productID),
          user: new mongoose.Types.ObjectId(userID),
          rating: rating,
        });
        newReview.save();
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}

export default ProductRepository;
