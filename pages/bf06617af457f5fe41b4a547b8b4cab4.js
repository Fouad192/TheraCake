 import { useEffect, useState } from "react";
import AdminOrders from "../components/adminOrders";
import dbConnect from "../lib/dbConnect";
import OrderCheckout from "../models/order";
import Navbar from "../components/navbar";
import Head from 'next/head'
import Footer from "../components/footer";
import classes from '../components/adminOrders.module.css'
function AdminOrdersPage(props) {


    return (
      <>
        <Head>
          <title>Manage Orders</title>
          <meta
            name="description"
            content="This dessert made with great love,
extreme dedication and the best quality"
          />
        </Head>
        <Navbar />

        <AdminOrders orders={props.checkoutOrders} />
        <Footer />
      </>
    );
}

export async function getServerSideProps() {
  await dbConnect()
  const checkoutOrders = await OrderCheckout.find()

  return {
    props: {
      checkoutOrders: JSON.parse(JSON.stringify((checkoutOrders))),

    }
  }
}
export default AdminOrdersPage 