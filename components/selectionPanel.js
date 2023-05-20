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
  const [mouseClickedTopping, handleMouseClick] = useState();
  const [isFlavorChanged, setIsFlavorChanged] = useState(false);
  const [isSizeChanged, setIsSizeChanged] = useState(false);
  const [selectedSpecial, setSelectedSpecial] = useState({});
  // let [selectedFreeExtra, setSelectedFreeExtra] = useState(
  //   "No Free Extra Pistachio"
  // );

  let [notes, setNotes] = useState();
  // let [props.selectionData, setCurrMenuItem] = useState(props.selectionData)
  let [maxToppings, setMaxToppings] = useState();
  let [currCheckedSize, setCheckedSize] = useState();
  let selectionPanelRef = useRef();
  let toppingCountRef = useRef([]);
  let quantityRef = useRef();
  let addToInvoiceFlash = useRef();

  const { data: session } = useSession();
  useEffect(() => {
    setSelectedSize([]);
    setSelectedFlavor([]);
    setSelectedExtra([]);
    setSelectedGift([]);
    setSelectedToppings({});
  }, [props.selectionData]);
  useEffect(() => {
    setSelectedExtra(selectedExtra.filter((item) => item.quantity != 0));
  }, [mouseClickedTopping]);
  useEffect(() => {
    if (selectedFlavor === "Lotus" && selectedSize.size === "12 pieces ") {
      setSelectedSize({ ...selectedSize, price: "350" });
    } else if (
      selectedFlavor === "Lotus" &&
      selectedSize.size === "20 pieces "
    ) {
      setSelectedSize({ ...selectedSize, price: "420" });
    }
  }, [isFlavorChanged, isSizeChanged]);
  function setMaxToppingsFunction() {
    if (currCheckedSize) {
      if (currCheckedSize.includes("9")) {
        setMaxToppings(9);
      } else if (currCheckedSize.includes("12")) {
        setMaxToppings(12);
      } else if (currCheckedSize.includes("6")) {
        setMaxToppings(6);
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
      let specialArray = [];

    if (props.selectionData.name === "Joy bites cheesecake ") {

      if (Object.keys(selectedSpecial).length !== 0) {

        Object.keys(selectedSpecial).map((special) => {
          const foundBite = props.selectionData.specialBites.find(
            (bite) => bite.name === special
          );
          if (selectedSpecial[special] !== 0) {

            specialArray.push({
              name: special,
              price:
                parseInt(selectedSpecial[special]) * parseInt(foundBite.price),
            });
          }
        });
      }
    }

    if (session) {
      try {
        const orderData = {
          userId: session.user._id,
          quantity: quantity,
          name: props.selectionData.name,
          sizePrice: selectedSize,
          extraPrice: selectedExtra,
          flavors: selectedFlavor,
          specialBites: specialArray,
          toppings: selectedToppings,
          notes,
          giftPrice: selectedGift,
          // freePistachio: selectedFreeExtra,
        };
        const response = await fetch("/api/addToCart", {
          method: "POST",
          body: JSON.stringify(orderData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setTimeout(() => {
          router.reload(window.location.pathname);
        }, 1000);
      } catch (e) {
        console.log(e.message);
      }
    } else {
      try {
        const cartArr = [
          {
            quantity: quantity,
            name: props.selectionData.name,
            sizePrice: [selectedSize],
            extraPrice: selectedExtra,
            flavors: [selectedFlavor],
            toppings: [selectedToppings],
            specialBites: specialArray,

            notes,
            giftPrice: selectedGift,
            // freePistachio: selectedFreeExtra,
          },
        ];

        if (localStorage.getItem("items")) {
          let pushArray = JSON.parse(localStorage.getItem("items"));
          await pushArray.push({
            quantity: quantity,
            name: props.selectionData.name,
            sizePrice: [selectedSize],
            extraPrice: selectedExtra,
            flavors: [selectedFlavor],
            toppings: [selectedToppings],
            specialBites: specialArray,

            notes,
            giftPrice: selectedGift,
            // freePistachio: selectedFreeExtra,
          });
          localStorage.setItem("items", JSON.stringify(pushArray));
        } else {
          localStorage.setItem("items", JSON.stringify(cartArr));
        }
        setTimeout(() => {
          router.reload(window.location.pathname);
        }, 1000);
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  useEffect(() => {
    selectionPanelRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  });
  const decideBrownieFlavor = (item) => {
    if (props.selectionData.name === "Blondie brownies ") {
      if (selectedFlavor === "White Chocolate" && item.size === "12 pieces ") {
        return <p>{item.price}</p>;
      } else if (
        selectedFlavor === "White Chocolate" &&
        item.size === "20 pieces "
      ) {
        return <p>{item.price}</p>;
      } else if (selectedFlavor === "Lotus" && item.size === "12 pieces ") {
        return <p>350</p>;
      } else if (selectedFlavor === "Lotus" && item.size === "20 pieces ") {
        return <p>420</p>;
      }
    } else {
      return <p>{item.price}</p>;
    }
  };
  return (
    <div className={classes.selectionPanel} ref={selectionPanelRef}>
      <div className={classes.selectionImage}>
        <Image
          src={props.selectionData.img}
          alt="basicCake"
          width={1000}
          height={100}
        />
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
          <div className={classes.sizesInputs} key={props.selectionData._id}>
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
                                selectedFlavor.filter(
                                  (flavor) => flavor != item
                                )
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
                          onClick={() => {
                            if (item === "White Chocolate") {
                              if (selectedSize.size === "12 pieces ") {
                                setSelectedSize({
                                  ...selectedSize,
                                  price: "290",
                                });
                              } else if (selectedSize.size === "20 pieces ") {
                                setSelectedSize({
                                  ...selectedSize,
                                  price: "350",
                                });
                              }
                            }
                            setSelectedFlavor(item);
                            setIsFlavorChanged(!isFlavorChanged);
                          }}
                        />
                        <label>{item}</label>
                      </div>
                    ))}

                <hr />
              </div>
            )}
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
                        setIsSizeChanged(!isSizeChanged);
                      }

                      setSelectedSize({ size: item.size, price: item.price });
                    }}
                  />

                  <label>{item.size}</label>
                  {decideBrownieFlavor(item)}
                </div>
              );
            })}
            <hr />
          </div>

          {props.selectionData.name === "Joy bites cheesecake " && (
            <div>
              <div className={classes.toppings}>
                <h1>Special Bites</h1>
                {typeof maxToppings !== "undefined" ? (
                  <p>Select up to {`${maxToppings}`} toppings</p>
                ) : null}

                {props.selectionData.specialBites.map((item, index) => {
                  return (
                    <div key={index}>
                      <button
                        name={item.name}
                        value={0}
                        // onChange={(e) => setSelectedToppings(e.target.value) }
                        onClick={(e) => {
                          setSelectedSpecial((prevState) => {
                            let sumToppings =
                              Object.values(selectedToppings).reduce(
                                (accumlator, currentValue) =>
                                  accumlator + currentValue,
                                0
                              ) +
                              Object.values(selectedSpecial).reduce(
                                (accumlator, currentValue) =>
                                  accumlator + currentValue,
                                0
                              );

                            if (
                              parseInt(sumToppings) !== parseInt(maxToppings)
                            ) {
                              if (Object.keys(prevState).length === 0) {
                                return {
                                  [e.target.name]: 1,
                                };
                              } else {
                                console.log("hi");

                                return {
                                  ...prevState,
                                  [e.target.name]: isNaN(
                                    prevState[e.target.name]
                                  )
                                    ? 1
                                    : prevState[e.target.name] + 1,
                                };
                              }
                            } else {
                              console.log("hi from return same num");
                              if (
                                prevState.hasOwnProperty(
                                  [e.target.name].toString()
                                )
                              ) {
                                return {
                                  ...prevState,
                                  [e.target.name]: prevState[e.target.name],
                                };
                              } else {
                                return { ...prevState };
                              }
                            }
                          });
                        }}
                        type="button"
                      >
                        +
                      </button>
                      <input
                        value={
                          typeof selectedSpecial[item.name] === "undefined"
                            ? 0
                            : selectedSpecial[item.name]
                        }
                        required
                        readOnly
                      />
                      <button
                        type="button"
                        name={item.name}
                        onClick={(e) =>
                          setSelectedSpecial((prevState) => {
                            return {
                              ...prevState,
                              [e.target.name]: prevState[e.target.name] - 1,
                            };
                          })
                        }
                      >
                        -
                      </button>
                      <p style={{ marginLeft: "0.5rem" }}> {item.name}</p>
                      <label style={{ color: "#ff5689", fontWeight: "500" }}>
                        {`${
                          selectedSpecial[item.name]
                            ? selectedSpecial[item.name] * item.price
                            : item.price
                        } EGP`}
                      </label>
                    </div>
                  );
                })}

                <hr />
              </div>
            </div>
          )}
          {props.selectionData.toppings.length === 0 ? null : (
            <div className={classes.toppings}>
              <h1>Toppings</h1>
              {typeof maxToppings !== "undefined" ? (
                <p>Select up to {`${maxToppings}`} toppings</p>
              ) : null}
              {props.selectionData.name === "Joy bites cheesecake " && (
                <p style={{ marginTop: "0.5rem" }}>
                  You can select a maximum of 2 free pecan topping
                </p>
              )}
              {props.selectionData.name === "Mountain Of Heaven" ? (
                <p>Select from 1 to 3 toppings</p>
              ) : null}
              {props.selectionData.toppings.map((item, index) => {
                return (
                  <div key={index}>
                    <button
                      name={item}
                      value={0}
                      // onChange={(e) => setSelectedToppings(e.target.value) }
                      onClick={(e) => {
                        setSelectedToppings((prevState) => {
                          let sumToppings =
                            Object.values(selectedToppings).reduce(
                              (accumlator, currentValue) =>
                                accumlator + currentValue,
                              0
                            ) +
                            Object.values(selectedSpecial).reduce(
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
                              console.log("hi");
                              console.log(prevState.Pecan);
                              if (
                                e.target.name === "Pecan" &&
                                prevState[e.target.name] === 2
                              ) {
                                return {
                                  ...prevState,
                                  [e.target.name]: prevState[e.target.name],
                                };
                              }
                              return {
                                ...prevState,
                                [e.target.name]: isNaN(prevState[e.target.name])
                                  ? 1
                                  : prevState[e.target.name] + 1,
                              };
                            }
                          } else {
                            console.log("hi from return same num");
                            if (
                              prevState.hasOwnProperty(
                                [e.target.name].toString()
                              )
                            ) {
                              return {
                                ...prevState,
                                [e.target.name]: prevState[e.target.name],
                              };
                            } else {
                              return { ...prevState };
                            }
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
                          return {
                            ...prevState,
                            [e.target.name]: prevState[e.target.name] - 1,
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
                  <button
                    name={item.extra}
                    type="button"
                    onClick={() => {
                      setSelectedExtra([
                        ...selectedExtra,
                        {
                          extra: item.extra,
                          price: parseInt(item.price),
                          quantity: 1,
                        },
                      ]);
                      let matchExtra = selectedExtra?.find(
                        (extra) => extra?.extra === item.extra
                      );
                      console.log(matchExtra);
                      if (matchExtra?.quantity >= 1) {
                        setSelectedExtra(
                          selectedExtra.map((subItem) => {
                            if (subItem?.extra === item.extra) {
                              return {
                                ...subItem,
                                price: parseInt(
                                  item.price * (subItem.quantity + 1)
                                ),
                                quantity: subItem.quantity + 1,
                              };
                            } else {
                              return subItem;
                            }
                          })
                        );
                      }
                    }}
                  >
                    +
                  </button>
                  <input
                    readOnly
                    value={
                      selectedExtra.filter(
                        (findItem) => findItem?.extra === item.extra
                      )[0]?.quantity || 0
                    }
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      handleMouseClick(!mouseClickedTopping);
                      setSelectedExtra(
                        selectedExtra?.map((decreaseItem) => {
                          if (decreaseItem?.extra === item.extra) {
                            if (decreaseItem.quantity > 0) {
                              return {
                                ...decreaseItem,
                                quantity: decreaseItem?.quantity - 1,
                                price: decreaseItem?.price - item.price,
                              };
                            }
                          } else {
                            return decreaseItem;
                          }
                        })
                      );
                    }}
                  >
                    -
                  </button>
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
                value="Bouqet6"
                onClick={(e) => {
                  if (e.target.checked) {
                    setSelectedGift([
                      ...selectedGift,
                      { gift: e.target.value, price: 160 },
                    ]);
                  } else if (!e.target.checked) {
                    setSelectedGift(
                      selectedGift.filter((gift) => gift.gift != "Bouqet6")
                    );
                  }
                }}
              />
              <label>Bouqet (6 flowers)</label>
              <p>160EGP</p>
            </div>
            <div>
              <input
                type="checkbox"
                value="Bouqet15"
                onClick={(e) => {
                  if (e.target.checked) {
                    setSelectedGift([
                      ...selectedGift,
                      { gift: e.target.value, price: 390 },
                    ]);
                  } else if (!e.target.checked) {
                    setSelectedGift(
                      selectedGift.filter((gift) => gift.gift != "Bouqet15")
                    );
                  }
                }}
              />
              <label>Bouqet (15 flowers)</label>
              <p>390EGP</p>
            </div>
            <div>
              <input
                type="checkbox"
                value="necklace"
                onClick={(e) => {
                  if (e.target.checked) {
                    setSelectedGift([
                      ...selectedGift,
                      { gift: e.target.value, price: 170 },
                    ]);
                  } else if (!e.target.checked) {
                    setSelectedGift(
                      selectedGift.filter((gift) => gift.gift != "necklace")
                    );
                  }
                }}
              />
              <label>Crystal Silver Necklace</label>
              <p>170EGP</p>
            </div>
            <div>
              <input
                type="checkbox"
                value="wallet"
                onClick={(e) => {
                  if (e.target.checked) {
                    setSelectedGift([
                      ...selectedGift,
                      { gift: e.target.value, price: 210 },
                    ]);
                  } else if (!e.target.checked) {
                    setSelectedGift(
                      selectedGift.filter((gift) => gift.gift != "wallet")
                    );
                  }
                }}
              />
              <label>Fine Leather Mens Wallet</label>
              <p>210EGP</p>
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
      {/* {isLoggedIn()} */}
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

      {/* <div className={classes.selectionBottomBanner}>
        <h3>Total</h3>
        <p>720EGP</p>
      </div> */}
    </div>
  );
}

export default SelectionPanel;
