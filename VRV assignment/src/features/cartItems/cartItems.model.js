
export default class CartItemModel{
    constructor(productID, userID, quantity, id){
        this._id = id;
        this.productID = productID;
        this.userID = userID;
        this.quantity = quantity;
        
    }
}

var cartItems = [
    new CartItemModel(1,2,1,1),
    new CartItemModel(1,1,2,1),
];