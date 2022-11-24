import classes from "./adminOrders.module.css";
import basicImg from "../public/basic.png";
import Image from "next/image";
import { useState, useRef } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
function AdminOrders() {
  //   document.addEventListener('contextmenu', (e) => {
  // e.preventDefault()
  //   })
  let [orderDetails, toggleOrderDetails] = useState(false);
 let [statusPopup, openStatusPopup] = useState(false)
  let toggleOrderDetailsHandler = () => {
    if (orderDetails) {
      toggleOrderDetails(false);
    } else {
      toggleOrderDetails(true);
    }
  };
  let toggleStatusPopup = () => {
    if(!statusPopup) {
      openStatusPopup(true)
    } else {
      openStatusPopup(false)
    }
  };
  return (
<>
    <Navbar/>
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
        <div className={classes.orderContainer}>
          <div
            className={classes.orderBriefContainer}
            onClick={toggleOrderDetailsHandler}
          >
            <div>
              <h3>Yesterday</h3>
              <p className={classes.lightText}>5:14AM</p>
            </div>
            <div>
              <p>#F4R3-G4E2</p>
              <p>Fouad Hamdy</p>
              <p>201063586516</p>
              <p>fouadhamdy51@gmail.com</p>
            </div>
            <div>
              <p>El Tagamoa - Cairo</p>
            </div>
            <div>
              <h3>Cash</h3>
              <p className={classes.lightText}>245EGP</p>
            </div>
            <div>
              <p>ASAP</p>
              <p>5:14PM, 13 Nov 2022</p>
            </div>
            <div>
              <p className={classes.pending}>Pending</p>
            </div>
          </div>
          {orderDetails && (
            <div className={classes.orderDetails}>
              <div className={classes.itemDetails}>
                <h1>Items</h1>
                <hr />
                <div className={classes.orderTitleDetails}>
                  <Image src={basicImg} alt="basic" />
                  <h1>Original Thera Cake Brownies - 20 Mini Pieces</h1>
                  <p>250EGP</p>
                </div>
                <div className={classes.itemSubDetails}>
                  <p>3x Nutella</p>
                </div>
                <div className={classes.itemSubDetails}>
                  <p>3x Nutella</p>
                </div>
                <hr />
                <div className={classes.subtotal}>
                  <p>Subtotal</p>
                  <p>250EGP</p>
                </div>
                <div className={classes.deliveryFees}>
                  <p>Delivery Fees</p>
                  <p>25EGP</p>
                </div>
                <hr />
                <div className={classes.total}>
                  <p>Total</p>
                  <p>275EGP</p>
                </div>
                <hr />
                <div className={classes.statusTimeline}>
                  <h1>Status Timeline</h1>
                  <div>
                    <h5>Order Submitted</h5>
                    <p>- By Fouad Hamdy</p>
                  </div>
                  <div>
                    <h5>Order Accepted</h5>
                    <p>- By Hagar Owner</p>
                  </div>
                  <div>
                    <h5>Order Out For Delivery</h5>
                    <p>- By Amira Salah</p>
                  </div>
                </div>
              </div>
              <div className={classes.addressDetails}>
                <div className={classes.addressHeader}>
                  <h1>Delivery Address</h1>
                  <button>Copy Address</button>
                </div>
                <hr />
                <div>
                  <p>
                    <span>Governorate:</span> Cairo
                  </p>
                  <p>
                    <span>Area:</span> 5th Settlement - 2nd District
                  </p>
                  <p>
                    <span>Street:</span> 162, block 38
                  </p>
                  <p>
                    <span>Building:</span> 13
                  </p>
                  <p>
                    <span>Floor:</span> 3
                  </p>
                  <p>
                    <span>Apartment:</span> 39
                  </p>
                </div>
                <div className={classes.addressBtns}>
                  <button>View Map</button>
                  <button>Send Via Whatsapp</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer/>
      </>
  );
}

export default AdminOrders;
