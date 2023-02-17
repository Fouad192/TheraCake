import classes from "./checkoutDetails.module.css";
import { useEffect, useRef, useState } from "react";
import deleteIcon from "../public/delete.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import uuid from "react-uuid";
import emailjs from "@emailjs/browser";
// import handleCardPayment from "../pages/api/cardPayment";
const orderid = require("order-id")("key");

function CheckoutDetails(props) {
  const router = useRouter();
  const { data: session } = useSession();
  const apartmentLastIndex = props.apartmentAddressData.length - 1;
  const villaLastIndex = props.villaAddressData.length - 1;
  const companyLastIndex = props.companyAddressData.length - 1;
  const [localCart, setLocalCart] = useState([]);
  let [maxDate, setMaxDate] = useState();
  let [minDate, setMinDate] = useState();
  const [disableBtn, setDisableBtn] = useState();
  const [visaData, setVisaData] = useState();
  let [totalPrice, setTotalPrice] = useState(calculateTotalPriceDb());
  let [apartmentDetails, showApartmentDetails] = useState(false);
  let [villaDetails, showVillaDetails] = useState(false);
  let [workplaceDetails, showWorkplaceDetails] = useState(false);
  let [giftPrices, setGiftPrices] = useState([]);
  let [apartmentInputs, setApartmentInputs] = useState({});
  let [villaInputs, setVillaInputs] = useState({});
  let [companyInputs, setCompanyInputs] = useState({});
  const [payMethod, setPayMethod] = useState("cash");

  useEffect(() => {
    if (
      typeof localStorage.getItem("items") !== "undefined" &&
      localStorage.getItem("items") !== ""
    ) {
      setLocalCart(JSON.parse(localStorage.getItem("items")));
    }
  }, []);
  useEffect(() => {
    if (session) {
      if (props.apartmentAddressData[apartmentLastIndex]) {
        let initialApartmentAddressDetails = {
          firstName: props.apartmentAddressData[apartmentLastIndex].firstName,
          lastName: props.apartmentAddressData[apartmentLastIndex].lastName,
          mobile: props.apartmentAddressData[apartmentLastIndex].mobile,
          backupMobile:
            props.apartmentAddressData[apartmentLastIndex].backupMobile || "",
          email: props.apartmentAddressData[apartmentLastIndex].email,
          governorate:
            props.apartmentAddressData[apartmentLastIndex].governorate,
          city: props.apartmentAddressData[apartmentLastIndex].city,
          area: props.apartmentAddressData[apartmentLastIndex].area,
          street: props.apartmentAddressData[apartmentLastIndex].street,
          building: props.apartmentAddressData[apartmentLastIndex].building,
          floor: props.apartmentAddressData[apartmentLastIndex].floor,
          apartment: props.apartmentAddressData[apartmentLastIndex].apartment,
          instructions: "",
          scheduled: "",
        };
        setApartmentInputs(initialApartmentAddressDetails);
      }
      if (props.villaAddressData[villaLastIndex]) {
        let initialVillaAddressDetails = {
          firstName: props.villaAddressData[villaLastIndex].firstName,
          lastName: props.villaAddressData[villaLastIndex].lastName,
          mobile: props.villaAddressData[villaLastIndex].mobile,
          backupMobile:
            props.villaAddressData[villaLastIndex].backupMobile || "",
          email: props.villaAddressData[villaLastIndex].email,
          governorate: props.villaAddressData[villaLastIndex].governorate,
          city: props.villaAddressData[villaLastIndex].city,
          area: props.villaAddressData[villaLastIndex].area,
          street: props.villaAddressData[villaLastIndex].street,
          villa: props.villaAddressData[villaLastIndex].villa,
          instructions: "",
          scheduled: "",
        };
        setVillaInputs(initialVillaAddressDetails);
      }
      if (props.companyAddressData[companyLastIndex]) {
        let initialCompanyAddressDetails = {
          firstName: props.companyAddressData[companyLastIndex].firstName,
          lastName: props.companyAddressData[companyLastIndex].lastName,
          mobile: props.companyAddressData[companyLastIndex].mobile,
          backupMobile:
            props.companyAddressData[companyLastIndex].backupMobile || "",
          email: props.companyAddressData[companyLastIndex].email,
          governorate: props.companyAddressData[companyLastIndex].governorate,
          city: props.companyAddressData[companyLastIndex].city,
          area: props.companyAddressData[companyLastIndex].area,
          street: props.companyAddressData[companyLastIndex].street,
          company: props.companyAddressData[companyLastIndex].company,
          instructions: "",
          scheduled: "",
        };
        setCompanyInputs(initialCompanyAddressDetails);
      }
    }
  }, [session]);
  function renderDeliveryTab() {
    if (props.addedItems.length != 0) {
      return (
        <>
          <div className={classes.deliveryFee}>
            <p>Delivery</p>
            <p className={classes.price}>45 EGP</p>
          </div>
          <div className={classes.total}>
            <p>Total</p>
            <p className={classes.price}>{totalDue()}</p>
          </div>
          <Link href="/menu">
            <button className={classes.addMoreItems}>Add More Items</button>
          </Link>
        </>
      );
    }

    if (localCart?.length != 0 && localCart !== null && !session) {
      return (
        <>
          <div className={classes.deliveryFee}>
            <p>Delivery</p>
            <p className={classes.price}>45 EGP</p>
          </div>
          <div className={classes.total}>
            <p>Total</p>
            <p className={classes.price}>{anonymousTotalDue()}</p>
          </div>
          <Link href="/menu">
            <button className={classes.addMoreItems}>Add More Items</button>
          </Link>
        </>
      );
    }
  }
  function renderCart() {
    if (props.addedItems.length > 0) {
      return props.addedItems.map((addedItem) => (
        <div className={classes.item} key={uuid()}>
          <div className={classes.deleteDiv}>
            <h1>{`${addedItem.quantity}x ${addedItem.name}`}</h1>
            <Image
              src={deleteIcon}
              alt="deleteIcon"
              onClick={() => {
                deleteItemHandler(addedItem);
                setTimeout(() => {
                  router.reload(window.location.pathname);
                }, 500);
              }}
            />
          </div>

          <div className={classes.size}>
            <p>{addedItem?.sizePrice[0]?.size}</p>
            <p className={classes.price}>
              {addedItem?.sizePrice[0]?.price * addedItem?.quantity}
            </p>
          </div>
          {/* {addedItem.freePistachio === "Free Pistachio" && (
            <div className={classes.freeExtraDiv}>
              <p>Free Extra Pistachio</p>
            </div>
          )} */}
          {addedItem.toppings.map((toppingObj) => {
            if (Object.keys(toppingObj).length >= 1) {
              return (
                <p key={uuid()} id={classes.toppingsP}>
                  Toppings
                </p>
              );
            }
          })}
          <div className={classes.toppingDiv}>
            <div>
              {addedItem.toppings.map((toppingObj) => {
                return Object.keys(toppingObj).map((topping) => (
                  <p key={topping}>{`${topping}`}</p>
                ));
              })}
            </div>
            <div>
              {addedItem.toppings.map((toppingObj) => {
                return Object.values(toppingObj).map((qt) => (
                  <p key={qt}>{`${qt}x`}</p>
                ));
              })}
            </div>
          </div>
          <div className={classes.flavor}>
            {addedItem.flavors.length > 1 ? (
              addedItem.flavors.map((flavor, index) => (
                <p key={index}>
                  <span>{flavor}</span>
                </p>
              ))
            ) : (
              <p>{addedItem.flavors[0]}</p>
            )}
          </div>
          {addedItem.extraPrice.length === 0 ? null : (
            <div>
              {addedItem.extraPrice?.map((extra, index) => (
                <div className={classes.gift} key={uuid()}>
                  <p>{extra.extra}</p>
                  <p className={classes.price}>
                    {extra.price * addedItem.quantity}
                  </p>
                </div>
              ))}
            </div>
          )}
          {addedItem.giftPrice.length === 0 ? null : (
            <div>
              {addedItem.giftPrice?.map((gift, index) => (
                <div className={classes.gift} key={uuid()}>
                  <p>{gift.gift}</p>
                  <p className={classes.price}>
                    {gift.price * addedItem.quantity}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div>
            <p>{addedItem.notes}</p>
          </div>

          <hr />
        </div>
      ));
    } else if (props.addedItems.length === 0 && !session) {
      return localCart?.map((addedItem, index) => (
        <div className={classes.item} key={uuid()}>
          <div className={classes.deleteDiv}>
            <h1>{`${addedItem.quantity}x ${addedItem.name}`}</h1>
            <Image
              src={deleteIcon}
              alt="deleteIcon"
              onClick={() => {
                const newCart = localCart;
                newCart.splice(index, 1);
                localStorage.setItem("items", JSON.stringify(newCart));
                setTimeout(() => {
                  router.reload(window.location.pathname);
                }, 500);
              }}
            />
          </div>

          <div className={classes.size}>
            <p>{addedItem?.sizePrice[0]?.size}</p>
            <p className={classes.price}>
              {addedItem?.sizePrice[0]?.price * addedItem?.quantity}
            </p>
          </div>
          {/* {addedItem.freePistachio === "Free Pistachio" && (
            <div className={classes.freeExtraDiv}>
              <p>Free Extra Pistachio</p>
            </div>
          )} */}
          {addedItem.toppings.map((toppingObj) => {
            if (Object.keys(toppingObj).length >= 1) {
              return (
                <p key={uuid()} id={classes.toppingsP}>
                  Toppings
                </p>
              );
            }
          })}
          <div className={classes.toppingDiv}>
            <div>
              {addedItem.toppings.map((toppingObj) => {
                return Object.keys(toppingObj).map((topping) => (
                  <p key={topping}>{`${topping}`}</p>
                ));
              })}
            </div>
            <div>
              {addedItem.toppings.map((toppingObj) => {
                return Object.values(toppingObj).map((qt) => (
                  <p key={qt}>{`${qt}x`}</p>
                ));
              })}
            </div>
          </div>
          <div className={classes.flavor}>
            {addedItem.flavors.length > 1 ? (
              addedItem.flavors.map((flavor, index) => (
                <p key={index}>
                  <span>{flavor}</span>
                </p>
              ))
            ) : (
              <p>{addedItem.flavors[0]}</p>
            )}
          </div>
          {addedItem.extraPrice.length === 0 ? null : (
            <div>
              {addedItem.extraPrice?.map((extra, index) => (
                <div className={classes.gift} key={uuid()}>
                  <p>{extra.extra}</p>
                  <p className={classes.price}>
                    {extra.price * addedItem.quantity}
                  </p>
                </div>
              ))}
            </div>
          )}
          {addedItem.giftPrice.length === 0 ? null : (
            <div>
              {addedItem.giftPrice?.map((gift, index) => (
                <div className={classes.gift} key={uuid()}>
                  <p>{gift.gift}</p>
                  <p className={classes.price}>
                    {gift.price * addedItem.quantity}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div>
            <p>{addedItem.notes}</p>
          </div>

          <hr />
        </div>
      ));
    }
  }

  const API =
    "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnVZVzFsSWpvaU1UWTJOekU1TXpRNE1pNDBOREUwTmpJaUxDSndjbTltYVd4bFgzQnJJam8xT0RnNU9EY3NJbU5zWVhOeklqb2lUV1Z5WTJoaGJuUWlmUS5xMmdCYmpIQ0NWZ0JTRndMTVV2QkdsX2x6SFkxM3pEZ2hmV1pSQnVYWXowMS1PTmwxekxVN0s2Nl92MkQwS2lFTGJZM2h0bjZHNjl3U1U4bDlJSjdUQQ=="; // your api here

  const integrationID = 2984427;
  function sendMail() {
    emailjs
      .send(
        "service_mqrj1xg",
        "template_676mrmp",
        { from_name: "TheraCake" },
        "iGqINwiui-ldCoAAX"
      )
      .then(
        function (response) {
          console.log("SUCCESS!");
        },
        function (error) {
          alert(error);
        }
      );
  }
  function sendClientMail(inputs) {
    emailjs
      .send(
        "service_mqrj1xg",
        "template_k01ublk",
        {
          client_mail: inputs.email,
          to_name: inputs.firstName,
          message: `Your order has been confirmed and will arrive on ${inputs.scheduled} \n If you're a registed user on the website, you can track your order status through your history page`,
        },
        "iGqINwiui-ldCoAAX"
      )
      .then(
        function (response) {
          console.log("SUCCESS!");
        },
        function (error) {
          alert(error);
        }
      );
  }
  async function firstStep(orderData) {
    let data = {
      api_key: API,
    };

    let request = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    let response = await request.json();

    let token = response.token;

    secondStep(token, orderData);
  }

  async function secondStep(token, orderData) {
    let data = {
      auth_token: token,
      delivery_needed: "true",
      amount_cents:
        Math.ceil(
          parseInt(
            orderData.totalPrice + (orderData.totalPrice * 2.5) / 100 + 2.5
          )
        ) * 100,
      currency: "EGP",
      items: [],
    };
    let request = await fetch(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    let response = await request.json();

    let id = response.id;
    // console.log(response)
    orderData["paymobId"] = id;
    orderData["paymentMethod"] = "visa";
    const internalRequest = await fetch("/api/cardPayment", {
      method: "POST",
      body: JSON.stringify({
        type: "orderItems",
        dataItems: orderData,
      }),
      headers: { "Content-Type": "application/json" },
    });
    let internalResponse = await internalRequest.json();

    thirdStep(token, id, orderData);
  }

  async function thirdStep(token, id, orderData) {
    let data = {
      auth_token: token,
      amount_cents:
        Math.ceil(
          parseInt(
            orderData.totalPrice + (orderData.totalPrice * 2.5) / 100 + 2.5
          )
        ) * 100,
      expiration: 3600,
      order_id: id,
      billing_data: {
        apartment: "N/A",
        email:
          apartmentInputs.email || companyInputs.email || villaInputs.email,
        floor: "N/A",
        first_name:
          apartmentInputs.firstName ||
          companyInputs.firstName ||
          villaInputs.firstName,
        street: "N/A",
        building: "N/A",
        phone_number:
          apartmentInputs.mobile || companyInputs.mobile || villaInputs.mobile,
        shipping_method: "N/A",
        postal_code: "N/A",
        city: "N/A",
        country: "EG",
        last_name:
          apartmentInputs.lastName ||
          companyInputs.lastName ||
          villaInputs.lastName,
        state: "N/A",
      },
      currency: "EGP",
      integration_id: integrationID,
    };

    let request = await fetch(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    let response = await request.json();
    let TheToken = response.token;

    cardPayment(TheToken);
  }

  async function cardPayment(token) {
    let iframeURL = `https://accept.paymob.com/api/acceptance/iframes/690689?payment_token=${token}`;
    router.replace(iframeURL);
  }

  useEffect(() => {
    let currentTime = new Date().getHours();
    let tomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1));
    let afterTomorrowDate = new Date(
      new Date().setDate(new Date().getDate() + 2)
    );
    let date = new Date(new Date().setDate(new Date().getDate() + 7));

    let formattedTomorrowDate = new Date(
      tomorrowDate.getTime() - tomorrowDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
    let formattedAfterTomorrowDate = new Date(
      afterTomorrowDate.getTime() -
        afterTomorrowDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
    let formattedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
    setMaxDate(formattedDate);
    if (currentTime >= 21) {
      setMinDate(formattedAfterTomorrowDate);
    } else {
      setMinDate(formattedTomorrowDate);
    }
  }, []);

  function calculateTotalPriceDb() {
    let sum = 0;
    props.addedItems.map((item) => {
      item.sizePrice.map((size) => {
        sum += parseInt(size.price) * item.quantity;
      });
      item.extraPrice.map((extra) => {
        sum += parseInt(extra.price) * item.quantity;
      });
      item.giftPrice.map((gift) => {
        sum += parseInt(gift.price) * item.quantity;
      });
    });

    return sum + 45;
  }
  async function apartmentSubmitHandler(e) {
    e.preventDefault();
    setDisableBtn(true);
    setTimeout(() => {
      setDisableBtn(false);
    }, 4000);
    if (session) {
      try {
        if (props.addedItems.length === 0) {
          alert("Please Add Items To Your Cart");
        } else {
          let thisOrderId = orderid.generate();
          let currentTime = orderid.getTime(thisOrderId);
          const orderData = {
            addressType: "apartment",
            userId: session.user._id,
            orderItems: props.addedItems,
            orderNumber: thisOrderId,
            dateSubmitted: currentTime,
            firstName: apartmentInputs.firstName,
            lastName: apartmentInputs.lastName,
            mobile: apartmentInputs.mobile,
            backupMobile: apartmentInputs.backupMobile,
            email: apartmentInputs.email,
            governorate: apartmentInputs.governorate,
            city: apartmentInputs.city,
            area: apartmentInputs.area,
            street: apartmentInputs.street,
            building: apartmentInputs.building,
            floor: apartmentInputs.floor,
            apartment: apartmentInputs.apartment,
            instructions: apartmentInputs.instructions,
            scheduled: apartmentInputs.scheduled,
            totalPrice: calculateTotalPriceDb(),
          };

          if (payMethod === "visa") {
            firstStep(orderData);
          } else if (payMethod === "cash") {
            const response = await fetch("/api/checkout", {
              method: "POST",
              body: JSON.stringify(orderData),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            if (data.message === "Checked out!") {
              sendMail();
              sendClientMail(apartmentInputs);
              router.push("/thankyou");
            }
          }
        }
      } catch (e) {
        alert(e.message);
      }
    } else if (!session) {
      try {
        if (localCart.length === 0) {
          alert("Please Add Items To Your Cart");
        } else {
          let thisOrderId = orderid.generate();
          let currentTime = orderid.getTime(thisOrderId);
          const orderData = {
            addressType: "apartment",
            orderItems: localCart,
            orderNumber: thisOrderId,
            dateSubmitted: currentTime,
            firstName: apartmentInputs.firstName,
            lastName: apartmentInputs.lastName,
            mobile: apartmentInputs.mobile,
            backupMobile: apartmentInputs.backupMobile,
            email: apartmentInputs.email,
            governorate: apartmentInputs.governorate,
            city: apartmentInputs.city,
            area: apartmentInputs.area,
            street: apartmentInputs.street,
            building: apartmentInputs.building,
            floor: apartmentInputs.floor,
            apartment: apartmentInputs.apartment,
            instructions: apartmentInputs.instructions,
            scheduled: apartmentInputs.scheduled,
            totalPrice: anonymousTotalDue(),
          };

          // const data = await response.json();

          if (payMethod === "visa") {
            firstStep(orderData);
          } else if (payMethod === "cash") {
            const response = await fetch("/api/checkout", {
              method: "POST",
              body: JSON.stringify(orderData),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            if (data.message === "Checked out!") {
              sendMail();
              sendClientMail(apartmentInputs);

              router.push("/thankyou");
            }
          }
        }
      } catch (e) {
        alert(e.message);
      }
    }
  }
  async function villaSubmitHandler(e) {
    e.preventDefault();
    setDisableBtn(true);
    setTimeout(() => {
      setDisableBtn(false);
    }, 4000);
    if (session) {
      try {
        if (props.addedItems.length === 0) {
          alert("Please Add Items To Your Cart");
        } else {
          let thisOrderId = orderid.generate();
          let currentTime = orderid.getTime(thisOrderId);
          const orderData = {
            addressType: "villa",
            userId: session.user._id,
            orderItems: props.addedItems,
            orderNumber: thisOrderId,
            dateSubmitted: currentTime,
            firstName: villaInputs.firstName,
            lastName: villaInputs.lastName,
            mobile: villaInputs.mobile,
            backupMobile: villaInputs.backupMobile,
            email: villaInputs.email,
            governorate: villaInputs.governorate,
            city: villaInputs.city,
            area: villaInputs.area,
            street: villaInputs.street,
            villa: villaInputs.villa,
            instructions: villaInputs.instructions,
            scheduled: villaInputs.scheduled,
            totalPrice: calculateTotalPriceDb(),
          };

          if (payMethod === "visa") {
            firstStep(orderData);
          } else if (payMethod === "cash") {
            const response = await fetch("/api/checkout", {
              method: "POST",
              body: JSON.stringify(orderData),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            if (data.message === "Checked out!") {
              sendMail();
              sendClientMail(villaInputs);

              router.push("/thankyou");
            }
          }
        }
      } catch (e) {
        alert(e.message);
      }
    } else if (!session) {
      try {
        if (localCart.length === 0) {
          alert("Please Add Items To Your Cart");
        } else {
          let thisOrderId = orderid.generate();
          let currentTime = orderid.getTime(thisOrderId);
          const orderData = {
            addressType: "villa",
            orderItems: localCart,
            orderNumber: thisOrderId,
            dateSubmitted: currentTime,
            firstName: villaInputs.firstName,
            lastName: villaInputs.lastName,
            mobile: villaInputs.mobile,
            backupMobile: villaInputs.backupMobile,
            email: villaInputs.email,
            governorate: villaInputs.governorate,
            city: villaInputs.city,
            area: villaInputs.area,
            street: villaInputs.street,

            villa: villaInputs.villa,
            instructions: villaInputs.instructions,
            scheduled: villaInputs.scheduled,
            totalPrice: anonymousTotalDue(),
          };

          if (payMethod === "visa") {
            firstStep(orderData);
          } else if (payMethod === "cash") {
            const response = await fetch("/api/checkout", {
              method: "POST",
              body: JSON.stringify(orderData),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            if (data.message === "Checked out!") {
              sendMail();
              sendClientMail(villaInputs);

              router.push("/thankyou");
            }

            // const data = await response.json();
          }
        }
      } catch (e) {
        alert(e.message);
      }
    }
  }
  async function companySubmitHandler(e) {
    e.preventDefault();
    setDisableBtn(true);
    setTimeout(() => {
      setDisableBtn(false);
    }, 4000);
    if (session) {
      try {
        if (props.addedItems.length === 0) {
          alert("Please Add Items To Your Cart");
        } else {
          let thisOrderId = orderid.generate();
          let currentTime = orderid.getTime(thisOrderId);
          const orderData = {
            addressType: "company",
            userId: session.user._id,
            orderItems: props.addedItems,
            orderNumber: thisOrderId,
            dateSubmitted: currentTime,
            firstName: companyInputs.firstName,
            lastName: companyInputs.lastName,
            mobile: companyInputs.mobile,
            backupMobile: companyInputs.backupMobile,
            email: companyInputs.email,
            governorate: companyInputs.governorate,
            city: companyInputs.city,
            area: companyInputs.area,
            street: companyInputs.street,

            company: companyInputs.company,
            instructions: companyInputs.instructions,
            scheduled: companyInputs.scheduled,
            totalPrice: calculateTotalPriceDb(),
          };
          if (payMethod === "visa") {
            firstStep(orderData);
          } else if (payMethod === "cash") {
            const response = await fetch("/api/checkout", {
              method: "POST",
              body: JSON.stringify(orderData),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            if (data.message === "Checked out!") {
              sendMail();
              sendClientMail(companyInputs);

              router.push("/thankyou");
            }

            // const data = await response.json();
          }
        }
      } catch (e) {
        alert(e.message);
      }
    } else if (!session) {
      try {
        if (localCart.length === 0) {
          alert("Please Add Items To Your Cart");
        } else {
          let thisOrderId = orderid.generate();
          let currentTime = orderid.getTime(thisOrderId);
          const orderData = {
            addressType: "company",
            orderItems: localCart,
            orderNumber: thisOrderId,
            dateSubmitted: currentTime,
            firstName: companyInputs.firstName,
            lastName: companyInputs.lastName,
            mobile: companyInputs.mobile,
            backupMobile: companyInputs.backupMobile,
            email: companyInputs.email,
            governorate: companyInputs.governorate,
            city: companyInputs.city,
            area: companyInputs.area,
            street: companyInputs.street,

            company: companyInputs.company,
            instructions: companyInputs.instructions,
            scheduled: companyInputs.scheduled,
            totalPrice: anonymousTotalDue(),
          };
          if (payMethod === "visa") {
            firstStep(orderData);
          } else if (payMethod === "cash") {
            const response = await fetch("/api/checkout", {
              method: "POST",
              body: JSON.stringify(orderData),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            if (data.message === "Checked out!") {
              sendMail();
              sendClientMail(companyInputs);

              router.push("/thankyou");
            }
          }
        }
      } catch (e) {
        alert(e.message);
      }
    }
  }
  function handleApartmentInputChange(e) {
    const { name, value } = e.target;
    setApartmentInputs({ ...apartmentInputs, [name]: value });
  }
  function handleVillaInputChange(e) {
    const { name, value } = e.target;
    setVillaInputs({ ...villaInputs, [name]: value });
  }
  function handleCompanyInputChange(e) {
    const { name, value } = e.target;
    setCompanyInputs({ ...companyInputs, [name]: value });
  }
  let apartmentDetailsHandler = () => {
    if (apartmentDetails) {
      showApartmentDetails(false);
    } else {
      showApartmentDetails(true);
    }
  };

  function totalDue() {
    let sum = 0;

    props.addedItems?.map((item) => {
      item.sizePrice.map((size) => {
        sum += parseInt(size.price) * item.quantity;
      });
      item.extraPrice.map((extra) => {
        sum += parseInt(extra.price) * item.quantity;
      });
      item.giftPrice.map((gift) => {
        sum += parseInt(gift.price) * item.quantity;
      });
    });

    return sum + 45;
  }
  function anonymousTotalDue() {
    let sum = 0;

    localCart?.map((item) => {
      item.sizePrice.map((size) => {
        sum += parseInt(size.price) * item.quantity;
      });
      item.extraPrice.map((extra) => {
        sum += parseInt(extra.price) * item.quantity;
      });
      item.giftPrice.map((gift) => {
        sum += parseInt(gift.price) * item.quantity;
      });
    });

    return sum + 45;
  }
  let workplaceDetailsHandler = () => {
    if (workplaceDetails) {
      showWorkplaceDetails(false);
    } else {
      showWorkplaceDetails(true);
    }
  };
  let villaDetailsHandler = () => {
    if (villaDetails) {
      showVillaDetails(false);
    } else {
      showVillaDetails(true);
    }
  };
  async function deleteItemHandler(item) {
    const response = await fetch("/api/addToCart", {
      method: "DELETE",
      body: item._id,
    });
    const data = await response.json();
    // console.log(data);
  }

  // firstStep()
  return (
    <>
      <section className={classes.checkoutDetailsGrid}>
        <div className={classes.informationContainer}>
          <h1>Delivery Details</h1>
          <div className={classes.apartmentContainer}>
            <button onClick={apartmentDetailsHandler}>
              Building/Apartment Details
            </button>
            {apartmentDetails && (
              <div className={classes.apartmentDetails}>
                <div className={classes.personalDetailsForm}>
                  <h1>Personal Details</h1>
                  <form onSubmit={apartmentSubmitHandler}>
                    <div>
                      <input
                        type="text"
                        required
                        name="firstName"
                        placeholder="First Name"
                        value={apartmentInputs.firstName}
                        onChange={handleApartmentInputChange}
                      />
                      <input
                        type="text"
                        required
                        placeholder="Last Name"
                        name="lastName"
                        value={apartmentInputs.lastName}
                        onChange={handleApartmentInputChange}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        
                        name="mobile"
                        minLength={11}
                        maxLength={20}
                        placeholder="Mobile Number"
                        value={apartmentInputs.mobile}
                        onChange={handleApartmentInputChange}
                      />
                      <input
                        type="text"
                        name="backupMobile"
                        
                        minLength={11}
                        maxLength={20}
                        placeholder="Whatsapp number"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.backupMobile}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        name="email"
                        placeholder="Email"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.email}
                      />
                    </div>
                    <h1>Address Information</h1>
                    <div>
                      <select
                        id={classes.selectGov}
                        name="governorate"
                        onChange={handleApartmentInputChange}
                      >
                        <option value="Cairo">Cairo</option>
                        <option value="Giza">Giza</option>
                      </select>
                      {/* <input
                        type="text"
                        name="governorate"
                        placeholder="Governorate"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.governorate}
                      /> */}
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="City"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.city}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="area"
                        required
                        placeholder="Area"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.area}
                      />
                      <input
                        type="text"
                        name="street"
                        required
                        placeholder="Street Name"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.street}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="building"
                        required
                        placeholder="Building Number"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.building}
                      />
                      <input
                        type="text"
                        name="floor"
                        required
                        placeholder="Floor"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.floor}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="apartment"
                        required
                        placeholder="Apartment Number"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.apartment}
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Instructions For Delivery"
                        rows="5"
                        name="instructions"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.instructions}
                      />
                    </div>
                    <div>
                      <h1>Payment Method</h1>
                      <select
                        id={classes.payMethodSelect}
                        // defaultValue=""
                        value={payMethod}
                        onChange={(e) => setPayMethod(e.target.value)}
                      >
                        <option value="cash">Cash</option>
                        <option value="visa">Visa</option>
                      </select>
                    </div>
                    {payMethod === "visa" ? (
                      <p className={classes.dateNote}>
                        There is a fee of 2.5% + 2.5EGP on the total order price
                        on visa payments
                      </p>
                    ) : null}

                    <div className={classes.scheduleInputs}>
                      <div>
                        <h1>Schedule Delivery</h1>
                        <input
                          required
                          type="date"
                          name="scheduled"
                          max={maxDate}
                          min={minDate}
                          value={apartmentInputs.scheduled}
                          onChange={handleApartmentInputChange}
                        />
                      </div>
                    </div>
                    <p className={classes.dateNote}>
                      Orders placed after 9PM will be delievered after tomorrow
                    </p>

                    <button
                      id={classes.apartmentSubmitBtn}
                      disabled={disableBtn}
                    >
                      Place Order
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
          <div className={classes.villaContainer}>
            <button onClick={villaDetailsHandler}>Villa/House Details</button>
            {villaDetails && (
              <div className={classes.villaDetails}>
                <div className={classes.personalDetailsForm}>
                  <h1>Personal Details</h1>
                  <form onSubmit={villaSubmitHandler}>
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={villaInputs.firstName}
                        onChange={handleVillaInputChange}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={villaInputs.lastName}
                        onChange={handleVillaInputChange}
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        
                        name="mobile"
                        minLength={11}
                        maxLength={20}
                        placeholder="Mobile Number"
                        value={villaInputs.mobile}
                        onChange={handleVillaInputChange}
                        required
                      />
                      <input
                        type="text"
                        
                        name="backupMobile"
                        minLength={11}
                        maxLength={20}
                        placeholder="Whatsapp Number"
                        onChange={handleVillaInputChange}
                        value={villaInputs.backupMobile}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleVillaInputChange}
                        value={villaInputs.email}
                        required
                      />
                    </div>
                    <h1>Address Information</h1>
                    <div>
                      <select
                        id={classes.selectGov}
                        name="governorate"
                        onChange={handleVillaInputChange}
                      >
                        <option value="Cairo">Cairo</option>
                        <option value="Giza">Giza</option>
                      </select>

                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        onChange={handleVillaInputChange}
                        value={villaInputs.city}
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="area"
                        placeholder="Area"
                        onChange={handleVillaInputChange}
                        value={villaInputs.area}
                        required
                      />
                      <input
                        type="text"
                        name="street"
                        placeholder="Street Name"
                        onChange={handleVillaInputChange}
                        value={villaInputs.street}
                        required
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="villa"
                        placeholder="Villa Number"
                        onChange={handleVillaInputChange}
                        value={villaInputs.villa}
                        required
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Instructions For Delivery"
                        rows="5"
                        name="instructions"
                        value={villaInputs.instructions}
                        onChange={handleVillaInputChange}
                      />
                    </div>
                    <div>
                      <h1>Payment Method</h1>
                      <select
                        id={classes.payMethodSelect}
                        defaultValue=""
                        value={payMethod}
                        onChange={(e) => setPayMethod(e.target.value)}
                      >
                        <option value="cash">Cash</option>
                        <option value="visa">Visa</option>
                      </select>
                    </div>
                    {payMethod === "visa" ? (
                      <p className={classes.dateNote}>
                        There is a fee of 2.5% + 2.5EGP on the total order price
                        on visa payments
                      </p>
                    ) : null}
                    <div className={classes.scheduleInputs}>
                      <div>
                        <h1>Schedule Delivery</h1>
                        <input
                          required
                          type="date"
                          name="scheduled"
                          max={maxDate}
                          min={minDate}
                          value={villaInputs.scheduled}
                          onChange={handleVillaInputChange}
                        />
                      </div>
                    </div>
                    <p className={classes.dateNote}>
                      Orders placed after 9PM will be delievered after tomorrow
                    </p>
                    <button id={classes.villaSubmitBtn} disabled={disableBtn}>
                      Place Order
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
          <div className={classes.workplaceContainer}>
            <button onClick={workplaceDetailsHandler}>Workplace details</button>
            {workplaceDetails && (
              <div className={classes.workplaceDetails}>
                <div className={classes.personalDetailsForm}>
                  <h1>Personal Details</h1>
                  <form onSubmit={companySubmitHandler}>
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        required
                        placeholder="First Name"
                        value={companyInputs.firstName}
                        onChange={handleCompanyInputChange}
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        required
                        name="lastName"
                        value={companyInputs.lastName}
                        onChange={handleCompanyInputChange}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="mobile"
                        minLength={11}
                        maxLength={20}
                        placeholder="Mobile Number"
                        required
                        
                        value={companyInputs.mobile}
                        onChange={handleCompanyInputChange}
                      />
                      <input
                        type="text"
                        
                        name="backupMobile"
                        minLength={11}
                        maxLength={20}
                        placeholder="Whatsapp Number"
                        onChange={handleCompanyInputChange}
                        value={companyInputs.backupMobile}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Email"
                        onChange={handleCompanyInputChange}
                        value={companyInputs.email}
                      />
                    </div>
                    <h1>Address Information</h1>
                    <div>
                      <select
                        id={classes.selectGov}
                        name="governorate"
                        onChange={handleCompanyInputChange}
                      >
                        <option value="Cairo">Cairo</option>
                        <option value="Giza">Giza</option>
                      </select>
                      {/* <input
                        type="text"
                        name="governorate"
                        placeholder="Governorate"
                        onChange={handleCompanyInputChange}
                        value={companyInputs.governorate}
                      /> */}
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="City"
                        onChange={handleCompanyInputChange}
                        value={companyInputs.city}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="area"
                        required
                        placeholder="Area"
                        onChange={handleCompanyInputChange}
                        value={companyInputs.area}
                      />
                      <input
                        type="text"
                        name="street"
                        required
                        placeholder="Street Name"
                        onChange={handleCompanyInputChange}
                        value={companyInputs.street}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="company"
                        required
                        placeholder="Company Name"
                        onChange={handleCompanyInputChange}
                        value={companyInputs.company}
                      />
                    </div>

                    <div>
                      <textarea
                        placeholder="Instructions For Delivery"
                        rows="5"
                        name="instructions"
                        value={companyInputs.instructions}
                        onChange={handleCompanyInputChange}
                      />
                    </div>
                    <div>
                      <h1>Payment Method</h1>
                      <select
                        id={classes.payMethodSelect}
                        defaultValue=""
                        value={payMethod}
                        onChange={(e) => setPayMethod(e.target.value)}
                      >
                        <option value="cash">Cash</option>
                        <option value="visa">Visa</option>
                      </select>
                    </div>
                    {payMethod === "visa" ? (
                      <p className={classes.dateNote}>
                        There is a fee of 2.5% + 2.5EGP on the total order price
                        on visa payments
                      </p>
                    ) : null}
                    <div className={classes.scheduleInputs}>
                      <div>
                        <h1>Schedule Delivery</h1>
                        <input
                          required
                          type="date"
                          name="scheduled"
                          max={maxDate}
                          min={minDate}
                          value={companyInputs.scheduled}
                          onChange={handleCompanyInputChange}
                        />
                      </div>
                    </div>
                    <p className={classes.dateNote}>
                      Orders placed after 9PM will be delievered after tomorrow
                    </p>

                    <button
                      id={classes.workplaceSubmitBtn}
                      disabled={disableBtn}
                    >
                      Place Order
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={classes.invoiceContainer}>
          <h1 onClick={totalDue}>Invoice</h1>
          <hr />
          {renderCart()}
          {renderDeliveryTab()}
        </div>
      </section>
    </>
  );
}

export default CheckoutDetails;
