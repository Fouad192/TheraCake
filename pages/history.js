import Footer from "../components/footer";
import Navbar from "../components/navbar";
import UserHistory from "../components/userHistory";
import OrderCheckout from "../models/order";
import { getSession } from "next-auth/react";
import dbConnect from "../lib/dbConnect";

function History(props) {
  
    return (
      <>

        {props.orderHistory.map((order) => (
          <UserHistory order={order} />
        ))}

     
      </>
    );
}

export async function getServerSideProps(ctx) {
  let sessionData = await getSession(ctx);

  await dbConnect();

  const cartData = await OrderCheckout.find({ userId: sessionData.user._id });
  return {
    props: {
      orderHistory: JSON.parse(JSON.stringify(cartData)),
    },
  };
}


export default History