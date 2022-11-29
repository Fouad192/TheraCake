import classes from "./menu.module.css";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import deleteIcon from "../public/delete.png";
import editIcon from "../public/edit.png";
import AddItem from "./addItem";
import SelectionPanel from "./selectionPanel";
import EditItem from "./editItem";
function Menu(props) {
  
  let [addItemPopup, toggleAddItemPopup] = useState(false);
  let [idx, setIdx] = useState();
  let [categoryDetect, setCategoryDetect] = useState(false);
  let [editItemPopup, openEditItem] = useState(false);
  let [toBeEdited, setToBeEdited] = useState()
  let [isAuthorized, setAuthorized] = useState(false)
  let cheesecake = useRef();
  let brownies = useRef();
  let cheesecakeMenu = useRef();
  let browniesMenu = useRef();
  // function detectData(itemIndex) {
  //   idx = itemIndex
  //   console.log(idx)
  // }
useEffect(() => {
if (props.session.user.email === "anwarcitcm@gmail.com") {
  setAuthorized(true);
} else if (props.session.user.email === "fouadhamdy51@gmail.com") {
  setAuthorized(true);
} else if(props.session.user.email === "mohamedaymanmoudy1@gmail.com") {
  setAuthorized(true)
} else {
  setAuthorized(false);
}

}, [isAuthorized])


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
    console.log(data);
  }
  async function deleteItemHandler(item) {
    const response = await fetch("/api/newMenuItem", {
      method: "DELETE",
      body: item._id,
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      <section className={classes.menuGrid}>
        {addItemPopup && (
          <AddItem
            toggleAddItemPopup={toggleAddItemPopup}
            onAddItem={addItemHandler}
          />
        )}
        {editItemPopup && <EditItem data={toBeEdited} />}
        <div className={classes.menuItems}>
          <div className={classes.menuNavigation}>
            <button ref={cheesecake} onClick={cheesecakeMenuHandler}>
              Cheesecake
            </button>
            <button ref={brownies} onClick={browniesMenuHandler}>
              Brownies
            </button>
            {isAuthorized ? <button onClick={toggleAddItemBtn}>Add Item</button> : null }
           
          </div>
          <div
            className={classes.cheesecakeMenuItemContainer}
            ref={cheesecakeMenu}
          >
            {cheesecakes.map((item, index) => (
              <div
                className={classes.menuItem}
                onClick={() => console.log(item)}
              >
                <div className={classes.menuItemDetails}>
                  <div className={classes.adminModifyAndDelete}>
                    <Image
                      src={deleteIcon}
                      onClick={() => deleteItemHandler(item)}
                    />
                    <Image
                      src={editIcon}
                      onClick={() => {
                        setToBeEdited(item);
                        openEditItem(true);
                      }}
                    />
                  </div>
                  <h1>{item.name}</h1>
                  <p>{item.description}</p>
                  <button
                    onClick={() => {
                      setIdx(index);
                      setCategoryDetect("cheesecake");
                    }}
                  >
                    Select Your Options
                  </button>
                  <p>
                    {item.sizePrice[0].price} -{" "}
                    {item.sizePrice[item.sizePrice.length - 1].price} EGP
                  </p>
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
            {browniesData.map((item, index) => (
              <div className={classes.menuItem}>
                <div className={classes.menuItemDetails}>
                  <div className={classes.adminModifyAndDelete}>
                    <Image src={deleteIcon} />
                    <Image src={editIcon} />
                  </div>
                  <h1>{item.name}</h1>
                  <p>{item.description}</p>
                  <button
                    onClick={() => {
                      setIdx(index);
                      setCategoryDetect("brownies");
                    }}
                  >
                    Select Your Options
                  </button>

                  <p>
                    {item.sizePrice[0].price}{" "}
                    {item.sizePrice.length > 1
                      ? `- ${item.sizePrice[item.sizePrice.length - 1].price}`
                      : null}{" "}
                    EGP
                  </p>
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

        {returnSelectionPanel()}
      </section>
    </>
  );
}

export default Menu;
