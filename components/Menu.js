import classes from "./menu.module.css";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import deleteIcon from "../public/delete.png";
import editIcon from "../public/edit.png";
import AddItem from "./addItem";
import SelectionPanel from "./selectionPanel";
import EditItem from "./editItem";
import { Badge } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import uuid from "react-uuid";

function Menu(props) {
  const router = useRouter()
  let [addItemPopup, toggleAddItemPopup] = useState(false);
  let [idx, setIdx] = useState();
  let [categoryDetect, setCategoryDetect] = useState(false);
  let [editItemPopup, openEditItem] = useState(false);
  let [toBeEdited, setToBeEdited] = useState();
  let [isAuthorized, setAuthorized] = useState(false);
  let cheesecake = useRef();
  let brownies = useRef();
  let cheesecakeMenu = useRef();
  let browniesMenu = useRef();
  let [itemProps, setItemProps] = useState()
  useEffect(() => {
    if (props?.session) {
      if (props.session.user.email === "anwarcitcm@gmail.com") {
        setAuthorized(true);
      } else if (props.session.user.email === "as6993507@gmail.com") {
        setAuthorized(true);
      } else if (props.session.user.email === "mohamedaymanmoudy1@gmail.com") {
        setAuthorized(true);
      } else if (session.user.email === "esraa.mostafa6.em@gmail.com") {
        setAuthorized(true);
      } else if (props?.session?.user.email === "theracakecairo@gmail.com") {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    }
  }, [isAuthorized]);

  let toggleAddItemBtn = () => {
    toggleAddItemPopup(true);
  };
  let cheesecakes = props.cheesecakeMenuData;
  let browniesData = props.browniesMenuData;
  let selectedData = cheesecakes.concat(browniesData);
  function returnSelectionPanel() {
    if (categoryDetect === "cheesecake") {
      
      return <SelectionPanel selectionData={cheesecakes[idx]} />;
    } else if (categoryDetect === "brownies") {
      return <SelectionPanel selectionData={browniesData[idx]} />;
    } else {
      return null;
    }
  }
  let cheesecakeMenuHandler = () => {
    cheesecake.current.style.color = "#E31552";
    cheesecake.current.style.backgroundColor = "#FFC9D9";
    brownies.current.style.color = "#464646";
    brownies.current.style.backgroundColor = "#F1F1F1";
    cheesecakeMenu.current.style.display = "flex";
    browniesMenu.current.style.display = "none";
  };
  let browniesMenuHandler = () => {
    brownies.current.style.color = "#FFA800";
    brownies.current.style.backgroundColor = "#7E454D";
    cheesecake.current.style.color = "#464646";
    cheesecake.current.style.backgroundColor = "#F1F1F1";
    browniesMenu.current.style.display = "flex";
    cheesecakeMenu.current.style.display = "none";
  };
  async function addItemHandler(enteredMenuData) {
    const response = await fetch("/api/newMenuItem", {
      method: "POST",
      body: JSON.stringify(enteredMenuData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  }
  async function deleteItemHandler(item) {
    const response = await fetch("/api/newMenuItem", {
      method: "DELETE",
      body: item._id,
    });
    const data = await response.json();
  }

  return (
    <>
      <section className={classes.menuGrid}>
        {addItemPopup && (
          <AddItem
            toggleAddItemPopup={toggleAddItemPopup}
            onAddItem={addItemHandler}
            key="addItem"
          />
        )}
        {editItemPopup && (
          <EditItem data={toBeEdited} openEditItem={openEditItem} />
        )}
        <div className={classes.menuItems}>
          <div className={classes.menuNavigation}>
            <button ref={cheesecake} onClick={cheesecakeMenuHandler}>
              Cheesecake
            </button>
            <button ref={brownies} onClick={browniesMenuHandler}>
              Brownies
            </button>
          </div>
          <div className={classes.offer}>
            <p>We are off until 17th of September due to maintenance</p>
          </div>
          {isAuthorized ? (
            <button className={classes.addItemBtn} onClick={toggleAddItemBtn}>
              Add Item
            </button>
          ) : null}
          <div className={classes.checkoutDiv}>
            <Badge badgeContent={props?.count} color="primary">
              <Link href="/checkout">Checkout</Link>
            </Badge>
          </div>
          <div
            className={classes.cheesecakeMenuItemContainer}
            ref={cheesecakeMenu}
          >
            <div className={classes.menuItem} key={uuid()}>
              <div className={classes.menuItemDetails}>
                <div className={classes.nameFlavor}>
                  <h1>The Blooming Cheesecake Box</h1>

                  <p>
                    Celebration box it combines 5 flowers blooming with
                    delicious cheesecake (mini or small) inside the box!
                  </p>
                </div>

                <div className={classes.priceBtnDiv}>
                  <p style={{ fontWeight: "600" }}>
                    Order via whatsapp <br />
                    <a
                      href="https://wa.me/201029283671"
                      style={{ color: "#ff5689" }}
                    >
                      01029283671
                    </a>
                  </p>
                </div>
              </div>
              <div className={classes.menuItemImage}>
                <Image
                  src="https://res.cloudinary.com/dswtzq3ze/image/upload/v1686155730/Menu/stoozrkqd6j2fjtyszx9.jpg"
                  alt="basicCake"
                  width={150}
                  height={150}
                />
              </div>
            </div>
            <div className={classes.menuItem} key={uuid()}>
              <div className={classes.menuItemDetails}>
                <div className={classes.nameFlavor}>
                  <h1>Bloom & Bite Box</h1>

                  <p>
                    Celebration box it combines 6 flowers blooming with the
                    delicious bites cheesecake and brownies inside the box!
                  </p>
                </div>

                <div className={classes.priceBtnDiv}>
                  <p style={{ fontWeight: "600" }}>
                    Order via whatsapp <br />
                    <a
                      href="https://wa.me/201029283671"
                      style={{ color: "#ff5689" }}
                    >
                      01029283671
                    </a>
                  </p>
                </div>
              </div>
              <div className={classes.menuItemImage}>
                <Image
                  src="https://res.cloudinary.com/dswtzq3ze/image/upload/v1686922860/newcsake_nssmdr.jpg"
                  alt="basicCake"
                  width={150}
                  height={150}
                />
              </div>
            </div>
            {cheesecakes?.map((item, index) => (
              <div className={classes.menuItem} key={uuid()}>
                <div className={classes.menuItemDetails}>
                  {isAuthorized && (
                    <div className={classes.adminModifyAndDelete}>
                      <Image
                        src={deleteIcon}
                        alt="DeleteIcon"
                        onClick={() => {
                          deleteItemHandler(item);
                          setTimeout(() => {
                            router.reload(window.location.pathname);
                          }, 500);
                        }}
                      />
                      <Image
                        src={editIcon}
                        alt="EditIcon"
                        onClick={() => {
                          setToBeEdited(item);
                          openEditItem(true);
                        }}
                      />
                    </div>
                  )}
                  <div className={classes.nameFlavor}>
                    <h1>{item.name}</h1>

                    <p>
                      {item.flavors.map((flavor, index, flavorArray) => {
                        if (flavorArray.length - 1 === index) {
                          return <span key={uuid()}>{flavor}</span>;
                        } else if (index < 4) {
                          return <span key={uuid()}>{flavor}/</span>;
                        }
                      })}
                    </p>
                  </div>

                  <div className={classes.priceBtnDiv}>
                    <button
                      onClick={() => {
                        // setIdx(index);
                        // setCategoryDetect("cheesecake");
                        setItemProps(item);
                      }}
                    >
                      Select Your Options
                    </button>

                    {/* <p style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
                        Out Of Stock
                      </p>
                   */}
                    <p>
                      {item.sizePrice[0].price} -{" "}
                      {item.sizePrice[item.sizePrice.length - 1].price} EGP
                    </p>
                  </div>
                </div>
                <div className={classes.menuItemImage}>
                  <Image
                    src={item.img}
                    alt="basicCake"
                    width={150}
                    height={150}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={classes.browniesMenuItemContainer} ref={browniesMenu}>
            {browniesData?.map((item, index) => (
              <div className={classes.menuItem} key={uuid()}>
                <div className={classes.menuItemDetails}>
                  {isAuthorized && (
                    <div className={classes.adminModifyAndDelete}>
                      <Image
                        src={deleteIcon}
                        alt="DeleteIcon"
                        onClick={() => {
                          deleteItemHandler(item);
                          setTimeout(() => {
                            router.reload(window.location.pathname);
                          }, 500);
                        }}
                      />
                      <Image
                        src={editIcon}
                        alt="EditIcon"
                        onClick={() => {
                          setToBeEdited(item);
                          openEditItem(true);
                        }}
                      />
                    </div>
                  )}
                  <h1>{item.name}</h1>
                  <p>
                    {item.toppings.map((topping, index, toppingArray) => {
                      if (toppingArray.length - 1 === index) {
                        return <span key={uuid()}>{topping}</span>;
                      } else if (index < 4)
                        return <span key={uuid()}>{topping}/</span>;
                    })}
                  </p>
                  <div className={classes.priceBtnDiv}>
                    {item.name === "Covert brownies " ? null : (
                      <button
                        onClick={() => {
                          // setIdx(index);
                          // setCategoryDetect("cheesecake");
                          setItemProps(item);
                        }}
                      >
                        Select Your Options
                      </button>
                    )}

                    {item.name === "Covert brownies " ? (
                      <p style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
                        Out Of Stock
                      </p>
                    ) : (
                      <p>
                        {item.sizePrice[0].price} -{" "}
                        {item.sizePrice[item.sizePrice.length - 1].price} EGP
                      </p>
                    )}
                    {/* <button
                 
                    <p>
                      {item.sizePrice[0].price}{" "}
                      {item.sizePrice.length > 1
                        ? `- ${item.sizePrice[item.sizePrice.length - 1].price}`
                        : null}{" "}
                      EGP
                    </p> */}
                  </div>
                </div>
                <div className={classes.menuItemImage}>
                  <Image
                    src={item.img}
                    alt="basicCake"
                    width={150}
                    height={150}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {itemProps ? <SelectionPanel selectionData={itemProps} /> : null}

        {/* {returnSelectionPanel()} */}
      </section>
    </>
  );
}

export default Menu;
