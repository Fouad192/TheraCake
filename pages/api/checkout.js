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
      alert(err.message);
    }
  } else if(req.method === 'PUT') {
   await dbConnect();
   const toBeSet = JSON.parse(req.body);
      OrderCheckout.findOneAndUpdate({_id: toBeSet[1]}, {status: toBeSet[0]}, {new: true}, (err, doc) => {
        if(err) {
          console.log(err)
        }
        console.log(doc)
      })
      res.status(200).json({message: toBeSet[0]})
    
  } else if(req.method === 'DELETE') {
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
