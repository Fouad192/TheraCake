import classes from "./selectionPanel.module.css";
import basicSelectionImg from "../public/basicSelectionImg.png";
import Image from "next/image";
import plusIcon from "../public/icon/plus.svg";
import minusIcon from "../public/icon/minus.png";
import { useState, useRef } from "react";
function SelectionPanel(props) {
  let [topping0, setToppingCount] = useState(0);
  let [topping1, setToppingCount2] = useState(0);
  let [topping2, setToppingCount3] = useState(0);
  let [topping3, setToppingCount4] = useState(0);
  let [topping4, setToppingCount5] = useState(0);
  let [topping5, setToppingCount6] = useState(0);
  let [sizePriceSt, setSizePriceSt] = useState();
  let sizePriceRef = useRef([]);
  async function submitHandler(e) {
    e.preventDefault();
    const orderData = {
      name: itemName.current.value,
      description: itemDescription.current.value,
      sizePrice: sizePriceArr,
      extraPrice: extraPriceArr,
      flavors: flavorList,
      toppings: toppingList,
      img: imageUploadData.secure_url,
    };
    props.onAddItem(itemData);
  }
  function increment(e) {
    if (e.target.id === "topping0") {
      setToppingCount(topping0 + 1);
    } else if (e.target.id === "topping1") {
      setToppingCount2(topping1 + 1);
    } else if (e.target.id === "topping2") {
      setToppingCount3(topping2 + 1);
    } else if (e.target.id === "topping3") {
      setToppingCount4(topping3 + 1);
    } else if (e.target.id === "topping4") {
      setToppingCount5(topping4 + 1);
    } else if (e.target.id === "topping5") {
      setToppingCount6(topping5 + 1);
    }
  }
  function decrement(e) {
    if (e.target.id === "topping0") {
      setToppingCount(topping0 - 1);
    } else if (e.target.id === "topping1") {
      setToppingCount2(topping1 - 1);
    } else if (e.target.id === "topping2") {
      setToppingCount3(topping2 - 1);
    } else if (e.target.id === "topping3") {
      setToppingCount4(topping3 - 1);
    } else if (e.target.id === "topping4") {
      setToppingCount5(topping4 - 1);
    } else if (e.target.id === "topping5") {
      setToppingCount6(topping5 - 1);
    }
  }
  return (
    <div className={classes.selectionPanel}>
      <div className={classes.selectionImage}>
        <Image src={basicSelectionImg} alt="basicCake" />
      </div>
      <div className={classes.selectionHeaders}>
        <h1>{props.selectionData.name}</h1>
        <p>{props.selectionData.description}</p>
      </div>
      <div className={classes.selectionOptions}>
        <form className={classes.selectionForm} method="POST">
          <h1>Choose Size</h1>
          <div className={classes.sizesInputs}>
            {props.selectionData.sizePrice.map((item, index) => {
              return (
                <div>
                  <input type="radio" name='size' />
                  <label>{item.size}</label>
                  <span>Serves 1-2 persons (12cm)</span>
                  <p>{item.price}</p>
                </div>
              );
            })}
            <hr />
          </div>
          {props.selectionData.flavors.length === 0 ? null : (
            <div className={classes.flavorInputs}>
              <h1>Flavors</h1>
              {props.selectionData.flavors.map((item) => (
                <div>
                  <input type="radio" name="flavor" />
                  <label>{item}</label>
                </div>
              ))}

              <hr />
            </div>
          )}
          {props.selectionData.toppings.length === 0 ? null : (
            <div className={classes.toppings}>
              <h1>Toppings</h1>
              {props.selectionData.toppings.map((item, index) => (
                <div>
                  <Image
                    src={plusIcon}
                    width={24}
                    onClick={increment}
                    id={`topping${index}`}
                  />
                  <label>{topping0}</label>
                  <input type="hidden" value={`topping${index}`} />
                  <Image
                    src={minusIcon}
                    width={24}
                    id={`topping${index}`}
                    onClick={decrement}
                  />
                  <label>{item}</label>
                </div>
              ))}

              <hr />
            </div>
          )}
          {props.selectionData.extraPrice.length === 0 ? null : (
            <div className={classes.extras}>
              <h1>Extras</h1>
              {props.selectionData.extraPrice.map((item) => (
                <div>
                  <input type="checkbox" value={item.extra} />
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
              <input type="radio" name="gift" />
              <label>Gift Card</label>
              <p>150EGP</p>
            </div>
            <div>
              <input type="radio" name="gift" />
              <label>Rose</label>
              <p>150EGP</p>
            </div>
            <div>
              <input type="radio" name="gift" />
              <label>Bouqet (6 flowers)</label>
              <p>150EGP</p>
            </div>

            <hr />
          </div>
          <div className={classes.scheduleInputs}>
            <div>
              <h1>Schedule Delivery</h1>
              <input type="datetime-local" />
            </div>

            <hr />
          </div>
          <div className={classes.instructionInputs}>
            <div>
              <h1>Special Instructions</h1>
              <textarea
                placeholder="Flower's color/Gift card note"
                rows="5"
              ></textarea>
            </div>
          </div>
          <button className={classes.menuFormSubmit}>
            Proceed To Checkout
          </button>
        </form>
      </div>
      <div className={classes.selectionBottomBanner}>
        <h3>Total</h3>
        <p>720EGP</p>
      </div>
    </div>
  );
}

// <div className={classes.selectionPanel}>
//   <div className={classes.selectionImage}>
//     <Image src={basicSelectionImg} alt="basicCake" />
//   </div>
//   <div className={classes.selectionHeaders}>
//     <h1>Basic Cheesecake</h1>
//     <p>Strawberry/Caramel/Blueberry</p>
//   </div>
//   <div className={classes.selectionOptions}>
//     <form className={classes.selectionForm} method="POST">
//       <h1>Choose Size</h1>
//       <div className={classes.sizesInputs}>
//         <div>
//           <input type="radio" name="size" />
//           <label>Mini</label>
//           <span>Serves 1-2 persons (12cm)</span>
//           <p>150EGP</p>
//         </div>
//         <div>
//           <input type="radio" name="size" />
//           <label>Small</label>
//           <span>Serves 1-2 persons (12cm)</span>
//           <p>150EGP</p>
//         </div>
//         <div>
//           <input type="radio" name="size" />
//           <label>Medium</label>
//           <span>Serves 1-2 persons (12cm)</span>
//           <p>150EGP</p>
//         </div>
//         <div>
//           <input type="radio" name="size" />
//           <label>Large</label>
//           <span>Serves 1-2 persons (12cm)</span>
//           <p>150EGP</p>
//         </div>
//         <hr />
//       </div>
//       <div className={classes.flavorInputs}>
//         <h1>Flavors</h1>
//         <div>
//           <input type="radio" name="flavor" />
//           <label>Strawberry</label>
//         </div>
//         <div>
//           <input type="radio" name="flavor" />
//           <label>Caramel</label>
//         </div>
//         <div>
//           <input type="radio" name="flavor" />
//           <label>Blueberry</label>
//         </div>
//         <hr />
//       </div>
//       <div className={classes.toppings}>
//         <h1>Toppings</h1>
//         <div>
//           <Image
//             src={plusIcon}
//             width={24}
//             onClick={increment}
//             id="firstTopping"
//           />
//           <label>{toppingCount}</label>
//           <input type="hidden" value={toppingCount} />
//           <Image
//             src={minusIcon}
//             width={24}
//             id="firstTopping"
//             onClick={decrement}
//           />
//           <label>Strawberry</label>
//         </div>
//         <div>
//           <Image
//             src={plusIcon}
//             width={24}
//             onClick={increment}
//             id="secondTopping"
//           />
//           <label>{toppingCount2}</label>
//           <input type="hidden" value={toppingCount2} />
//           <Image
//             src={minusIcon}
//             width={24}
//             id="secondTopping"
//             onClick={decrement}
//           />
//           <label>Strawberry</label>
//         </div>
//         <div>
//           <Image
//             src={plusIcon}
//             width={24}
//             onClick={increment}
//             id="thirdTopping"
//           />
//           <label>{toppingCount3}</label>
//           <input type="hidden" value={toppingCount3} />
//           <Image src={minusIcon} width={24} />
//           <label>Strawberry</label>
//         </div>
//         <div>
//           <Image
//             src={plusIcon}
//             width={24}
//             onClick={increment}
//             id="fourthTopping"
//           />
//           <label>{toppingCount4}</label>
//           <input type="hidden" value={toppingCount4} />
//           <Image src={minusIcon} width={24} />
//           <label>Strawberry</label>
//         </div>

//         <hr />
//       </div>
//       <div className={classes.extras}>
//         <h1>Extras</h1>
//         <div>
//           <input type="checkbox" value="pistachio" />
//           <label>Pistachio</label>
//           <p>10EGP</p>
//         </div>

//         <hr />
//       </div>
//       <div className={classes.giftInputs}>
//         <h1>Gift Option (optional)</h1>
//         <div>
//           <input type="radio" name="gift" />
//           <label>Gift Card</label>
//           <p>150EGP</p>
//         </div>
//         <div>
//           <input type="radio" name="gift" />
//           <label>Rose</label>
//           <p>150EGP</p>
//         </div>
//         <div>
//           <input type="radio" name="gift" />
//           <label>Bouqet (6 flowers)</label>
//           <p>150EGP</p>
//         </div>

//         <hr />
//       </div>
//       <div className={classes.scheduleInputs}>
//         <div>
//           <h1>Schedule Delivery</h1>
//           <input type="datetime-local" />
//         </div>

//         <hr />
//       </div>
//       <div className={classes.instructionInputs}>
//         <div>
//           <h1>Special Instructions</h1>
//           <textarea
//             placeholder="Flower's color/Gift card note"
//             rows="5"
//           ></textarea>
//         </div>
//       </div>
//       <button className={classes.menuFormSubmit}>Proceed To Checkout</button>
//     </form>
//   </div>
//   <div className={classes.selectionBottomBanner}>
//     <h3>Total</h3>
//     <p>720EGP</p>
//   </div>
// </div>;

export default SelectionPanel;
