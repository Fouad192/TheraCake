import mongoose from "mongoose";
let Schema = mongoose.Schema;

let cart = new Schema({
  userId: {
    type: String,
    // required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sizePrice: {
    type: [],
    required: true,
  },
  flavors: {
    type: [],
  },
  toppings: {
    type: [],
  },
  specialBites: {
    type: []
  },
  extraPrice: {
    type: [],
  },
  notes: {
    type: String,
  },
  // freePistachio: {
  //   type: String,
  // },
  giftPrice: {
    type: [],
  },
});

mongoose.models = {};

let Cart = mongoose.models.Cart || mongoose.model("Cart", cart);

export default Cart;
