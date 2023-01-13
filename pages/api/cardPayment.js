import dbConnect from "../../lib/dbConnect";
import OrderCheckout from "../../models/order";
import emailjs from '@emailjs/browser'
async function handleCardPayment(req, res) {
  await dbConnect()
  if (req?.method === "POST" && req?.body.type !== "orderItems") {
    let paymobAPIData = req.body.obj;
    res.status(201).json({ message: 'Success' });
  

    if (paymobAPIData.success === true) {
     
      OrderCheckout.findOneAndUpdate(
        { paymobId: paymobAPIData.order.id },
        { paid: true, transactionId: paymobAPIData.id },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log(err);
          }
        }
      );
    } else if (paymobAPIData.success === false) {
      OrderCheckout.findOneAndDelete(
        { paymobId: paymobAPIData.order.id },
        (err, doc) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  }
  if (req?.method === "POST" && req.body.type === "orderItems") {
    const checkoutdetails = new OrderCheckout(req.body.dataItems);
    await checkoutdetails.save();
    res.status(201).json({ message: "data" });
    
  }
}
export default handleCardPayment;
