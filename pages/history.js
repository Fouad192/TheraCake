import Footer from "../components/footer";
import Navbar from "../components/navbar";
import UserHistory from "../components/userHistory";
import OrderCheckout from "../models/order";
import { getSession } from "next-auth/react";
import dbConnect from "../lib/dbConnect";
import uuid from "react-uuid";
import classes from '../components/userHistory.module.css'
function History(props) {
  
    return (
      <section className={classes.ifNoHistorySection}>
        {props.orderHistory.length === 0 && <h1>No previous orders</h1>}
        <h1 id={classes.ordersHeader}>Your Submitted Orders</h1>
        {props.orderHistory.map((order) => (
          <UserHistory order={order} key={uuid()} />
        ))}
      </section>
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