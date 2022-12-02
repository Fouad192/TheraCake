import classes from "./checkoutDetails.module.css";
import { useEffect, useRef, useState } from "react";
import deleteIcon from "../public/delete.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import uuid from "react-uuid";
import AddItem from "./addItem";

const orderid = require("order-id")("key");

function CheckoutDetails(props) {
  const router = useRouter();
  const { data: session } = useSession();
  const apartmentLastIndex = props.apartmentAddressData.length - 1;
  const villaLastIndex = props.villaAddressData.length - 1;
  const companyLastIndex = props.companyAddressData.length - 1;

  let [maxDate, setMaxDate] = useState();
  let [minDate, setMinDate] = useState();

  useEffect(() => {
    if (props.apartmentAddressData[apartmentLastIndex]) {
      let initialApartmentAddressDetails = {
        firstName: props.apartmentAddressData[apartmentLastIndex].firstName,
        lastName: props.apartmentAddressData[apartmentLastIndex].lastName,
        mobile: props.apartmentAddressData[apartmentLastIndex].mobile,
        backupMobile:
          props.apartmentAddressData[apartmentLastIndex].backupMobile,
        email: props.apartmentAddressData[apartmentLastIndex].email,
        governorate: props.apartmentAddressData[apartmentLastIndex].governorate,
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
    } else if (!props.apartmentAddressData[apartmentLastIndex]) {
      setApartmentInputs({});
    }
    if (props.villaAddressData[villaLastIndex]) {
      let initialVillaAddressDetails = {
        firstName: props.villaAddressData[villaLastIndex].firstName,
        lastName: props.villaAddressData[villaLastIndex].lastName,
        mobile: props.villaAddressData[villaLastIndex].mobile,
        backupMobile: props.villaAddressData[villaLastIndex].backupMobile,
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
        backupMobile: props.companyAddressData[companyLastIndex].backupMobile,
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
  }, []);

  useEffect(() => {
    let date = new Date(new Date().setDate(new Date().getDate() + 7));
    console.log(date);
    let formattedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
    setMaxDate(formattedDate);
    let todayDate = new Date();
    let formattedTodayDate = new Date(
      todayDate.getTime() - todayDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
    setMinDate(formattedTodayDate);
  });
  // useEffect(() => {
  //   // if("geolocation" in navigator) {
  //   //   console.log('Available')
  //   // } else {
  //   //   console.log('Not available')
  //   // }
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     console.log(`Latitude is ${position.coords.latitude}`);
  //     console.log(`Longitude is ${position.coords.longitude}`);
  //   });
  // }, []);
  let [apartmentDetails, showApartmentDetails] = useState(false);
  let [villaDetails, showVillaDetails] = useState(false);
  let [workplaceDetails, showWorkplaceDetails] = useState(false);
  let [giftPrices, setGiftPrices] = useState([]);
  let [apartmentInputs, setApartmentInputs] = useState({});
  let [villaInputs, setVillaInputs] = useState({});
  let [companyInputs, setCompanyInputs] = useState({});
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
    sum = sum * 0.14 + sum + 45;
    return sum;
  }
  async function apartmentSubmitHandler(e) {
    e.preventDefault();
  
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
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  
      setTimeout(() => {
        router.push("/history");
      }, 500);
  }
  async function villaSubmitHandler(e) {
    e.preventDefault();


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
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setTimeout(() => {
      router.push("/history");
    }, 500);
  }
  async function companySubmitHandler(e) {
    e.preventDefault();

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
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
        setTimeout(() => {
          router.push("/history");
        }, 500);
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

    return sum + vatAmount() + 45;
  }
  function vatAmount() {
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
    let vat = sum * (14 / 100);
    return parseInt(vat);
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
    console.log(data);
  }
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
                        name="firstName"
                        placeholder="First Name"
                        value={apartmentInputs.firstName}
                        onChange={handleApartmentInputChange}
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={apartmentInputs.lastName}
                        onChange={handleApartmentInputChange}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={apartmentInputs.mobile}
                        onChange={handleApartmentInputChange}
                      />
                      <input
                        type="number"
                        name="backupMobile"
                        placeholder="Backup Mobile Number"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.backupMobile}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
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
                        placeholder="City"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.city}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="area"
                        placeholder="Area"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.area}
                      />
                      <input
                        type="text"
                        name="street"
                        placeholder="Street Name"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.street}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="building"
                        placeholder="Building Number"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.building}
                      />
                      <input
                        type="text"
                        name="floor"
                        placeholder="Floor"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.floor}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="apartment"
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
                    <div className={classes.scheduleInputs}>
                      <div>
                        <h1>Schedule Delivery</h1>
                        <input
                          type="date"
                          name="scheduled"
                          max={maxDate}
                          min={minDate}
                          value={apartmentInputs.scheduled}
                          onChange={handleApartmentInputChange}
                        />
                      </div>
                    </div>
                    <button id={classes.apartmentSubmitBtn}>Place Order</button>
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
                        type="number"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={villaInputs.mobile}
                        onChange={handleVillaInputChange}
                        required
                      />
                      <input
                        type="number"
                        name="backupMobile"
                        placeholder="Backup Mobile Number"
                        onChange={handleVillaInputChange}
                        value={villaInputs.backupMobile}
                        required
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
                    <div className={classes.scheduleInputs}>
                      <div>
                        <h1>Schedule Delivery</h1>
                        <input
                          type="date"
                          name="scheduled"
                          max={maxDate}
                          min={minDate}
                          value={villaInputs.scheduled}
                          onChange={handleVillaInputChange}
                        />
                      </div>
                    </div>
                    <button id={classes.villaSubmitBtn}>Place Order</button>
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
                        placeholder="First Name"
                        value={companyInputs.firstName}
                        onChange={handleCompanyInputChange}
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={companyInputs.lastName}
                        onChange={handleCompanyInputChange}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={companyInputs.mobile}
                        onChange={handleCompanyInputChange}
                      />
                      <input
                        type="number"
                        name="backupMobile"
                        placeholder="Backup Mobile Number"
                        onChange={handleCompanyInputChange}
                        value={companyInputs.backupMobile}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
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
                        placeholder="City"
                        onChange={handleCompanyInputChange}
                        value={companyInputs.city}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="area"
                        placeholder="Area"
                        onChange={handleCompanyInputChange}
                        value={companyInputs.area}
                      />
                      <input
                        type="text"
                        name="street"
                        placeholder="Street Name"
                        onChange={handleCompanyInputChange}
                        value={companyInputs.street}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="company"
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
                    <div className={classes.scheduleInputs}>
                      <div>
                        <h1>Schedule Delivery</h1>
                        <input
                          type="date"
                          name="scheduled"
                          max={maxDate}
                          min={minDate}
                          value={companyInputs.scheduled}
                          onChange={handleCompanyInputChange}
                        />
                      </div>
                    </div>
                    <button id={classes.workplaceSubmitBtn}>Place Order</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={classes.invoiceContainer}>
          <h1 onClick={totalDue}>Invoice</h1>
          <hr />
          {props.addedItems.map((addedItem) => (
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
              <div className={classes.flavor}>
                {addedItem.flavors.length > 1 ? (
                  addedItem.flavors.map((flavor) => (
                    <p>
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
          ))}
          {props.addedItems.length != 0 && (
            <>
              <div className={classes.vat}>
                <p>
                  VAT<sub>14%</sub>
                </p>
                <p className={classes.price}>{vatAmount()}</p>
              </div>
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
          )}
        </div>
      </section>
    </>
  );
}

export default CheckoutDetails;
