import classes from "./addItem.module.css";
import closeIcon from "../public/close.png";
import Image from "next/image";
import { useRef, useState } from "react";

function EditItem(props) {
  let data = props.data;
  let [itemName, setItemName] = useState(data.name);
  let [itemDescription, setItemDescription] = useState(data.description);
  let [itemFlavor, setItemFlavor] = useState(data.flavors);
  let [itemExtras, setItemExtras] = useState(data.extraPrice);
  let [itemToppings, setItemToppings] = useState(data.toppings);
  let [itemCategory, setItemCategory] = useState(data.category);
  let [itemSizes, setItemSizes] = useState(data.sizePrice);
  let [itemImage, setItemImage] = useState(data.img);
  function closePopup() {
    props.openEditItem(false)
  }
  return (
    <div className={classes.addItemPopupContainer}>
      <Image id={classes.closeIconStyle} src={closeIcon} onClick={closePopup} />
      <form action="/api/newMenuItem" method="put">
        <div className={classes.itemCategory}>
          <h1>Category</h1>
          <div>
            <input type="radio" name="category" value="cheesecake" />
            <label>Cheesecake</label>
          </div>
          <div>
            <input type="radio" name="category" value="brownies" />
            <label>Brownies</label>
          </div>
        </div>
        <div className={classes.itemName}>
          <label htmlFor="itemName">Item name</label>
          {/* value {props.item.name} */}
          <input
            type="text"
            name="name"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className={classes.itemDescription}>
          <label htmlFor="itemDescription">Item description</label>

          <textarea
            rows="5"
            name="description"
            id="itemDescription"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
          />
        </div>
        <div className={classes.sizes}>
          <h1>Sizes</h1>
          {itemSizes.map((sizeObject) => {
            // let {size, price} = sizeObject
            return (
              <div>
                <input
                  type="text"
                  name="size"
                  placeholder="Size Name"
                  value={sizeObject.size}
                  onChange={(e) => {
                    setItemSizes((prevState) =>
                      prevState.map((obj) => {
                        if (obj === sizeObject) {
                          return { ...obj, size: e.target.value };
                        }
                        return obj;
                      })
                    );
                  }}
                />
                <input
                  type="number"
                  placeholder="Size Price"
                  name="price"
                  value={sizeObject.price}
                  onChange={(e) => {
                    setItemSizes((prevState) =>
                      prevState.map((obj) => {
                        if (obj === sizeObject) {
                          return { ...obj, price: e.target.value };
                        }
                        return obj;
                      })
                    );
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className={classes.extras}>
          <h1>Extras</h1>
          <button type="button">Add Extra</button>
          {itemExtras.map((item, index) => (
            <div>
              <input
                type="text"
                value={item.extra}
                placeholder="Extra Name"
                onChange={(e) => {
                  setItemExtras((prevState) =>
                    prevState.map((obj) => {
                      if (obj === item) {
                        return { ...obj, extra: e.target.value };
                      }
                      return obj;
                    })
                  );
                }}
              />
              <input
                type="number"
                placeholder="Extra Price"
                value={item.price}
                onChange={(e) => {
                  setItemExtras((prevState) =>
                    prevState.map((obj) => {
                      if (obj === item) {
                        return { ...obj, price: e.target.value };
                      }
                      return obj;
                    })
                  );
                }}
              />
            </div>
          ))}
        </div>
        <div className={classes.flavor}>
          <h1>Flavors</h1>

          {itemFlavor.map((flavor, index, arr) => (
            <div>
              <input type="text" placeholder="Flavor Name" value={flavor} />
            </div>
          ))}
        </div>

        <div className={classes.topping}>
          <h1>Toppings</h1>

          {itemToppings.map((item, index) => (
            <div>
              <input type="text" placeholder="Flavor Name" />
            </div>
          ))}
        </div>
        <div className={classes.file}>
          <label for="fileInput">Choose Image</label>
          <input type="file" />
        </div>
        <input
          type="submit"
          value="Add Item"
          className={classes.addItemSubmit}
        />
      </form>
    </div>
  );
}

export default EditItem;
