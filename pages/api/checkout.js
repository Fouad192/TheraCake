import dbConnect from "../../lib/dbConnect";
import OrderCheckout from "../../models/order";
export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();
    try {
      const orderCheckoutDetails = req.body;

      const checkoutdetails = new OrderCheckout(orderCheckoutDetails);
      await checkoutdetails.save();
      res.status(201).json({ message: "Checked out!" });
    } catch ({ errors }) {
      const errorsArr = [];
      if (errors.totalPrice) {
        errorsArr.push(errors.totalPrice.message);
      }
      if (errors.scheduled) {
        errorsArr.push(errors.scheduled.message);
      }

      if (errors.area) {
        errorsArr.push(errors.area.message);
      }
      if (errors.city) {
        errorsArr.push(errors.city.message);
      }
      if (errors.email) {
        errorsArr.push(errors.email.message);
      }
      if (errors.mobile) {
        errorsArr.push(errors.mobile.message);
      }
      if (errors.firstName) {
        errorsArr.push(errors.firstName.message);
      }
      if (errors.lastName) {
        errorsArr.push(errors.lastName.message);
      }
      res.status(400).send({ errorMessages: errorsArr });
    }
  } else if (req.method === "PUT") {
    await dbConnect();
    const toBeSet = JSON.parse(req.body);
    OrderCheckout.findOneAndUpdate(
      { _id: toBeSet[1] },
      { status: toBeSet[0] },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log(err);
        }
        console.log(doc);
      }
    );
    res.status(200).json({ message: toBeSet[0] });
  } else if (req.method === "DELETE") {
    await dbConnect();
    try {
      const id = req.body;

      await OrderCheckout.findByIdAndDelete(id);
      res.status(200).json({ message: `${id} order deleted` });
    } catch (err) {
      console.log(err);
    }
  }
}
