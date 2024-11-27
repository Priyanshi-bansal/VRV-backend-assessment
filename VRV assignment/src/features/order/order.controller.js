
import OrderRepository from "./order.repository.js";

export default class OrderController{
    constructor(){
        this.orderRepository = new OrderRepository()
    }

    async placeOrder(req, res, next){
        try {
            const userID = req.userID;

            console.log(userID)
            // console.log(req)
            await this.orderRepository.placeOrder(userID);
            res.status(201).send("order is created");
        } catch (error) {
            console.log(error);
            return res.status(200).send("Something went wrong");
        }
    }
}