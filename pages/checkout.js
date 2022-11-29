import { useEffect } from "react";
import CheckoutDetails from "../components/CheckoutDetails";
import dbConnect from "../lib/dbConnect";
import Cart from '../models/cart'
import OrderCheckout from "../models/order";
import { getSession } from "next-auth/react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
function checkout(props) {
   
    return (
      <>
        
        <CheckoutDetails
          addedItems={props.addedItems}
          userAddress={props.addressData}

        />
     
      </>
    ); 
   
}



export async function getServerSideProps(ctx) {
    let sessionData = await getSession(ctx)

    await dbConnect();

    const cartData = await Cart.find({userId: sessionData.user._id})
    const addressData = await OrderCheckout.find({userId: sessionData.user._id})
    return {
        props: {
            addedItems: JSON.parse(JSON.stringify((cartData))),
            addressData: JSON.parse(JSON.stringify(addressData))
        }
    }
}
export default checkout