import mongoose from "mongoose";
export default class ProductModel {
  constructor(
    name,
    desc,
    price,
    imageUrl,
    category,
    sizes,
    inStock = 0
  ) {
    // this._id = id ? new mongoose.Types.ObjectId(id) : null; 
    this.name = name || "";
    this.desc = desc || "";
    this.imageUrl = imageUrl || "";
    this.category = category || "";
    this.price = price || 0;
    this.sizes = sizes || [];
    this.inStock = inStock; // Default value 0 if not provided
  }
}
  
  
var products = [
  new ProductModel(
    1,
    'Product 1',
    'Description for Product 10',
    19.99,
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    'Category1'
  ),
  new ProductModel(
    2,
    'Product 2',
    'Description for Product 2',
    29.99,
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    'Category2',
    ['M', 'XL']
  ),
  new ProductModel(
    3,
    'Product 3',
    'Description for Product 3',
    39.99,
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    'Category3',
    ['M', 'XL', 'S']
  ),
];
