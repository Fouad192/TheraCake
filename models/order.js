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
  transactionId: {
    type: Number,
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
    required: true,
  },
  dateSubmitted: {
    type: Number,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  backupMobile: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  governorate: {
    type: String,
    default: "Cairo",
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
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
  instructions: {
    type: String,
  },
  scheduled: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

mongoose.models = {};

let OrderCheckout =
  mongoose.models.OrderCheckout ||
  mongoose.model("OrderCheckout", orderDetails);
export default OrderCheckout;
