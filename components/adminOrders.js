import classes from "./adminOrders.module.css";
import basicImg from "../public/basic.png";
import Image from "next/image";
import { useState, useRef } from "react";
// import Navbar from "./navbar";
// import Footer from "./footer";
import OrderItem from "./orderItem";
import OrderCheckout from "../models/order";
function AdminOrders(props) {
  let [orderDetails, toggleOrderDetails] = useState(false);
  let [statusPopup, openStatusPopup] = useState(false);
  let [search, setSearch] = useState();
  let [result, setResult] = useState();
  let [isLoading, setLoading] = useState(false)
function searchByName(e) {
  setSearch(e.target.value)
 
let bla = props.orders.filter(order => (
  order.firstName === search
))
if(bla.constructor === Array) {
  setResult(bla)
}
 if (!result) {
   setLoading(false);
 } else if (result === bla) {
   setLoading(true);
 }
}

  let toggleStatusPopup = () => {
    if (!statusPopup) {
      openStatusPopup(true);
    } else {
      openStatusPopup(false);
    }
  };
  return (
    <>
      <section className={classes.adminOrderGrid}>
        <div className={classes.adminOrderInputs}>
          <input
            type="search"
            value={search}
            onChange={(e) => searchByName(e)}
          />
          <input type="sort" />
        
        </div>
       
        <div className={classes.filter}>
          <button>All</button>
          <button>Pending</button>
          <button>Accepted</button>
          <button>Ready</button>
          <button>Dispatched</button>
          <button>Completed</button>
        </div>
        {isLoading
          ? result.map((r, index) => <OrderItem order={r} />)
          : props.orders.map((order, index) => <OrderItem order={order} />)}
      </section>
    </>
  );
}

export default AdminOrders;
