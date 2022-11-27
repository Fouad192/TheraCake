import mongoose from "mongoose";
let Schema = mongoose.Schema;

let orderDetails = new Schema({
  orderNumber: {
    type: String,
  },
  orderItems: {
    type: [],
  },
  dateSubmitted: {
    type: Number,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  backupMobile: {
    type: Number,
  },
  email: {
    type: String,
  },
  governorate: {
    type: String,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  building: {
    type: String,
  },
  floor: {
    type: String,
  },
  apartment: {
    type: String,
  },
  dateScheduled: {
    type: String,
  },
  villa: {
    type: String,
  },
  company: {
    type: String,
  },
  instructions: {
    type: String,
  },
  scheduled: {
    type: String,
  },
  status: {
    type: String,
    default: 'Pending'
  }
});

mongoose.models = {};

let OrderCheckout =
  mongoose.models.OrderCheckout ||
  mongoose.model("OrderCheckout", orderDetails);
export default OrderCheckout;
