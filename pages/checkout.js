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
          apartmentAddressData={props.apartmentAddressData}
          villaAddressData={props.villaAddressData}
          companyAddressData={props.companyAddressData}

        />
     
      </>
    ); 
   
}



export async function getServerSideProps(ctx) {
    let sessionData = await getSession(ctx)

    await dbConnect();

    const cartData = await Cart.find({userId: sessionData.user._id})
    const apartmentAddressData = await OrderCheckout.find({userId: sessionData.user._id, addressType: 'apartment'})
    const villaAddressData = await OrderCheckout.find({userId: sessionData.user._id, addressType: 'villa'})
    const companyAddressData = await OrderCheckout.find({userId: sessionData.user._id, addressType: 'company'})
    return {
        props: {
            addedItems: JSON.parse(JSON.stringify((cartData))),
            apartmentAddressData: JSON.parse(JSON.stringify(apartmentAddressData)),
            villaAddressData: JSON.parse(JSON.stringify(villaAddressData)),
            companyAddressData: JSON.parse(JSON.stringify(companyAddressData))
        }
    }
}
export default checkout