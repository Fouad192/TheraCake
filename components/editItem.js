import classes from "./addItem.module.css";
import closeIcon from "../public/close.png";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import uuid from "react-uuid";

function EditItem({ data, openEditItem }) {
  const router = useRouter();
  const [itemName, setItemName] = useState(data.name);
  const [itemDescription, setItemDescription] = useState(data.description);
  const [itemFlavor, setItemFlavor] = useState(data.flavors);
  const [itemExtras, setItemExtras] = useState(data.extraPrice);
  const [itemToppings, setItemToppings] = useState(data.toppings);
  const [itemCategory, setItemCategory] = useState(data.category);
  const [itemSizes, setItemSizes] = useState(data.sizePrice);
 
  let fileInputRef = useRef();

  function closePopup() {
    openEditItem(false);
  }
  const itemId = data._id;

  async function handleEditSubmit(e) {
    console.log(itemId);
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
    let editedData = {
      toppings: itemToppings,
      itemId,
      flavors: itemFlavor,
      extraPrice: itemExtras,
      sizePrice: itemSizes,
      description: itemDescription,
      name: itemName,
      category: itemCategory,
      img: imageUploadData.secure_url
    };
    const response = await fetch("/api/newMenuItem", {
      method: "PUT",
      body: JSON.stringify(editedData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setTimeout(() => {
      router.reload(window.location.pathname);
    }, 500);
  }
  return (
    <div className={classes.addItemPopupContainer}>
      <Image
        id={classes.closeIconStyle}
        src={closeIcon}
        onClick={closePopup}
        alt="closeIcon"
      />
      <form action="/api/newMenuItem" method="put" onSubmit={handleEditSubmit}>
        <div className={classes.itemCategory}>
          <h1>Category</h1>
          <div>
            <input
              type="radio"
              name="category"
              value="cheesecake"
              onClick={(e) => {
                if (e.target.checked) {
                  setItemCategory("cheesecake");
                }
              }}
            />
            <label>Cheesecake</label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              value="brownies"
              onClick={(e) => {
                if (e.target.checked) {
                  setItemCategory("brownies");
                }
              }}
            />
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
        </div>
        {itemSizes.map((sizeObject) => {
          // let {size, price} = sizeObject
          return (
            <div key={data._id} className={classes.sizeInput}>
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
        <div className={classes.extras}>
          <h1>Extras</h1>
          <button type="button">Add Extra</button>
        </div>
        {itemExtras.map((item, index) => (
          <div key={uuid()} className={classes.extraInput}>
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
        <div className={classes.flavor}>
          <h1>Flavors</h1>
        </div>
        {itemFlavor.map((flavor, index, arr) => (
          <div key={index} className={classes.flavorInput}>
            <input
              type="text"
              placeholder="Flavor Name"
              value={flavor}
              onChange={(e) =>
                setItemFlavor((prevState) => {
                  prevState.forEach((element, elementIndex) => {
                    if (elementIndex === index) {
                      prevState[elementIndex] = e.target.value;
                    }
                  });
                  return [...prevState];
                })
              }
            />
          </div>
        ))}
        <div className={classes.topping}>
          <h1>Toppings</h1>
        </div>
        {itemToppings.map((item, index) => (
          <div key={uuid()} className={classes.toppingInput}>
            <input
              type="text"
              placeholder="Topping Name"
              value={item}
              onChange={(e) =>
                setItemToppings((prevState) => {
                  prevState.forEach((element, elementIndex) => {
                    if (elementIndex === index) {
                      prevState[elementIndex] = e.target.value;
                    }
                  });
                  return [...prevState];
                })
              }
            />
          </div>
        ))}
        <div className={classes.file}>
          <label for="fileInput">Choose Image</label>
          <input type="file" ref={fileInputRef} />
        </div>
        <input
          type="submit"
          value="Edit Item"
          className={classes.addItemSubmit}
        />
      </form>
    </div>
  );
}

export default EditItem;
