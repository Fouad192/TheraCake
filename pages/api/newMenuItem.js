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
  }
}
