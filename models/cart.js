import mongoose from "mongoose";
let Schema = mongoose.Schema;

let cart = new Schema({
quantity: {
    type: Number,
    required: true
},
  name: {
    type: String,
    required: true,
  },
  sizePrice: {
    type: [],
  },
  flavors: {
    type: [],
  },
  toppings: {
    type: [],
  },
  extraPrice: {
    type: [],
  },
  notes: {
    type: String
  },

  giftPrice: {
    type: []
  }
});

mongoose.models = {};

let Cart = mongoose.models.Cart || mongoose.model("Cart", cart);

export default Cart;
