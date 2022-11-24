import dbConnect from "../../lib/dbConnect";
import mongoose from "mongoose";
import MenuItem from "../../models/menuItems";
export default async function handler(req, res) {
    console.log(req.body)
  if (req.method === "POST") {
    await dbConnect();
    try {
      const data = req.body;
      const menuItem = new MenuItem(data);
      await menuItem.save();
      res.status(201).json({ message: "Item Inserted!" });
    } catch (err) {
      console.log(err.message);
    }
  } if(req.method === 'DELETE') {
    await dbConnect();
    try {
      const id = req.body
      console.log(id)
      await MenuItem.findByIdAndDelete(id)
      res.status(200).json({message: `${id} item deleted`})
    } catch (err) {
      console.log(err)
    }
  }
}
