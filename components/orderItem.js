import { useState, useRef } from "react";
import classes from "./adminOrders.module.css";
import Image from "next/image";
import basicImg from "../public/basic.png";

function OrderItem({ order }) {
  let [statusPopup, openStatusPopup] = useState(false);
let toggleStatusPopup = () => {
  if (!statusPopup) {
    openStatusPopup(true);
  } else {
    openStatusPopup(false);
  }
};
  function calculateTotal() {
    let sumPrice = 0;
    order.orderItems.map(
      (item) => item.sizePrice.map(size => sumPrice += parseInt(size.price))
      //   priceArr.push(parseInt(item.sizePrice.price))
    );
    order.orderItems.map((item) => item.giftPrice.map(gift => sumPrice+= parseInt(gift.price)))
    order.orderItems.map((item) => item.extraPrice.map(extra => sumPrice += parseInt(extra.price)))
    return sumPrice
  }
  return (
    <div className={classes.orderContainer} onClick={calculateTotal}>
      <div className={classes.orderBriefContainer}>
        <div>
          <h3>Yesterday</h3>
          <p className={classes.lightText}>5:14AM</p>
        </div>
        <div>
          <p>{order.orderNumber}</p>
          <p>{`${order.firstName} ${order.lastName}`}</p>
          <p>{order.mobile}</p>
          <p>{order.email}</p>
        </div>
        <div>
          <p>{`${order.city} - ${order.governorate}`}</p>
        </div>
        <div>
          <h3>Cash</h3>
          <p className={classes.lightText}>{calculateTotal()}</p>
        </div>
        <div>
          <p>ASAP</p>
          <p>5:14PM, 13 Nov 2022</p>
        </div>

        <div>
          <p className={classes.pending}>Pending</p>
        </div>
        <button className={classes.statusBtn} onClick={toggleStatusPopup}>
          Set Status
        </button>
      </div>

      <div className={classes.orderDetails}>
        <div className={classes.itemDetails}>
          <h1>Items</h1>
          <hr />
          {order.orderItems.map((item) => (
            <div>
              <div className={classes.orderTitleDetails}>
                <Image src={basicImg} alt="basic" />
                <h1>{`${item.quantity}x ${item.name}`}</h1>
                <p>{item.sizePrice[0].price}</p>
              </div>
              <div className={classes.itemSubDetails}>
                <p>{item.flavors[0]}</p>
              </div>
              {item.giftPrice.map((gift) => (
                <div className={classes.itemSubDetails}>
                  <p>{gift.gift}</p>
                </div>
              ))}

              <hr />
            </div>
          ))}

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
              <span>Governorate:</span> {order.governorate}
            </p>
            <p>
              <span>Area:</span> {order.city} - {order.street}
            </p>
            <p>
              <span>Street:</span> 162, block 38
            </p>
            <p>
              <span>Building:</span> {order.building}
            </p>
            <p>
              <span>Floor:</span> {order.floor}
            </p>
            <p>
              <span>Apartment:</span> {order.apartmentNo}
            </p>
          </div>
          <div className={classes.addressBtns}>
            <button>View Map</button>
            <button>Send Via Whatsapp</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
