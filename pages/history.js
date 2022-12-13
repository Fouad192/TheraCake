import Footer from "../components/footer";
import Navbar from "../components/navbar";
import UserHistory from "../components/userHistory";
import OrderCheckout from "../models/order";
import { getSession } from "next-auth/react";
import dbConnect from "../lib/dbConnect";
import uuid from "react-uuid";
import classes from '../components/userHistory.module.css'
import Head from 'next/head'
function History(props) {
  
    return (
      <>
        <Head>
          <title>Previous Orders</title>
          <meta
            name="description"
            content="This dessert made with great love,
extreme dedication and the best quality"
          />
        </Head>
        <Navbar />
        <section className={classes.ifNoHistorySection}>
          {props.orderHistory.length === 0 && <h1>No previous orders</h1>}
          <h1 id={classes.ordersHeader}>Your Submitted Orders</h1>
          {props.orderHistory.map((order) => (
            <UserHistory order={order} key={uuid()} />
          ))}
        </section>
        <Footer />
      </>
    );
}

export async function getServerSideProps(ctx) {
  let sessionData = await getSession(ctx);

  await dbConnect();

  const cartData = await OrderCheckout.find({ email: sessionData.user.email });
  return {
    props: {
      orderHistory: JSON.parse(JSON.stringify(cartData)),
    },
  };
}


export default History