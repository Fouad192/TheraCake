import React, { useState, useRef, useEffect } from "react";
import classes from "./adminOrders.module.css";
import uuid from "react-uuid";
import { useRouter } from "next/router";
function ClientData({ client }) {
  const router = useRouter();

  let [sum, setSum] = useState();

  let [details, showDetails] = useState(false);
  const totalSpent = () => {
    let sumPrice = 0;
    client.map((order) => {
      sumPrice += order.totalPrice;
    });
    setSum(sumPrice);
  };

  useEffect(() => {
    totalSpent();
  }, [client]);

  return (
    <div className={classes.orderContainer}>
      <div
        className={classes.orderBriefContainer}
        onClick={() => showDetails(!details)}
      >
        <div>
          {/* <p>{client[0]?.orderNumber}</p> */}
          <p>{`${client[0]?.firstName} ${client[0]?.lastName}`}</p>
          <p>{client[0]?.mobile}</p>
          {client[0]?.backupMobile ? <p>{client[0]?.backupMobile}</p> : null}
          <p>{client[0]?.email}</p>
        </div>
        <div>
          <p>{`${client[0]?.city} - ${client[0]?.governorate}`}</p>
        </div>
        

        <div>
          {client.length === 1 ? (
            <p
            >Ordered Once</p>
          ) : (
            <p
            >{`Ordered ${client.length} times`}</p>
          )}
        </div>
      </div>
      {details && (
        <div className={classes.orderDetails}>
          <div className={classes.itemDetails}>
            <h1>Items</h1>
            <hr />
            {client.map((order, index) =>
              order.orderItems.map((item, itemIndex) => (
                <div key={uuid()}>
                  <div className={classes.orderTitleDetails}>
                    <h1>{`${item.quantity}x ${item.name}`}</h1>
                    <p>{item.sizePrice[0]?.price * item.quantity}</p>
                  </div>

                  <div className={classes.itemSubDetails}>
                    <p>{item.sizePrice[0]?.size}</p>
                  </div>
                  <div className={classes.itemFlavors}>
                    {item.flavors.length > 1 ? (
                      item.flavors.map((flavor, index) => (
                        <p key={uuid()}>{flavor}</p>
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
                        <p>{`${extra.price} ${extra.quantity}x`}</p>
                      </div>
                    </div>
                  ))}
                  <div className={classes.toppingsDiv}>
                    <div>
                      {item.toppings.map((toppingObj) => {
                        return Object.keys(toppingObj).map((topping) => (
                          <p key={uuid()}>{`${topping}`}</p>
                        ));
                      })}
                    </div>
                    <div>
                      {item.toppings.map((toppingObj) => {
                        return Object.values(toppingObj).map((qt) => (
                          <p key={uuid()}>{`${qt}x`}</p>
                        ));
                      })}
                    </div>
                  </div>
                  <div className={classes.notes}>
                    <p>{item.notes}</p>
                  </div>
                  <div className={classes.notes}>
                    <p>{order?.instructions}</p>
                  </div>
                  <p
                    style={{
                      color: "#ff5689",
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1}
                  </p>
                  <h4 style={{ color: "#ff5689", margin: "0.5rem 0" }}>
                    {order.status}
                  </h4>
                  <h4 style={{ color: "#ff5689" }}>{order.scheduled}</h4>
                  <h4 style={{ color: "#ff5689", marginTop: "0.5rem" }}>
                    {order.orderNumber}
                  </h4>
                  <hr />
                </div>
              ))
            )}

            <div className={classes.subtotal}>
              <p>Subtotal</p>
              <p>{sum - client.length * 45}</p>
            </div>

            <div className={classes.deliveryFees}>
              <p>Delivery Fees</p>
              <p>{client.length * 45}</p>
            </div>

            <hr />
            <div className={classes.total}>
              <p>Total</p>
              <p>{sum}</p>
            </div>

            <hr />
          </div>
          <div className={classes.addressDetails}>
            <div className={classes.addressHeader}>
              <h1>Delivery Address</h1>
            </div>
            <hr />
            {client.map((order, index) => {
              return (
                <div key={uuid()}>
                  <p>
                    <span>Governorate:</span> {order?.governorate}
                  </p>
                  <p>
                    <span>Area:</span> {order?.city} - {order?.area}
                  </p>
                  <p>
                    <span>Street:</span> {order?.street}
                  </p>
                  {order?.addressType === "apartment" && (
                    <>
                      <p>
                        <span>Building:</span> {order?.building}
                      </p>
                      <p>
                        <span>Floor:</span> {order?.floor}
                      </p>
                      <p>
                        <span>Apartment:</span> {order?.apartment}
                      </p>
                    </>
                  )}
                  {order?.addressType === "villa" && (
                    <p>
                      <span>Villa:</span> {order?.villa}
                    </p>
                  )}
                  {order?.addressType === "company" && (
                    <p>
                      <span>Company:</span> {order?.company}
                    </p>
                  )}
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientData;
