import classes from "./checkoutDetails.module.css";
import { useEffect, useRef, useState } from "react";
import deleteIcon from "../public/delete.png";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { TextField } from "@mui/material";
import Link from "next/link";
import uuid from "react-uuid";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
// import handleCardPayment from "../pages/api/cardPayment";
const orderid = require("order-id")("key");

function CheckoutDetails(props) {
  const router = useRouter();
  const { data: session } = useSession();
  const apartmentLastIndex = props.apartmentAddressData?.length - 1;

  const [localCart, setLocalCart] = useState([]);
  let [maxDate, setMaxDate] = useState();
  let [minDate, setMinDate] = useState();
  const [muiDate, setMuiDate] = useState();

  const [disableBtn, setDisableBtn] = useState();
  const [visaData, setVisaData] = useState();
  let [totalPrice, setTotalPrice] = useState(calculateTotalPriceDb());
  let [apartmentDetails, showApartmentDetails] = useState(true);

  let [giftPrices, setGiftPrices] = useState([]);
  let [apartmentInputs, setApartmentInputs] = useState({});

  const [payMethod, setPayMethod] = useState("cash");
  const disableDates = (date) => {
    return (
      dayjs(date).format("DD") == 13 ||
      dayjs(date).format("DD") == 14 ||
      dayjs(date).format("DD") == 15 ||
      dayjs(date).format("DD") == 16 ||
      dayjs(date).format("DD") == 17 |
    );
  };

  useEffect(() => {
    if (session) {
      setTotalPrice(calculateTotalPriceDb());
    } else if (!session) {
      setTotalPrice(anonymousTotalDue());
    }
  }, [session]);
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
    }
  }, [session]);
  function renderDeliveryTab() {
    if (props.addedItems?.length != 0) {
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
    if (props.addedItems?.length > 0) {
      return props.addedItems?.map((addedItem) => (
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
          {addedItem.toppings?.map((toppingObj) => {
            if (Object.keys(toppingObj)?.length >= 1) {
              return (
                <p key={uuid()} id={classes.toppingsP}>
                  Toppings
                </p>
              );
            }
          })}
          <div className={classes.toppingDiv}>
            <div>
              {addedItem.toppings?.map((toppingObj) => {
                return Object.keys(toppingObj).map((topping) => (
                  <p key={topping}>{`${topping}`}</p>
                ));
              })}
            </div>
            <div>
              {addedItem.toppings?.map((toppingObj) => {
                return Object.values(toppingObj).map((qt) => (
                  <p key={qt}>{`${qt}x`}</p>
                ));
              })}
            </div>
          </div>
          <div className={classes.flavor}>
            {addedItem.flavors?.length > 1 ? (
              addedItem.flavors?.map((flavor, index) => (
                <p key={index}>
                  <span>{flavor}</span>
                </p>
              ))
            ) : (
              <p>{addedItem.flavors[0]}</p>
            )}
          </div>
          {addedItem.extraPrice?.length === 0 ? null : (
            <div>
              {addedItem.extraPrice?.map((extra, index) => (
                <div className={classes.gift} key={uuid()}>
                  <p>{extra?.extra}</p>
                  <p className={classes.price}>
                    {`${extra?.price} ${extra.quantity}x`}
                  </p>
                </div>
              ))}
            </div>
          )}
          {addedItem.specialBites?.length === 0 ? null : (
            <div>
              {addedItem.specialBites?.map((special, index) => (
                <div className={classes.gift} key={uuid()}>
                  <p>{special?.name}</p>
                  <p className={classes.price}>{`${special?.price}`}</p>
                </div>
              ))}
            </div>
          )}
          {addedItem.giftPrice?.length === 0 ? null : (
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
    } else if (props.addedItems?.length === 0 && !session) {
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
          {addedItem.toppings?.map((toppingObj) => {
            if (Object.keys(toppingObj)?.length >= 1) {
              return (
                <p key={uuid()} id={classes.toppingsP}>
                  Toppings
                </p>
              );
            }
          })}
          <div className={classes.toppingDiv}>
            <div>
              {addedItem.toppings?.map((toppingObj) => {
                return Object.keys(toppingObj).map((topping) => (
                  <p key={topping}>{`${topping}`}</p>
                ));
              })}
            </div>
            <div>
              {addedItem.toppings?.map((toppingObj) => {
                return Object.values(toppingObj).map((qt) => (
                  <p key={qt}>{`${qt}x`}</p>
                ));
              })}
            </div>
          </div>
          <div className={classes.flavor}>
            {addedItem.flavors?.length > 1 ? (
              addedItem.flavors?.map((flavor, index) => (
                <p key={index}>
                  <span>{flavor}</span>
                </p>
              ))
            ) : (
              <p>{addedItem.flavors[0]}</p>
            )}
          </div>
          {addedItem.extraPrice?.length === 0 ? null : (
            <div>
              {addedItem.extraPrice?.map((extra, index) => (
                <div className={classes.gift} key={uuid()}>
                  <p>{extra.extra}</p>
                  <p className={classes.price}>
                    {extra?.price * addedItem.quantity}
                  </p>
                </div>
              ))}
            </div>
          )}
          {addedItem.specialBites?.length === 0 ? null : (
            <div>
              {addedItem.specialBites?.map((special, index) => (
                <div className={classes.gift} key={uuid()}>
                  <p>{special?.name}</p>
                  <p className={classes.price}>{`${special?.price}`}</p>
                </div>
              ))}
            </div>
          )}
          {addedItem.giftPrice?.length === 0 ? null : (
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
          console.log(error);
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
          console.log(error);
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

    const internalRequest = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(orderData),
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
        email: apartmentInputs.email,
        floor: "N/A",
        first_name: apartmentInputs.firstName,

        street: "N/A",
        building: "N/A",
        phone_number: apartmentInputs.mobile,
        shipping_method: "N/A",
        postal_code: "N/A",
        city: "N/A",
        country: "EG",
        last_name: apartmentInputs.lastName,
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
    let tomorrowDate = dayjs().add(1, "day").format("YYYY-MM-DD");
    let afterTomorrowDate = dayjs().add(2, "day").format("YYYY-MM-DD");
    let date = dayjs().add(7, "day").format("YYYY-MM-DD");

    setMaxDate(date);
    if (currentTime >= 21) {
      setMinDate(afterTomorrowDate);
    } else {
      setMinDate(tomorrowDate);
    }
    
  }, []);
  useEffect(() => {
  if (minDate === "2023-09-13") {
      setMuiDate("2023-09-14");
    } else if (minDate === '2023-09-17') {
      setMuiDate("2023-09-18");
    } else {
      setMuiDate(minDate);
    }
  }, [minDate]);
  function calculateTotalPriceDb() {
    let sum = 0;
    props.addedItems?.map((item) => {
      item.sizePrice.map((size) => {
        sum += parseInt(size?.price) * item.quantity;
      });
      item.extraPrice?.map((extra) => {
        sum += parseInt(extra?.price) * item.quantity;
      });
      item.giftPrice?.map((gift) => {
        sum += parseInt(gift?.price) * item.quantity;
      });
      item.specialBites?.map((bite) => (sum += parseInt(bite.price)));
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
        if (props.addedItems?.length === 0) {
          toast.error("Please Add Items To Your Cart");
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
            scheduled: muiDate,
            totalPrice: calculateTotalPriceDb(),
          };
          if (payMethod === "visa") {
            firstStep(orderData);
          } else if (payMethod === "cash") {
            fetch("/api/checkout", {
              method: "POST",
              body: JSON.stringify(orderData),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => {
                toast.success("Checked out!");
                console.log(res);
                setTimeout(() => {
                  router.push("/thankyou");
                }, 2000);
                // sendMail();
                // sendClientMail(apartmentInputs);
              })
              .catch((err) => toast.error(err));
          }
        }
      } catch (e) {
        console.log(e.message);
      }
    } else if (!session) {
      try {
        if (localCart?.length === 0) {
          toast.error("Please Add Items To Your Cart");
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
            scheduled: muiDate,
            totalPrice: anonymousTotalDue(),
          };

          // const data = await response.json();

          if (payMethod === "visa") {
            firstStep(orderData);
          } else if (payMethod === "cash") {
            fetch("/api/checkout", {
              method: "POST",
              body: JSON.stringify(orderData),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => {
                if (res.statusText === "Created" || res.status === 201) {
                  toast.success("Checked out!");
                  console.log(res);
                  sendMail();
                  sendClientMail(apartmentInputs);
                  setTimeout(() => {
                    router.push("/thankyou");
                  }, 2000);
                } else {
                  console.log(res);
                  toast.error("Something went wrong, try again");
                }
              })
              .catch((err) => toast.error(err));
          }
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  function handleApartmentInputChange(e) {
    const { name, value } = e.target;
    setApartmentInputs({ ...apartmentInputs, [name]: value });
  }

  function totalDue() {
    let sum = 0;

    props.addedItems?.map((item) => {
      item.sizePrice?.map((size) => {
        sum += parseInt(size?.price) * item.quantity;
      });
      item.extraPrice?.map((extra) => {
        sum += parseInt(extra?.price) * item.quantity;
      });
      item.giftPrice?.map((gift) => {
        sum += parseInt(gift?.price) * item.quantity;
      });
      item.specialBites?.map((bite) => (sum += parseInt(bite.price)));
    });

    return sum + 45;
  }
  function anonymousTotalDue() {
    let sum = 0;

    localCart?.map((item) => {
      item.sizePrice?.map((size) => {
        sum += parseInt(size.price) * item.quantity;
      });
      item.extraPrice?.map((extra) => {
        sum += parseInt(extra.price) * item.quantity;
      });
      item.giftPrice?.map((gift) => {
        sum += parseInt(gift.price) * item.quantity;
      });
      item.specialBites?.map((bite) => (sum += parseInt(bite.price)));
    });

    return sum + 45;
  }

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
            {apartmentDetails && (
              <div className={classes.apartmentDetails}>
                <div className={classes.personalDetailsForm}>
                  <form onSubmit={apartmentSubmitHandler}>
                    <div>
                      <input
                        type="text"
                        className={classes.styledInput}
                        required
                        name="firstName"
                        placeholder="First Name"
                        value={apartmentInputs.firstName}
                        onChange={handleApartmentInputChange}
                      />
                      <input
                        type="text"
                        className={classes.styledInput}
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
                        className={classes.styledInput}
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
                        className={classes.styledInput}
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
                        className={classes.styledInput}
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
                        className={classes.styledInput}
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
                        className={classes.styledInput}
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
                        className={classes.styledInput}
                        name="area"
                        required
                        placeholder="Area"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.area}
                      />
                      <input
                        type="text"
                        className={classes.styledInput}
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
                        className={classes.styledInput}
                        name="building"
                        required
                        placeholder="Building Number"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.building}
                      />
                      <input
                        type="text"
                        className={classes.styledInput}
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
                        className={classes.styledInput}
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
                        className={classes.styledInput}
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
                        className={classes.styledInput}
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div className={classes.scheduleInputs}>
                        <div>
                          <h1>Select delivery date</h1>
                          <DatePicker
                            // onChange={handleApartmentInputChange}
                            // value={apartmentInputs.scheduled}
                            value={muiDate}
                            onChange={(e) => setMuiDate(e.format("YYYY-MM-DD"))}
                            inputFormat="YYYY-MM-DD"
                            minDate={minDate}
                            maxDate={maxDate}
                            shouldDisableDate={disableDates}
                            className={classes.muiInput}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                sx={{
                                  ".MuiSvgIcon-root": { fill: "#ff5689" },
                                  ".MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#ff5689",
                                    borderRadius: "10px",
                                  },
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </LocalizationProvider>

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
