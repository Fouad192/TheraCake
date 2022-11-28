import { useEffect } from "react";
import CheckoutDetails from "../components/CheckoutDetails";
import dbConnect from "../lib/dbConnect";
import Cart from '../models/cart'
import { getSession } from "next-auth/react";

function checkout(props) {
   
    return <CheckoutDetails addedItems={props.addedItems} session={props.currentSession}/>
   
}



export async function getServerSideProps(ctx) {
    let sessionData = await getSession(ctx)

    await dbConnect();

    const cartData = await Cart.find({userId: sessionData.user._id})
    return {
        props: {
            addedItems: JSON.parse(JSON.stringify((cartData))),
         
        }
    }
}
export default checkout