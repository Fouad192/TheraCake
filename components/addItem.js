import classes from './addItem.module.css'
import closeIcon from '../public/close.png'
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';



function AddItem(props) {
  const router = useRouter()
  let [sizeDiv, setSizeDiv] = useState(0)
  let [extraDiv, setExtraDiv] = useState(0)
  let [flavorDiv, setFlavorDiv] = useState(0)
  let [toppingDiv, setToppingDiv] = useState(0)
  let [imageSrc, setImageSrc] = useState()
  let [uploadData, setUploadData] = useState()
  let itemName = useRef();
  let itemDescription = useRef();
  let itemCategory = useRef()
  // let itemImage = useRef();
  let itemSizes = useRef([]);
  let itemPrices = useRef([]);
  let itemExtras = useRef([]);
  let extrasPrices = useRef([]);
  let itemFlavors = useRef([]);
  let itemToppings = useRef([]);
  let fileInputRef = useRef()
  async function submitHandler(e) {
   
    e.preventDefault()
   const fileInput = fileInputRef.current
   let imageData = new FormData()
   for(const file of fileInput.files) {
    imageData.append('file', file)
   }
   imageData.append('upload_preset', 'menuImages')
const imageUploadData = await fetch('https://api.cloudinary.com/v1_1/dswtzq3ze/image/upload', {
  method: 'POST',
  body: imageData
}).then(r => r.json())

    let sizePriceArr = []
    let extraPriceArr = []
    let flavorList = []
    let toppingList = []
    itemSizes.current.forEach((element, index) => (
      sizePriceArr.push({size: element.value})
    ))
    itemPrices.current.forEach((element, index) => (
      sizePriceArr[index].price = element.value
    ))
    itemExtras.current.forEach((element, index) => (
      extraPriceArr.push({extra: element.value})
    ))
    extrasPrices.current.forEach((element, index) => (
      extraPriceArr[index].price = element.value
    ))
    itemFlavors.current.forEach((element, index) => (
      flavorList.push(element.value)
    )) 
    itemToppings.current.forEach((element, index) => (
      toppingList.push(element.value)
    )) 
    console.log(itemCategory.current.checked)
    const itemData = {
      category: itemCategory.current.value,
      name: itemName.current.value,
      description: itemDescription.current.value,
      sizePrice: sizePriceArr,
      extraPrice: extraPriceArr,
      flavors: flavorList,
      toppings: toppingList,
      img: imageUploadData.secure_url
   

    }
    props.onAddItem(itemData)
     setTimeout(() => {
       router.reload(window.location.pathname);
     }, 500);
  }

  function addSize() {
    setSizeDiv(sizeDiv + 1)
  }
  function addExtra() {
    setExtraDiv(extraDiv + 1)
  }
  function addFlavor() {
    setFlavorDiv(flavorDiv + 1)
  }
  function addTopping() {
    setToppingDiv(toppingDiv + 1)
  }
    let closePopup = () => {
        props.toggleAddItemPopup(false)
    }
    return (
      <div className={classes.addItemPopupContainer}>
        <Image
          id={classes.closeIconStyle}
          src={closeIcon}
          onClick={closePopup}
        />
        <form action="/api/newMenuItem" onSubmit={submitHandler} method="post">
          <div className={classes.itemCategory}>
            <h1 onClick={() => console.log(itemCategory.current.value)}>Category</h1>
            <div>
              <input
                type="radio"
                name="category"
                value="cheesecake"
                onClick={(e) => (itemCategory.current = e.target)}
              />
              <label>Cheesecake</label>
            </div>
            <div>
              <input
                type="radio"
                name="category"
                value="brownies"
                onClick={(e) => (itemCategory.current = e.target)}
              />
              <label>Brownies</label>
            </div>
          </div>
          <div className={classes.itemName}>
            <label htmlFor="itemName">Item name</label>
            <input type="text" name="name" id="itemName" ref={itemName} />
          </div>
          <div className={classes.itemDescription}>
            <label htmlFor="itemDescription">Item description</label>
            <textarea
              rows="5"
              name="description"
              id="itemDescription"
              ref={itemDescription}
            />
          </div>
          <div className={classes.sizes}>
            <h1>Sizes</h1>
            <button onClick={addSize} type="button">
              Add More
            </button>
            {[...Array(sizeDiv)].map((item, index) => (
              <div>
                <input
                  type="text"
                  placeholder="Size Name"
                  ref={(element) => {
                    itemSizes.current[index] = element;
                  }}
                />
                <input
                  type="number"
                  placeholder="Size Price"
                  ref={(el) => {
                    itemPrices.current[index] = el;
                  }}
                />
              </div>
            ))}
          </div>
          <div className={classes.extras}>
            <h1>Extras</h1>
            <button onClick={addExtra} type="button">
              Add Extra
            </button>
            {[...Array(extraDiv)].map((item, index) => (
              <div>
                <input
                  type="text"
                  placeholder="Extra Name"
                  ref={(element) => {
                    itemExtras.current[index] = element;
                  }}
                />
                <input
                  type="number"
                  placeholder="Extra Price"
                  ref={(el) => {
                    extrasPrices.current[index] = el;
                  }}
                />
              </div>
            ))}
          </div>
          <div className={classes.flavor}>
            <h1>Flavors</h1>

            <button type="button" onClick={addFlavor}>
              Add Flavor
            </button>
            {[...Array(flavorDiv)].map((item, index) => (
              <div>
                <input
                  type="text"
                  placeholder="Flavor Name"
                  ref={(element) => {
                    itemFlavors.current[index] = element;
                  }}
                />
              </div>
            ))}
          </div>

          <div className={classes.topping}>
            <h1>Toppings</h1>

            <button type="button" onClick={addTopping}>
              Add topping
            </button>
            {[...Array(toppingDiv)].map((item, index) => (
              <div>
                <input
                  type="text"
                  placeholder="Flavor Name"
                  ref={(element) => {
                    itemToppings.current[index] = element;
                  }}
                />
              </div>
            ))}
          </div>
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

export default AddItem