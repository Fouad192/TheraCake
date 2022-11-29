 import { useEffect, useState } from "react";
import AdminOrders from "../components/adminOrders";
import dbConnect from "../lib/dbConnect";
import OrderCheckout from "../models/order";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import classes from '../components/adminOrders.module.css'
function AdminOrdersPage(props) {


    return (
      <>
   
       
        <AdminOrders orders={props.checkoutOrders}/>

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