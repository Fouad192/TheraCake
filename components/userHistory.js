import { useState, useRef, useEffect } from "react";
import classes from "./userHistory.module.css";
import Image from "next/image";
import basicImg from "../public/basic.png";
import { useSession } from "next-auth/react";

function UserHistory({order}) {
  let [sum, setSum] = useState();


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
      (item) => item.sizePrice.map((size) => (sumPrice += parseInt(size.price)))
      //   priceArr.push(parseInt(item.sizePrice.price))
    );
    order.orderItems.map((item) =>
      item.giftPrice.map((gift) => (sumPrice += parseInt(gift.price)))
    );
    order.orderItems.map((item) =>
      item.extraPrice.map((extra) => (sumPrice += parseInt(extra.price)))
    );
    setSum(sumPrice);
  }
  useEffect(() => {
    calculateTotal();
  });
 
  
  return (
    <section className={classes.historySection}>
      <div className={classes.orderHistoryContainer}>
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
            <p className={classes.lightText}>{sum}</p>
          </div>
          <div>
            <p>{order.scheduled}</p>
            <p>{`${convertTimestampToTime()} - ${convertTimestampToDate()}`}</p>
          </div>

          <div>
            <p className={classes.pending}>{order.status}</p>
          </div>
        </div>

        <div className={classes.orderHistoryDetails}>
          <div className={classes.itemHistoryDetails}>
            <h1>Items</h1>
            <hr />
            {order.orderItems.map((item) => (
              <div>
                <div className={classes.orderHistoryTitleDetails}>
                  <Image src={basicImg} alt="basic" />
                  <h1>{`${item.quantity}x ${item.name}`}</h1>
                  <p>{item.sizePrice[0].price}</p>
                </div>
                <div className={classes.itemHistorySubDetails}>
                  <p>{item.flavors[0]}</p>
                </div>
                {item.giftPrice.map((gift) => (
                  <div className={classes.itemHistorySubDetails}>
                    <div>
                      <p>{gift.gift}</p>
                      <p>{gift.price}</p>
                    </div>
                  </div>
                ))}

                {item.extraPrice.map((extra) => (
                  <div className={classes.itemHistorySubDetails}>
                    <div>
                      <p>{extra.extra}</p>
                      <p>{extra.price}</p>
                    </div>
                  </div>
                ))}
                <hr />
              </div>
            ))}

            <div className={classes.historySubtotal}>
              <p>Subtotal</p>
              <p>{sum}</p>
            </div>
            <div className={classes.historyDeliveryFees}>
              <p>VAT</p>
              <p>{(sum * 14) / 100}</p>
            </div>
            <div className={classes.historyDeliveryFees}>
              <p>Delivery Fees</p>
              <p>45 EGP</p>
            </div>

            <hr />
            <div className={classes.historyTotal}>
              <p>Total</p>
              <p>{(sum * 14) / 100 + 45 + sum}</p>
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
      </div>
    </section>
  );
}

export default UserHistory;
