import classes from "./adminOrders.module.css";
import { useState, useRef, useEffect } from "react";
import OrderItem from "./orderItem";
import uuid from "react-uuid";

function AdminOrders(props) {
  const [orderDetails, toggleOrderDetails] = useState(false);
  const [statusPopup, openStatusPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [sort, setSort] = useState("");

  function searchByName(e) {
    setSearch(e.target.value);
  }
  useEffect(() => {
    const searchResult = props.orders.filter((order) =>
      `${order.firstName.toLowerCase()} ${order.lastName.toLowerCase()}`.includes(
        search.toLowerCase()
      )
    );

    if (!!searchResult.length) {
      setResult(searchResult);
    } else {
      setResult([]);
    }

    if (!search.length) {
      setResult([]);
    }
  }, [search]);

  useEffect(() => {
    const high = props.orders.sort(function (a, b) {
      return parseInt(b.mobile) - parseInt(a.mobile);
    });
    
    const low = props.orders.sort(function (a, b) {
      return parseInt(a.mobile) - parseInt(b.mobile);
    });

    if (sort === "high") {
      setResult(high);
    }else if(sort === "low"){
      setResult(low);
    }
  }, [sort]);

  // let toggleStatusPopup = () => {
  //     if (!statusPopup) {
  //         openStatusPopup(true);
  //     } else {
  //         openStatusPopup(false);
  //     }
  // };
  return (
    <>
      <section className={classes.adminOrderGrid}>
        <div className={classes.adminOrderInputs}>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select onChange={(e) => setSort(e.target.value)} defaultValue="">
            <option value="">
              All
            </option>
            <option value="high">Price High to Low</option>
            <option value="low">Price Low to High</option>
            <option value="new">Recent orders</option>
            <option value="old">Oldest orders</option>
          </select>
        </div>

        <div className={classes.filter}>
          <button>All</button>
          <button>Pending</button>
          <button>Accepted</button>
          <button>Ready</button>
          <button>Dispatched</button>
          <button>Completed</button>
        </div>
        {result?.length &&
          result.map((r, index) => <OrderItem order={r} key={uuid()} />)}
        {!result.length &&
          !search &&
          props.orders.map((order, index) => (
            <OrderItem order={order} key={uuid()} />
          ))}
      </section>
    </>
  );
}

export default AdminOrders;
