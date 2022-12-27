import { useState, useRef, useEffect } from "react";
import classes from "./userHistory.module.css";
import Image from "next/image";
import basicImg from "../public/basic.png";
import { useSession } from "next-auth/react";
import uuid from "react-uuid";

function UserHistory({order}) {
  let [sum, setSum] = useState();
  let [details, showDetails] = useState(false);


  function convertTimestampToDate() {
    let date = new Date(order.dateSubmitted).toLocaleDateString("en-US");
    return date;
  }
  function convertTimestampToTime() {
    let time = new Date(order.dateSubmitted).toLocaleTimeString("en-US");

    return time;
  }

  function calculateTotal() {
    let sumPrice = 0;
    order.orderItems.map(
      (item) => item.sizePrice.map((size) => (sumPrice += parseInt(size.price) * item.quantity))
      //   priceArr.push(parseInt(item.sizePrice.price))
    );
    order.orderItems.map((item) =>
      item.giftPrice.map((gift) => (sumPrice += parseInt(gift.price) * item.quantity))
    );
    order.orderItems.map((item) =>
      item.extraPrice.map((extra) => (sumPrice += parseInt(extra.price) * item.quantity))
    );
    setSum(sumPrice);
  }
  useEffect(() => {
    calculateTotal();
  });
 
  
  return (
    <section className={classes.historySection}>
      <div
        className={classes.orderHistoryContainer}
        onClick={() => showDetails(!details)}
      >
        <div className={classes.orderHistoryBriefContainer}>
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
            <p className={classes.lightText}>{order.totalPrice}</p>
          </div>
          <div>
            <p>{order.scheduled}</p>
            <p>{`${convertTimestampToTime()} - ${convertTimestampToDate()}`}</p>
          </div>

          <div>
            <p className={classes.pending}>{order.status}</p>
          </div>
        </div>
        {details && (
          <div className={classes.orderHistoryDetails}>
            <div className={classes.itemHistoryDetails}>
              <h1>Items</h1>
              <hr />
              {order.orderItems.map((item) => (
                <div key={uuid()}>
                  <div className={classes.orderHistoryTitleDetails}>
                    <h1>{`${item.quantity}x ${item.name}`}</h1>
                    <p>{item.sizePrice[0].price * item.quantity}</p>
                  </div>
                  <div className={classes.itemHistorySubDetails}>
                    <p>{item.flavors[0]}</p>
                  </div>
                  {item.giftPrice.map((gift) => (
                    <div className={classes.itemHistorySubDetails} key={uuid()}>
                      <div>
                        <p>{gift.gift}</p>
                        <p>{gift.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {item.freePistachio === "Free Pistachio" && (
                    <div className={classes.itemHistorySubDetails}>
                      <div>
                        <p>Free Extra Pistachio</p>
                      </div>
                    </div>
                  )}
                  {item.extraPrice.map((extra) => (
                    <div className={classes.itemHistorySubDetails} key={uuid()}>
                      <div>
                        <p>{extra.extra}</p>
                        <p>{extra.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  <div className={classes.toppingsDiv}>
                    <div>
                      {item.toppings.map((toppingObj) => {
                        return Object.keys(toppingObj).map((topping) => (
                          <p key={topping}>{`${topping}`}</p>
                        ));
                      })}
                    </div>
                    <div>
                      {item.toppings.map((toppingObj) => {
                        return Object.values(toppingObj).map((qt) => (
                          <p key={qt}>{`${qt}x`}</p>
                        ));
                      })}
                    </div>
                  </div>
                  <div className={classes.notes}>
                    <p>{item.notes}</p>
                  </div>
                  <hr />
                </div>
              ))}
              <div className={classes.notes}>
                <p>{order.instructions}</p>
              </div>
              <div className={classes.historySubtotal}>
                <p>Subtotal</p>
                <p>{sum}</p>
              </div>

              <div className={classes.historyDeliveryFees}>
                <p>Delivery Fees</p>
                <p>45 EGP</p>
              </div>

              <hr />
              <div className={classes.historyTotal}>
                <p>Total</p>
                <p>{order.totalPrice}</p>
              </div>
              <hr />
            </div>
            <div className={classes.addressHistoryDetails}>
              <div className={classes.addressHistoryHeader}>
                <h1>Delivery Address</h1>
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
                  <span>Apartment:</span> {order.apartment}
                </p>
              </div>
              <div className={classes.addressHistoryBtns}>
                <button>View Map</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default UserHistory;
