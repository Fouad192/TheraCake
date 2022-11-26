import dbConnect from "../../lib/dbConnect";
import Cart from "../../models/cart";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        await dbConnect()
        try {
          const cartData = req.body;
          const cartItem = new Cart(cartData);
          await cartItem.save();
          res.status(201).json({ message: "Cart Item Inserted!" });
        } catch (err) {
          console.log(err.message);
        }
    } else if (req.method === "DELETE") {
      await dbConnect();
      try {
        const id = req.body;
      
        await Cart.findByIdAndDelete(id);
        res.status(200).json({ message: `${id} item deleted` });
      } catch (err) {
        console.log(err);
      }
    }
} 