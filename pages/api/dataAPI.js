import dbConnect from "../../lib/dbConnect";
import mongoose from "mongoose";
import OrderCheckout from "../../models/order";
export default async function handler(req, res) {
await dbConnect()
  if(req.method = 'GET') {
   const items = await OrderCheckout.find({})
  //  const allNumbers = []
  //  const dataArray = [];

  //   items.map(item => {
  //   let stringNumber = item.mobile?.toString()
  //   if(!allNumbers.includes(stringNumber?.slice(0, stringNumber.length))) {
  //       allNumbers.push(stringNumber)
  //   }
  //  })
  //  for(let num of allNumbers) {
  //   let foundDocument = await OrderCheckout.find({ mobile: num });
  //   dataArray.push(foundDocument)
  //  }
  
   res.status(200).json({items})
  }
}
