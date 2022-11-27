import { useEffect } from "react";
import CheckoutDetails from "../components/CheckoutDetails";
import dbConnect from "../lib/dbConnect";
import Cart from '../models/cart'

function checkout(props) {

    return <CheckoutDetails addedItems={props.addedItems}/>
   
}


export async function getServerSideProps() {
    await dbConnect();
    const cartData = await Cart.find()


    return {
        props: {
            addedItems: JSON.parse(JSON.stringify((cartData)))
        }
    }
}
export default checkout