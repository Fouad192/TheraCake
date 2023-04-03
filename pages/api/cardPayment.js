import dbConnect from "../../lib/dbConnect";
import OrderCheckout from "../../models/order";
async function handleCardPayment(req, res) {
  await dbConnect();
  if (req?.method === "POST") {
    let paymobAPIData = req.body.obj;
    if (paymobAPIData.success === true) {
      await OrderCheckout.findOneAndUpdate(
        { paymobId: paymobAPIData.order.id },
        { paid: true, transactionId: paymobAPIData.id },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log(err);
          }
        }
      );
      res.status(201).json({ message: "Success" });
    } else if (paymobAPIData.success === false) {
      await OrderCheckout.findOneAndDelete(
        { paymobId: paymobAPIData.order.id },
        (err, doc) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    res.status(201).json({ message: "Payment failed" });
  }

}
export default handleCardPayment;
