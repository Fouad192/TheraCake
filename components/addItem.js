import classes from "./addItem.module.css";
import closeIcon from "../public/close.png";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import uuid from "react-uuid";

function AddItem(props) {
  const router = useRouter();
  let [sizeDiv, setSizeDiv] = useState(0);
  let [extraDiv, setExtraDiv] = useState(0);
  let [flavorDiv, setFlavorDiv] = useState(0);
  let [toppingDiv, setToppingDiv] = useState(0);
  let [imageSrc, setImageSrc] = useState();
  let [uploadData, setUploadData] = useState();
  const [itemName, setItemName] = useState();
  const [itemDescription, setItemDescription] = useState();
  const [itemFlavors, setItemFlavor] = useState([]);
  const [itemExtras, setItemExtras] = useState([]);
  const [itemToppings, setItemToppings] = useState([]);
  const [itemCategory, setItemCategory] = useState();
  const [itemSizes, setItemSizes] = useState([]);
  let fileInputRef = useRef();
  async function submitHandler(e) {
    e.preventDefault();
    const fileInput = fileInputRef.current;
    let imageData = new FormData();
    for (const file of fileInput.files) {
      imageData.append("file", file);
    }
    imageData.append("upload_preset", "menuImages");
    const imageUploadData = await fetch(
      "https://api.cloudinary.com/v1_1/dswtzq3ze/image/upload",
      {
        method: "POST",
        body: imageData,
      }
    ).then((r) => r.json());  

    const itemData = {
      category: itemCategory,
      name: itemName,
      description: itemDescription,
      sizePrice: sizePriceArr,
      extraPrice: extraPriceArr,
      flavors: flavorList,
      toppings: toppingList,
      img: imageUploadData.secure_url,
    };
    props.onAddItem(itemData);
    setTimeout(() => {
      router.reload(window.location.pathname);
    }, 500);
  }

  function addSize() {
    setSizeDiv(sizeDiv + 1);
  }
  function addExtra() {
    setExtraDiv(extraDiv + 1);
  }
  function addFlavor() {
    setFlavorDiv(flavorDiv + 1);
  }
  function addTopping() {
    setToppingDiv(toppingDiv + 1);
  }
  function removeSize() {
    setSizeDiv(sizeDiv - 1);
  }
  function removeExtra() {
    setExtraDiv(extraDiv - 1);
  }
  function removeFlavor() {
    setFlavorDiv(flavorDiv - 1);
  }
  function removeTopping() {
    setToppingDiv(toppingDiv - 1);
  }
  let closePopup = () => {
    props.toggleAddItemPopup(false);
  };
  return (
    <div className={classes.addItemPopupContainer}>
      <Image
        id={classes.closeIconStyle}
        src={closeIcon}
        onClick={closePopup}
        alt="CloseIcon"
      />
      <form action="/api/newMenuItem" onSubmit={submitHandler} method="post">
        <div className={classes.itemCategory}>
          <h1>Category</h1>
          <div>
            <input
              type="radio"
              name="category"
              value="cheesecake"
              onClick={(e) => setItemCategory(e.target.value)}
            />
            <label>Cheesecake</label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              value="brownies"
              onClick={(e) => setItemCategory(e.target.value)}
            />
            <label>Brownies</label>
          </div>
        </div>
        <div className={classes.itemName}>
          <label htmlFor="itemName">Item name</label>
          <input
            type="text"
            name="name"
            id="itemName"
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className={classes.itemDescription}>
          <label htmlFor="itemDescription">Item description</label>
          <textarea
            rows="5"
            name="description"
            id="itemDescription"
            onChange={(e) => setItemDescription(e.target.value)}
            // ref={itemDescription}
          />
        </div>
        <div className={classes.sizes}>
          <h1>Sizes</h1>
          <button onClick={addSize} type="button">
            Add More
          </button>
          {sizeDiv > 0 ? (
            <button
              onClick={() => {
                removeSize();
                let copyItemSizes = itemSizes;
                copyItemSizes.splice(sizeDiv - 1, 1);
                setItemSizes(copyItemSizes);
              }}
              type="button"
            >
              Remove Size
            </button>
          ) : null}
        </div>
        {[...Array(sizeDiv)].map((item, index) => (
          <div key={index} className={classes.sizeInput}>
            <input
              type="text"
              placeholder="Size Name"
              value={itemSizes[index]?.size}
              onChange={(e) => {
                if (itemSizes[index]) {
                  setItemSizes((prevState) =>
                    prevState?.map((obj) => {
                      if (obj === itemSizes[index]) {
                        return { ...obj, size: e.target.value };
                      }
                      return obj;
                    })
                  );
                } else {
                  setItemSizes([...itemSizes, { size: e.target.value }]);
                }
              }}
            />
            <input
              type="number"
              placeholder="Size Price"
              value={itemSizes[index]?.price}
              onChange={(e) => {
                if (itemSizes[index]) {
                  setItemSizes((prevState) =>
                    prevState?.map((obj) => {
                      if (obj === itemSizes[index]) {
                        return { ...obj, price: e.target.value };
                      }
                      return obj;
                    })
                  );
                } else {
                  setItemSizes([...itemSizes, { price: e.target.value }]);
                }
              }}
            />
          </div>
        ))}
        <div className={classes.extras}>
          <h1>Extras</h1>
          <button onClick={addExtra} type="button">
            Add Extra
          </button>
          {extraDiv > 0 ? (
            <button
              onClick={() => {
                removeExtra();
                let copyItemExtras = itemExtras;
                copyItemExtras.splice(extraDiv - 1, 1);
                setItemExtras(copyItemExtras);
              }}
              type="button"
            >
              Remove Extra
            </button>
          ) : null}
        </div>
        {[...Array(extraDiv)].map((item, index) => (
          <div key={index} className={classes.extraInput}>
            <input
              type="text"
              placeholder="Extra Name"
              value={itemExtras[index]?.extra}
              onChange={(e) => {
                if (itemExtras[index]) {
                  setItemExtras((prevState) =>
                    prevState?.map((obj) => {
                      if (obj === itemExtras[index]) {
                        return { ...obj, extra: e.target.value };
                      }
                      return obj;
                    })
                  );
                } else {
                  setItemExtras([...itemExtras, { extra: e.target.value }]);
                }
              }}
            />
            <input
              type="number"
              placeholder="Extra Price"
              value={itemExtras[index]?.price}
              onChange={(e) => {
                if (itemExtras[index]) {
                  setItemExtras((prevState) =>
                    prevState?.map((obj) => {
                      if (obj === itemExtras[index]) {
                        return { ...obj, price: e.target.value };
                      }
                      return obj;
                    })
                  );
                } else {
                  setItemExtras([...itemExtras, { price: e.target.value }]);
                }
              }}
            />
          </div>
        ))}
        <div className={classes.flavor}>
          <h1>Flavors</h1>

          <button type="button" onClick={addFlavor}>
            Add Flavor
          </button>
          {flavorDiv > 0 ? (
            <button
              onClick={() => {
                removeFlavor();
                let copyItemFlavors = itemFlavors;
                copyItemFlavors.splice(sizeDiv - 1, 1);
                setItemFlavor(copyItemFlavors);
              }}
              type="button"
            >
              Remove Flavor
            </button>
          ) : null}
        </div>
        {[...Array(flavorDiv)].map((item, index) => (
          <div key={index} className={classes.flavorInput}>
            <input
              type="text"
              placeholder="Flavor Name"
              value={itemFlavors[index] || ""}
              onChange={(e) => {
                const nextFlavors = itemFlavors.map((c, i) => {
                  if (i === index) {
                    return (c = e.target.value);
                  } else {
                    return c;
                  }
                });
                if (nextFlavors.length - 1 < index) {
                  nextFlavors.push(e.target.value);
                }
              
                setItemFlavor(nextFlavors);
              }}
            />
          </div>
        ))}
        <div className={classes.topping}>
          <h1>Toppings</h1>

          <button type="button" onClick={addTopping}>
            Add topping
          </button>
          {toppingDiv > 0 ? (
            <button onClick={() => {
               removeTopping();
                let copyItemToppings = itemToppings;
                copyItemToppings.splice(sizeDiv - 1, 1);
                setItemToppings(copyItemToppings);
            }} type="button">
              Remove Topping
            </button>
          ) : null}
        </div>
        {[...Array(toppingDiv)].map((item, index) => (
          <div key={index} className={classes.toppingInput}>
            <input
              type="text"
              placeholder="Topping Name"
              onChange={(e) => {
                const nextToppings = itemToppings.map((c, i) => {
                  if (i === index) {
                    return (c = e.target.value);
                  } else {
                    return c;
                  }
                });
                if (nextToppings.length - 1 < index) {
                  nextToppings.push(e.target.value);
                }
               
                setItemToppings(nextToppings);
              }}
            />
          </div>
        ))}
        <div className={classes.file}>
          <label for="fileInput">Choose Image</label>
          <input type="file" ref={fileInputRef} />
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

export default AddItem;
