import classes from "./checkoutDetails.module.css";
import { use, useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
function checkoutDetails() {
  let [apartmentDetails, showApartmentDetails] = useState(false)
  let [villaDetails, showVillaDetails] = useState(false)
  let [workplaceDetails, showWorkplaceDetails] = useState(false)
  let apartmentDetailsHandler = () => {
    if(apartmentDetails) {
      showApartmentDetails(false)
    } else {
      showApartmentDetails(true)
    }
  }
  let workplaceDetailsHandler = () => {
    if(workplaceDetails) {
      showWorkplaceDetails(false)
    } else {
      showWorkplaceDetails(true)
    }
  }
  let villaDetailsHandler = () => {
    if(villaDetails) {
      showVillaDetails(false)
    } else {
      showVillaDetails(true)
    }
  }
  return (
    <>
    <Navbar/>
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
                  <form>
                    <div>
                      <input type="text" placeholder="First Name" />
                      <input type="text" placeholder="Last Name" />
                    </div>
                    <div>
                      <input type="number" placeholder="Mobile Number" />
                      <input type="number" placeholder="Backup Mobile Number" />
                    </div>
                    <div>
                      <input type="email" placeholder="Email" />
                    </div>
                    <h1>Address Information</h1>
                    <div>
                      <input type="text" placeholder="Governorate" />
                      <input type="text" placeholder="City" />
                    </div>
                    <div>
                      <input type="text" placeholder="Street" />
                      <input type="text" placeholder="Building No." />
                    </div>
                    <div>
                      <input type="text" placeholder="Floor" />
                      <input type="text" placeholder="Apartment No." />
                    </div>
                    <div>
                      <textarea
                        placeholder="Instructions For Delivery"
                        rows="5"
                      />
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
                      <input type="text" placeholder="First Name" />
                      <input type="text" placeholder="Last Name" />
                    </div>
                    <div>
                      <input type="number" placeholder="Mobile Number" />
                      <input type="number" placeholder="Backup Mobile Number" />
                    </div>
                    <div>
                      <input type="email" placeholder="Email" />
                    </div>
                    <h1>Address Information</h1>
                    <div>
                      <input type="text" placeholder="Governorate" />
                      <input type="text" placeholder="City" />
                    </div>
                    <div>
                      <input type="text" placeholder="Street" />
                      <input type="text" placeholder="Building No." />
                    </div>
                    <div>
                      <input type="text" placeholder="Floor" />
                      <input type="text" placeholder="Apartment No." />
                    </div>
                    <div>
                      <textarea
                        placeholder="Instructions For Delivery"
                        rows="5"
                      />
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
                      <input type="text" placeholder="First Name" />
                      <input type="text" placeholder="Last Name" />
                    </div>
                    <div>
                      <input type="number" placeholder="Mobile Number" />
                      <input type="number" placeholder="Backup Mobile Number" />
                    </div>
                    <div>
                      <input type="email" placeholder="Email" />
                    </div>
                    <h1>Address Information</h1>
                    <div>
                      <input type="text" placeholder="Governorate" />
                      <input type="text" placeholder="City" />
                    </div>
                    <div>
                      <input type="text" placeholder="Street" />
                      <input type="text" placeholder="Building No." />
                    </div>
                    <div>
                      <input type="text" placeholder="Floor" />
                      <input type="text" placeholder="Apartment No." />
                    </div>
                    <div>
                      <textarea
                        placeholder="Instructions For Delivery"
                        rows="5"
                      />
                    </div>
                    <button id={classes.workplaceSubmitBtn}>Place Order</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={classes.invoiceContainer}>
          <h1>Invoice</h1>
          <hr />
          <div className={classes.item}>
            <h1>1x Basic Cheesecake</h1>

            <div className={classes.size}>
              <p>Mini</p>
              <p className={classes.price}>150EGP</p>
            </div>
            <div className={classes.flavor}>
              <p>Caramel</p>
            </div>
            <div className={classes.gift}>
              <p>Bouqet</p>
              <p className={classes.price}>130EGP</p>
            </div>
          </div>
          <hr />
          <div className={classes.vat}>
            <p>
              VAT<sub>14%</sub>
            </p>
            <p className={classes.price}>53EGP</p>
          </div>
          <div className={classes.deliveryFee}>
            <p>Delivery</p>
            <p className={classes.price}>25EGP</p>
          </div>
          <div className={classes.total}>
            <p>Total</p>
            <p className={classes.price}>500EGP</p>
          </div>
          <button className={classes.addMoreItems}>Add More Items</button>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default checkoutDetails;
