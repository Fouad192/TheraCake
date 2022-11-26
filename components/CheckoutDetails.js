import classes from "./checkoutDetails.module.css";
import { useRef, useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import deleteIcon from "../public/delete.png";
import Image from "next/image";
const orderid = require('order-id')('key')
function checkoutDetails(props) {
  let [apartmentDetails, showApartmentDetails] = useState(false);
  let [villaDetails, showVillaDetails] = useState(false);
  let [workplaceDetails, showWorkplaceDetails] = useState(false);
  let [giftPrices, setGiftPrices] = useState([]);
  let [apartmentInputs, setApartmentInputs] = useState({});
  let [villaInputs, setVillaInputs] = useState({});
  let [companyInputs, setCompanyInputs] = useState({});
   async function apartmentSubmitHandler(e) {
     e.preventDefault();
     let thisOrderId = orderid.generate()
     let currentTime = orderid.getTime(thisOrderId)
     const orderData = {
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
       street: apartmentInputs.street,
       building: apartmentInputs.building,
       floor: apartmentInputs.floor,
       apartment: apartmentInputs.apartment,
       instructions: apartmentInputs.instructions,
       scheduled: apartmentInputs.scheduled

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
    for (let i = 0; i <= props.addedItems.length - 1; i++) {
      sum +=
        parseInt(props.addedItems[i].sizePrice[0].price) *
        parseInt(props.addedItems[i].quantity);
    }
    return sum + vatAmount();
  }
  function vatAmount() {
    let sum = 0;
    for (let i = 0; i <= props.addedItems.length - 1; i++) {
      sum +=
        parseInt(props.addedItems[i].sizePrice[0].price) *
        parseInt(props.addedItems[i].quantity);
    }
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
      <Navbar />
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
                      <input
                        type="text"
                        name="governorate"
                        placeholder="Governorate"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.governorate}
                      />
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
                        name="street"
                        placeholder="Street"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.street}
                      />
                      <input
                        type="text"
                        name="building"
                        placeholder="Building No."
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.building}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="floor"
                        placeholder="Floor"
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.floor}
                      />
                      <input
                        type="text"
                        name="apartmentNo"
                        placeholder="Apartment No."
                        onChange={handleApartmentInputChange}
                        value={apartmentInputs.apartmentNo}
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
                  <form>
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={villaInputs.firstName}
                        onChange={handleVillaInputChange}
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={villaInputs.lastName}
                        onChange={handleVillaInputChange}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Mobile Number"
                        name="mobile"
                        value={villaInputs.mobile}
                        onChange={handleVillaInputChange}
                      />
                      <input
                        type="number"
                        placeholder="Backup Mobile Number"
                        name="backupMobile"
                        value={villaInputs.backupMobile}
                        onChange={handleVillaInputChange}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={villaInputs.email}
                        onChange={handleVillaInputChange}
                      />
                    </div>
                    <h1>Address Information</h1>
                    <div>
                      <input
                        type="text"
                        placeholder="Governorate"
                        name="governorate"
                        value={villaInputs.governorate}
                        onChange={handleVillaInputChange}
                      />
                      <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={villaInputs.city}
                        onChange={handleVillaInputChange}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Street"
                        name="street"
                        value={villaInputs.street}
                        onChange={handleVillaInputChange}
                      />
                      <input
                        type="text"
                        placeholder="Villa No."
                        name="villa"
                        value={villaInputs.villa}
                        onChange={handleVillaInputChange}
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
                  <form>
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
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
                        placeholder="Mobile Number"
                        name="mobile"
                        value={companyInputs.mobile}
                        onChange={handleCompanyInputChange}
                      />
                      <input
                        type="number"
                        placeholder="Backup Mobile Number"
                        name="backupMobile"
                        value={companyInputs.backupMobile}
                        onChange={handleCompanyInputChange}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={companyInputs.email}
                        onChange={handleCompanyInputChange}
                      />
                    </div>
                    <h1>Address Information</h1>
                    <div>
                      <input
                        type="text"
                        placeholder="Governorate"
                        name="governorate"
                        value={companyInputs.governorate}
                        onChange={handleCompanyInputChange}
                      />
                      <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={companyInputs.city}
                        onChange={handleCompanyInputChange}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Street"
                        name="street"
                        value={companyInputs.street}
                        onChange={handleCompanyInputChange}
                      />
                      <input
                        type="text"
                        placeholder="Building No."
                        name="companyName"
                        value={companyInputs.companyName}
                        onChange={handleCompanyInputChange}
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
            <div className={classes.item}>
              <div>
                <h1>{`${addedItem.quantity}x ${addedItem.name}`}</h1>
                <Image
                  src={deleteIcon}
                  onClick={() => deleteItemHandler(addedItem)}
                />
              </div>

              <div className={classes.size}>
                <p>{addedItem.sizePrice[0].size}</p>
                <p className={classes.price}>
                  {addedItem.sizePrice[0].price * addedItem.quantity}
                </p>
              </div>
              <div className={classes.flavor}>
                <p>{addedItem.flavors[0]}</p>
              </div>
              {addedItem.extraPrice.length === 0 ? null : (
                <div>
                  {addedItem.extraPrice.map((extra, index) => (
                    <div className={classes.gift}>
                      <p>{extra.extra}</p>
                      <p className={classes.price}>{extra.price}</p>
                    </div>
                  ))}
                </div>
              )}
              {addedItem.giftPrice.length === 0 ? null : (
                <div>
                  {addedItem.giftPrice.map((gift, index) => (
                    <div className={classes.gift}>
                      <p>{gift.gift}</p>
                      <p className={classes.price}>{gift.price}</p>
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
          <div className={classes.vat}>
            <p>
              VAT<sub>14%</sub>
            </p>
            <p className={classes.price}>{vatAmount()}</p>
          </div>
          <div className={classes.deliveryFee}>
            <p>Delivery</p>
            <p className={classes.price}>25EGP</p>
          </div>
          <div className={classes.total}>
            <p>Total</p>
            <p className={classes.price}>{totalDue()}</p>
          </div>
          <button className={classes.addMoreItems}>Add More Items</button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default checkoutDetails;
