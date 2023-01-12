import mongoose from "mongoose";
let Schema = mongoose.Schema;

let orderDetails = new Schema({
  userId: {
    type: String,
    // required: true
  },
  paymobId: {
    type: Number,
  },
  paymentMethod: {
    type: String,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  addressType: {
    type: String,
  },
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
    default: "Cairo",
  },
  city: {
    type: String,
  },
  area: {
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
    default: "Pending",
  },
  totalPrice: {
    type: Number,
  },
});

mongoose.models = {};

let OrderCheckout =
  mongoose.models.OrderCheckout ||
  mongoose.model("OrderCheckout", orderDetails);
export default OrderCheckout;
