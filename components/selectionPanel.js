import classes from "./selectionPanel.module.css";
import basicSelectionImg from "../public/basicSelectionImg.png";
import Image from "next/image";
import plusIcon from "../public/icon/plus.svg";
import minusIcon from "../public/icon/minus.png";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import uuid from "react-uuid";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
function SelectionPanel(props) {
  let [quantity, setQuantity] = useState(1);
  let [selectedSize, setSelectedSize] = useState();
  let [selectedFlavor, setSelectedFlavor] = useState([]);
  let [selectedExtra, setSelectedExtra] = useState([]);
  let [selectedGift, setSelectedGift] = useState([]);
  let [selectedToppings, setSelectedToppings] = useState([]);
  let [notes, setNotes] = useState();
  // let [props.selectionData, setCurrMenuItem] = useState(props.selectionData)
  let [maxToppings, setMaxToppings] = useState();
  let [currCheckedSize, setCheckedSize] = useState();

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
        <button className={classes.menuFormSubmit} onClick={() => signIn()}>
          Add To Cart
        </button>
      );
    } else if (session) {
      return (
        <div className={classes.checkoutBtnDiv}>
          <button className={classes.menuFormSubmit} onClick={timeOutFlash}>
            Add To Cart
          </button>
          <p ref={addToInvoiceFlash}>Added to checkout invoice</p>
        </div>
      );
    }
  }
  function increment(index, item) {
    let toppingSum = 0;
    toppingCountRef.current.map((topping) => {
      if (topping) {
        toppingSum += parseInt(topping.value);
      }
    });
    if (toppingSum !== maxToppings) {
      toppingCountRef.current[index].value++;
    }
    // if (toppingSum === maxToppings) {

    // }

    // while(toppingSum !== maxToppings) {
    //   toppingCountRef.current[index].value++
    // }
  }
  function decrement(index) {
    toppingCountRef.current[index].value--;
  }
  function setToppingState(item, index) {
    if (toppingCountRef.current[index]) {
      setSelectedToppings((prevSt) => [
        ...prevSt,
        { topping: item, quantity: toppingCountRef.current[index].value },
      ]);
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
    addToInvoiceFlash.current.style.display = "block";
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
  }

  return (
    

    <div className={classes.selectionPanel}>
      <div className={classes.selectionImage}>
        <img src={props.selectionData.img} alt="basicCake" />
      </div>
      <div className={classes.selectionHeaders}>
        <h1>{props.selectionData.name}</h1>
        <p>{props.selectionData.description}</p>
      </div>
      <div className={classes.selectionOptions}>
        <form
          className={classes.selectionForm}
          method="POST"
          onSubmit={submitHandler}
        >
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
              <h1>Flavors</h1>
              {props.selectionData.name === "Joy Cheesecake"
                ? props.selectionData.flavors.map((item, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        required
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
          {props.selectionData.toppings.length === 0 ? null : (
            <div className={classes.toppings}>
              <h1>Toppings</h1>
              {props.selectionData.toppings.map((item, index) => {
                return (
                  <div key={index}>
                    <button
                      onClick={() => {
                        increment(index, item);
                      }}
                      type="button"
                    >
                      +
                    </button>
                    <input
                      required
                      value="0"
                      onClick={(e) => console.log(e.target.value)}
                      ref={(el) => {
                        toppingCountRef.current[index] = el;
                      }}
                    />
                    <button onClick={() => decrement(index)} type="button">
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
          {isLoggedIn()}
        </form>
      </div>
      {/* <div className={classes.selectionBottomBanner}>
        <h3>Total</h3>
        <p>720EGP</p>
      </div> */}
    </div>

  );
}

export default SelectionPanel;
