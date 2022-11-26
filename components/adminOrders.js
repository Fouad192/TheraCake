import classes from "./adminOrders.module.css";
import basicImg from "../public/basic.png";
import Image from "next/image";
import { useState, useRef } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import OrderItem from "./orderItem";
function AdminOrders(props) {
  //   document.addEventListener('contextmenu', (e) => {
  // e.preventDefault()
  //   })
  let [orderDetails, toggleOrderDetails] = useState(false);
  let [statusPopup, openStatusPopup] = useState(false);
  // let orderRef = useRef([])
  
  let toggleStatusPopup = () => {
    if (!statusPopup) {
      openStatusPopup(true);
    } else {
      openStatusPopup(false);
    }
  };
  return (
    <>
      <Navbar />
      <section className={classes.adminOrderGrid}>
        <div className={classes.adminOrderInputs}>
          <input type="search" />
          <input type="sort" />
          <button className={classes.statusBtn} onClick={toggleStatusPopup}>
            Set Status
          </button>
        </div>
        {statusPopup && (
          <div className={classes.status}>
            <button>Accept Order</button>
            <button>Order Is Ready</button>
            <button>Dispatch Order</button>
            <button>Set As Pending</button>
            <button>Delete Order</button>
            <button>Order Fulfilled</button>
          </div>
        )}

        <div className={classes.filter}>
          <button>All</button>
          <button>Pending</button>
          <button>Accepted</button>
          <button>Ready</button>
          <button>Dispatched</button>
          <button>Completed</button>
        </div>
        
        {props.orders.map((order, index) => (
          <OrderItem order={order} />
        ))}
      </section>
      <Footer />
    </>
  );
}

export default AdminOrders;
