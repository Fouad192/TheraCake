import { useState, useRef, useEffect } from "react";
import classes from "./adminOrders.module.css";
import Image from "next/image";
import basicImg from "../public/basic.png";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import uuid from "react-uuid";

function OrderItem({ order }) {
  const router = useRouter()
  let [statusPopup, openStatusPopup] = useState(false);
  let [sum, setSum] = useState()
  let [encodedText, setEncodedText] = useState('')
  let [details, showDetails] = useState(false)
  function encodeData() {
    if(order.addressType === 'apartment') {
    let apartmentText = `Order Number: ${order.orderNumber} \n Client Name: ${
      order.firstName
    } ${order.lastName} \n Mobile Number: ${order.mobile} \n Total: ${
       45 + sum
    } \n Address: ${order.governorate} - ${order.city} \n ${order.area} - Street: ${order.street} \n Building Number: ${order.building} - Floor: ${order.floor} - Apartment Number: ${order.apartment} \n Payment Method: Cash`;
   let encoded = encodeURI(apartmentText)
  //  let redirectLink = `https://wa.me/?text=${encoded}`;
   setEncodedText(encoded)
  } else if(order.addressType === 'villa') {
     let apartmentText = `Order Number: ${order.orderNumber} \n Client Name: ${
       order.firstName
     } ${order.lastName} \n Mobile Number: ${order.mobile} \n Total: ${
       45 + sum
     } \n Address: ${order.governorate} - ${order.city} \n ${order.area} - Street: ${
       order.street
     } \n Villa Number: ${order.villa}
      \n Payment Method: Cash`;
     let encoded = encodeURI(apartmentText);
     //  let redirectLink = `https://wa.me/?text=${encoded}`;
     setEncodedText(encoded);
  } else if(order.addressType === 'company') {
     let apartmentText = `Order Number: ${order.orderNumber} \n Client Name: ${
       order.firstName
     } ${order.lastName} \n Mobile Number: ${order.mobile} \n Total: ${
        45 + sum
     } \n Address: ${order.governorate} - ${order.city} \n ${order.area} - Street: ${
       order.street
     } \n Company Name: ${order.company}
      \n Payment Method: Cash`;
     let encoded = encodeURI(apartmentText);
     //  let redirectLink = `https://wa.me/?text=${encoded}`;
     setEncodedText(encoded);
  }
  }
  useEffect(() => {
encodeData()
  }, [])
  function convertTimestampToDate() {
    let date = new Date(order.dateSubmitted).toLocaleDateString("en-US");
    return date;
  }
  function convertTimestampToTime() {
    let time = new Date(order.dateSubmitted).toLocaleTimeString("en-US");

    return time;
  }
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
      (item) => item.sizePrice.map((size) => (sumPrice += parseInt(size.price) * item.quantity))
      //   priceArr.push(parseInt(item.sizePrice.price))
    );
    order.orderItems.map((item) =>
      item.giftPrice.map((gift) => (sumPrice += parseInt(gift.price) * item.quantity))
    );
    order.orderItems.map((item) =>
      item.extraPrice.map((extra) => (sumPrice += parseInt(extra.price) * item.quantity))
    );
   setSum(sumPrice)
  }
  useEffect(() => {
    calculateTotal()
  })
  async function setStatus(e) {
    let status = [e.target.value, order._id]
    const response = await fetch('/api/checkout', {
      method: "PUT",
      body: JSON.stringify(status)
    })
    const data = await response.json()
    
  }
  async function deleteOrder() {
    const response = await fetch('/api/checkout', {
      method: 'DELETE',
       body: order._id
    })
    const data = await response.json()
    console.log(data)
    setTimeout(() => {
       router.reload(window.location.pathname);
    }, 500);
  }
  return (
    <div className={classes.orderContainer}>
      <div
        className={classes.orderBriefContainer}
        onClick={() => showDetails(!details)}
      >
        
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
        <div className={classes.orderDetails}>
          <div className={classes.itemDetails}>
            <h1>Items</h1>
            <hr />
            {order.orderItems.map((item) => (
              <div key={uuid()}>
                <div className={classes.orderTitleDetails}>
                  <h1>{`${item.quantity}x ${item.name}`}</h1>
                  <p>{item.sizePrice[0].price * item.quantity}</p>
                </div>
                <div className={classes.itemSubDetails}>
                  <p>{item.sizePrice[0].size}</p>
                </div>
                <div className={classes.itemFlavors}>
                  {item.flavors.length > 1 ? (
                    item.flavors.map((flavor, index) => (
                      <p key={index}>
                       {flavor}
                      </p>
                    ))
                  ) : (
                    <p>{item.flavors[0]}</p>
                  )}
                </div>
                {item.giftPrice.map((gift) => (
                  <div className={classes.itemSubDetails} key={uuid()}>
                    <div>
                      <p>{gift.gift}</p>
                      <p>{gift.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
                {item.freePistachio === "Free Pistachio" && (
                  <div className={classes.itemSubDetails}>
                    <div>
                      <p>Free Extra Pistachio</p>
                    </div>
                  </div>
                )}
                {item.extraPrice.map((extra) => (
                  <div className={classes.itemSubDetails} key={uuid()}>
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
                <hr />
              </div>
            ))}

            <div className={classes.subtotal}>
              <p>Subtotal</p>
              <p>{sum}</p>
            </div>

            <div className={classes.deliveryFees}>
              <p>Delivery Fees</p>
              <p>45 EGP</p>
            </div>

            <hr />
            <div className={classes.total}>
              <p>Total</p>
              <p>{order.totalPrice}</p>
            </div>
            <hr />
            {/* <div className={classes.statusTimeline}>
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
            </div> */}
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
                <span>Area:</span> {order.city} - {order.area}
              </p>
              <p>
                <span>Street:</span> {order.street}
              </p>
              {order.addressType === "apartment" && (
                <>
                  <p>
                    <span>Building:</span> {order.building}
                  </p>
                  <p>
                    <span>Floor:</span> {order.floor}
                  </p>
                  <p>
                    <span>Apartment:</span> {order.apartment}
                  </p>
                </>
              )}
              {order.addressType === "villa" && (
                <p>
                  <span>Villa:</span> {order.villa}
                </p>
              )}
              {order.addressType === "company" && (
                <p>
                  <span>Company:</span> {order.company}
                </p>
              )}
            </div>
            <div className={classes.addressBtns}>
              <button>View Map</button>
              <Link target="_blank" href={`https://wa.me/?text=${encodedText}`}>
                <button onClick={encodeData}>Send Via Whatsapp</button>
              </Link>
            </div>
            <div className={classes.statusContainer}>
              <button className={classes.statusBtn} onClick={toggleStatusPopup}>
                Set Status
              </button>
              {statusPopup && (
                <div className={classes.status}>
                  <button value="Accepted" onClick={(e) => setStatus(e)}>
                    Accept Order
                  </button>
                  <button value="Ready" onClick={(e) => setStatus(e)}>
                    Order Is Ready
                  </button>
                  <button value="On the way" onClick={(e) => setStatus(e)}>
                    Dispatch Order
                  </button>
                  <button value="Pending" onClick={(e) => setStatus(e)}>
                    Set As Pending
                  </button>
                  <button onClick={deleteOrder}>Delete Order</button>
                  <button value="Delivered" onClick={(e) => setStatus(e)}>
                    Order Delievered
                  </button>
                  <button value="Cancelled" onClick={(e) => setStatus(e)}>
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderItem;
