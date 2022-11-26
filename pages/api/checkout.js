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
    } catch (err) {
      console.log(err.message);
    }
  }
}
