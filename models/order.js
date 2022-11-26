import mongoose from "mongoose";
let Schema = mongoose.Schema;


let orderDetails = new Schema({
    orderNumber: {
        type: String,
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
    // required: true,
  },
  toppings: {
    type: [],
  },
  extraPrice: {
    type: [],
  },
  quantity: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true
  }, 
  dateSubmitted: {

  },
  dateScheduled: {
    
  }
  // giftPrice: {
  //   type: []
  // }
});

mongoose.models = {};

let OrderCheckout = mongoose.models.OrderCheckout || mongoose.model("OrderCheckout", orderDetails);
export default OrderCheckout
