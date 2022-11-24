import mongoose from "mongoose";
let Schema = mongoose.Schema;

let menuItem = new Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
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
  img: {
    type: String,
    required: true,
  },
  extraPrice: {
    type: [],
  },
  // giftPrice: {
  //   type: []
  // }
});

mongoose.models = {};

let MenuItem = mongoose.models.MenuItem || mongoose.model("MenuItem", menuItem);

export default MenuItem;
