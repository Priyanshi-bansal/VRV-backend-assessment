import CartItemModel from "./cartItems.model.js";
import CartItemRepository from "./cartItems.repository.js";
export class CartItemsController {
    constructor(){
        this.cartItemRepository = new CartItemRepository();
      }

    async add(req, res) {
        try{
        const { productID, quantity } = req.body;
        const userID = req.userID;
        const createdCartItem = await  this.cartItemRepository.add(userID, productID, quantity);
        res.status(201).send({"Cart Updated Successfully":createdCartItem});
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
          }
    }

    async get(req, res){
        try{
            const userID = req.userID;
            const items = await this.cartItemRepository.get(userID);
            res.status(200).send(items);
          } catch(err){
          console.log(err);
          return res.status(200).send("Something went wrong");
         } 
    }

    async delete(req, res) {
        const userID = req.userID;
        const cartItemID = req.params.id;
        const isDeleted = await this.cartItemRepository.delete(
            userID,
            cartItemID
            
        );
        console.log(isDeleted);
        if (!isDeleted) {
            return res.status(404).send("Item not found");
        }
        return res
        .status(200)
        .send('Cart item is removed');
    }
}