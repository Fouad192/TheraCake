import classes from "./selectionPanel.module.css";
import basicSelectionImg from "../public/basicSelectionImg.png";
import Image from "next/image";
import plusIcon from "../public/icon/plus.svg";
import minusIcon from "../public/icon/minus.png";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import uuid from "react-uuid";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
function SelectionPanel(props) {
  const router = useRouter();

  let [quantity, setQuantity] = useState(1);
  let [selectedSize, setSelectedSize] = useState();
  let [selectedFlavor, setSelectedFlavor] = useState([]);
  let [selectedExtra, setSelectedExtra] = useState([]);
  let [selectedGift, setSelectedGift] = useState([]);
  let [selectedToppings, setSelectedToppings] = useState({});
  let [selectedFreeExtra, setSelectedFreeExtra] = useState(
    "No Free Extra Pistachio"
  );

  let [notes, setNotes] = useState();
  // let [props.selectionData, setCurrMenuItem] = useState(props.selectionData)
  let [maxToppings, setMaxToppings] = useState();
  let [currCheckedSize, setCheckedSize] = useState();
  let selectionPanelRef = useRef();
  let toppingCountRef = useRef([]);
  let quantityRef = useRef();
  let addToInvoiceFlash = useRef();
  useEffect(() => {
    console.log("re-rendered");
  });
  const { data: session } = useSession();
  function isLoggedIn() {
    if (!session) {
      return (
        <div
          className={classes.checkoutBtnDiv}
          style={{ position: "absolute", bottom: "0", backgroundColor: "white" }}
        >
          <div style={{position: 'sticky'}}>
            <button className={classes.menuFormSubmit} onClick={() => signIn()}>
              Add To Cart
            </button>
          </div>
        </div>
      );
    } else if (session) {
      return (
        <div
          className={classes.checkoutBtnDiv}
          style={{
            position: "absolute",
            bottom: "0",
            backgroundColor: "white",
          }}
        >
          <div style={{ position: "sticky" }}>
            <button
              className={classes.menuFormSubmit}
              onClick={timeOutFlash}
              form={classes.selectionForm}
            >
              Add To Cart
            </button>
            <p ref={addToInvoiceFlash}>Added to checkout invoice</p>
          </div>
        </div>
      );
    }
  }

  function setMaxToppingsFunction() {
    if (currCheckedSize) {
      if (currCheckedSize.includes("9")) {
        setMaxToppings(9);
      } else if (currCheckedSize.includes("12")) {
        setMaxToppings(12);
      } else if (currCheckedSize.includes("20")) {
        setMaxToppings(20);
      }
    } else {
      null;
    }
  }
  useEffect(() => {
    setMaxToppingsFunction();
  }, [currCheckedSize]);
  function timeOutFlash() {
    addToInvoiceFlash.current.style.display = "inline-block";
    setTimeout(() => {
      addToInvoiceFlash.current.style.display = "none";
    }, 2000);
  }
  async function submitHandler(e) {
    e.preventDefault();
    const orderData = {
      userId: session.user._id,
      quantity: quantity,
      name: props.selectionData.name,
      sizePrice: selectedSize,
      extraPrice: selectedExtra,
      flavors: selectedFlavor,
      toppings: selectedToppings,
      notes,
      giftPrice: selectedGift,
      freePistachio: selectedFreeExtra,
    };
    const response = await fetch("/api/addToCart", {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setTimeout(() => {
      router.reload(window.location.pathname);
    }, 1000);
  }

  useEffect(() => {
    selectionPanelRef.current.scrollIntoView({ behavior: "smooth", block: 'nearest' });
  });
  return (
    <div className={classes.selectionPanel} ref={selectionPanelRef}>
      <div className={classes.selectionImage}>
        <Image src={props.selectionData.img} alt="basicCake" />
      </div>
      <div className={classes.selectionHeaders}>
        <h1>{props.selectionData.name}</h1>
        <p>{props.selectionData.description}</p>
      </div>
      <div className={classes.selectionOptions}>
        <form id={classes.selectionForm} method="POST" onSubmit={submitHandler}>
          <div className={classes.quantityInput}>
            <h1>Quantity</h1>
            <button
              type="button"
              id={classes.quantityPlus}
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
            <label ref={quantityRef}>{quantity}</label>
            <button
              type="button"
              id={classes.quantityMinus}
              value={quantity}
              onClick={(e) => {
                if (e.target.value > 0) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              -
            </button>
          </div>
          <div className={classes.sizesInputs}>
            <h1>Choose Size</h1>

            {props.selectionData.sizePrice.map((item, index) => {
              return (
                <div key={index}>
                  <input
                    type="radio"
                    required
                    name="size"
                    value={item.size}
                    onClick={(e) => {
                      if (e.target.checked) {
                        setCheckedSize(e.target.value);
                      }

                      setSelectedSize({ size: item.size, price: item.price });
                    }}
                  />
                  <label>{item.size}</label>
                  <p>{item.price}</p>
                </div>
              );
            })}
            <hr />
          </div>
          {props.selectionData.flavors.length === 0 ? null : (
            <div className={classes.flavorInputs}>
              {props.selectionData.name === "Joy Cheesecake" && (
                <p>Choose a minimum of 2 flavors to 6</p>
              )}
              <h1>Flavors</h1>
              {props.selectionData.name === "Joy Cheesecake"
                ? props.selectionData.flavors.map((item, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        onClick={(e) => {
                          if (e.target.checked) {
                            setSelectedFlavor([...selectedFlavor, item]);
                          } else if (!e.target.checked) {
                            setSelectedFlavor(
                              selectedFlavor.filter((flavor) => flavor != item)
                            );
                          }
                        }}
                      />
                      <label>{item}</label>
                    </div>
                  ))
                : props.selectionData.flavors.map((item, index) => (
                    <div key={index}>
                      <input
                        required
                        type="radio"
                        name="flavor"
                        onClick={() => setSelectedFlavor(item)}
                      />
                      <label>{item}</label>
                    </div>
                  ))}

              <hr />
            </div>
          )}
          {props.selectionData.name === "Original Thera Cake Brownies" &&
          currCheckedSize === "20 Mini Pieces" ? (
            <div className={classes.freeExtra}>
              <h1>Free Extra</h1>
              <input
                type="checkbox"
                name="extraPistachio"
                onClick={(e) => {
                  if (e.target.checked) {
                    setSelectedFreeExtra("Free Pistachio");
                  } else if (!e.target.checked) {
                    setSelectedFreeExtra("No Free Extra Pistachio");
                  }
                }}
              />
              <label>Free Extra Pistachio</label>
            </div>
          ) : null}
          {props.selectionData.toppings.length === 0 ? null : (
            <div className={classes.toppings}>
              <h1>Toppings</h1>
              {props.selectionData.name === 'Mountain Of Heaven' ? <p>Select from 1 to 3 toppings</p> : null}
              {props.selectionData.toppings.map((item, index) => {
                return (
                  <div key={index}>
                    <button
                      name={item}
                      value={0}
                      // onChange={(e) => setSelectedToppings(e.target.value) }
                      onClick={(e) => {
                        setSelectedToppings((prevState) => {
                          let sumToppings = Object.values(
                            selectedToppings
                          ).reduce(
                            (accumlator, currentValue) =>
                              accumlator + currentValue,
                            0
                          );
                          if (parseInt(sumToppings) !== parseInt(maxToppings)) {
                            if (Object.keys(prevState).length === 0) {
                              return {
                                [e.target.name]: 1,
                              };
                            } else {
                              console.log(prevState[e.target.name]);
                              console.log(prevState[e.target.name]++);

                              return {
                                ...prevState,
                                [e.target.name]: isNaN(prevState[e.target.name])
                                  ? 1
                                  : prevState[e.target.name]++,
                              };
                            }
                          } else {
                            return {
                              ...prevState,
                              [e.target.name]: prevState[e.target.name],
                            };
                          }
                        });
                      }}
                      type="button"
                    >
                      +
                    </button>
                    <input
                      value={
                        typeof selectedToppings[item] === "undefined"
                          ? 0
                          : selectedToppings[item]
                      }
                      required
                      readOnly
                    />
                    <button
                      type="button"
                      name={item}
                      onClick={(e) =>
                        setSelectedToppings((prevState) => {
                          console.log(prevState[e.target.name]);
                          console.log(prevState[e.target.name]--);
                          return {
                            ...prevState,
                            [e.target.name]: prevState[e.target.name]--,
                          };
                        })
                      }
                    >
                      -
                    </button>
                    <label>{item}</label>
                  </div>
                );
              })}

              <hr />
            </div>
          )}
          {props.selectionData.extraPrice.length === 0 ? null : (
            <div className={classes.extras}>
              <h1>Extras</h1>
              {props.selectionData.extraPrice.map((item, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    value={item.extra}
                    onClick={(e) => {
                      if (e.target.checked) {
                        setSelectedExtra([
                          ...selectedExtra,
                          { extra: item.extra, price: item.price },
                        ]);
                      } else if (!e.target.checked) {
                        setSelectedExtra(
                          selectedExtra.filter(
                            (extra) => extra.extra != item.extra
                          )
                        );
                      }
                    }}
                  />
                  <label>{item.extra}</label>
                  <p id={classes.extraPrice}>{item.price}</p>
                </div>
              ))}

              <hr />
            </div>
          )}

          <div className={classes.giftInputs}>
            <h1>Gift Option (optional)</h1>
            <div>
              <input
                type="checkbox"
                value="Gift Card"
                onClick={(e) => {
                  if (e.target.checked) {
                    setSelectedGift([
                      ...selectedGift,
                      { gift: e.target.value, price: 25 },
                    ]);
                  } else if (!e.target.checked) {
                    setSelectedGift(
                      selectedGift.filter((gift) => gift.gift != "Gift Card")
                    );
                  }
                }}
              />
              <label>Gift Card</label>
              <p>25EGP</p>
            </div>
            <div>
              <input
                type="checkbox"
                value="Rose"
                onClick={(e) => {
                  if (e.target.checked) {
                    setSelectedGift([
                      ...selectedGift,
                      { gift: e.target.value, price: 30 },
                    ]);
                  } else if (!e.target.checked) {
                    setSelectedGift(
                      selectedGift.filter((gift) => gift.gift != "Rose")
                    );
                  }
                }}
              />
              <label>Rose</label>
              <p>30EGP</p>
            </div>
            <div>
              <input
                type="checkbox"
                value="Bouqet"
                onClick={(e) => {
                  if (e.target.checked) {
                    setSelectedGift([
                      ...selectedGift,
                      { gift: e.target.value, price: 130 },
                    ]);
                  } else if (!e.target.checked) {
                    setSelectedGift(
                      selectedGift.filter((gift) => gift.gift != "Bouqet")
                    );
                  }
                }}
              />
              <label>Bouqet (6 flowers)</label>
              <p>130EGP</p>
            </div>

            <hr />
          </div>
          <div className={classes.instructionInputs}>
            <div>
              <h1>Special Instructions</h1>
              <textarea
                placeholder="Flower's color/Gift card note"
                rows="5"
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
          </div>
        </form>
      </div>
      {isLoggedIn()}

      {/* <div className={classes.selectionBottomBanner}>
        <h3>Total</h3>
        <p>720EGP</p>
      </div> */}
    </div>
  );
}

export default SelectionPanel;
