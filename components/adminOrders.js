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
  let [filter, setFilter] = useState(props.orders);
  let allFilterRef = useRef();
  let pendingFilterRef = useRef();
  let acceptedFilterRef = useRef();
  let dispatchedFilterRef = useRef();
  let readyFilterRef = useRef();
  let completedFilterRef = useRef();
  let cancelledFilterRef = useRef();
  useEffect(() => {
    const searchResult = filter.filter((order) =>
      `${order.firstName?.toLowerCase()} ${order.lastName?.toLowerCase()}`.includes(
        search.toLowerCase()
      )
    );

    if (!!searchResult.length) {
      setFilter(searchResult);
    } else {
      setFilter([]);
    }

    if (!search.length) {
      setFilter(props.orders);
    }
  }, [search]);

  useEffect(() => {
    const high = [...filter].sort(
      (a, b) => parseFloat(b.totalPrice) - parseFloat(a.totalPrice)
    );

    const low = [...filter].sort(
      (a, b) => parseFloat(a.totalPrice) - parseFloat(b.totalPrice)
    );

    const old = [...filter].sort(
      (a, b) => new Date(a.dateSubmitted) - new Date(b.dateSubmitted)
    );

    const recent = [...filter].sort(
      (a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted)
    );

    if (sort === "high") {
      setFilter(high);
    } else if (sort === "low") {
      setFilter(low);
    } else if (sort === "new") {
      setFilter(recent);
    } else if (sort === "old") {
      setFilter(old);
    } else if (sort === "default") {
      setFilter([...props.orders]);
    }
  }, [sort]);

  return (
    <>
      <section className={classes.adminOrderGrid}>
        <div className={classes.adminOrderInputs}>
          <input
            type="search"
            value={search}
            placeholder="Search by name"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            onChange={(e) => setSort(e.target.value)}
            defaultValue=""
            id={classes.sortInput}
          >
            <option value="default">Default Sorting</option>
            <option value="high">Price High to Low</option>
            <option value="low">Price Low to High</option>
            <option value="new">Recent Orders</option>
            <option value="old">Oldest Orders</option>
          </select>
        </div>

        <div className={classes.filter}>
          <button
            ref={allFilterRef}
            onClick={() => {
              setFilter(props.orders);
              allFilterRef.current.style.borderBottom = "4px #ff7da3 solid";
              allFilterRef.current.style.color = "#ff7da3";

              pendingFilterRef.current.style.color = "black";
              pendingFilterRef.current.style.borderBottom = "none";

              acceptedFilterRef.current.style.color = "black";
              acceptedFilterRef.current.style.borderBottom = "none";

              dispatchedFilterRef.current.style.color = "black";
              dispatchedFilterRef.current.style.borderBottom = "none";

              readyFilterRef.current.style.color = "black";
              readyFilterRef.current.style.borderBottom = "none";

              completedFilterRef.current.style.color = "black";
              completedFilterRef.current.style.borderBottom = "none";

              cancelledFilterRef.current.style.color = "black";
              cancelledFilterRef.current.style.borderBottom = "none";
            }}
          >
            All ({props.orders.length})
          </button>
          <button
            ref={pendingFilterRef}
            onClick={() => {
              setFilter(
                props.orders.filter((order) => order.status === "Pending")
              );
              pendingFilterRef.current.style.borderBottom = "4px #ff7da3 solid";
              pendingFilterRef.current.style.color = "#ff7da3";

              allFilterRef.current.style.color = "black";
              allFilterRef.current.style.borderBottom = "none";

              acceptedFilterRef.current.style.color = "black";
              acceptedFilterRef.current.style.borderBottom = "none";

              dispatchedFilterRef.current.style.color = "black";
              dispatchedFilterRef.current.style.borderBottom = "none";

              readyFilterRef.current.style.color = "black";
              readyFilterRef.current.style.borderBottom = "none";

              completedFilterRef.current.style.color = "black";
              completedFilterRef.current.style.borderBottom = "none";

              cancelledFilterRef.current.style.color = "black";
              cancelledFilterRef.current.style.borderBottom = "none";
            }}
          >
            Pending (
            {props.orders.filter((order) => order.status === "Pending").length})
          </button>
          <button
            ref={acceptedFilterRef}
            onClick={() => {
              setFilter(
                props.orders.filter((order) => order.status === "Accepted")
              );

              acceptedFilterRef.current.style.borderBottom =
                "4px #ff7da3 solid";
              acceptedFilterRef.current.style.color = "#ff7da3";

              allFilterRef.current.style.color = "black";
              allFilterRef.current.style.borderBottom = "none";

              pendingFilterRef.current.style.color = "black";
              pendingFilterRef.current.style.borderBottom = "none";

              dispatchedFilterRef.current.style.color = "black";
              dispatchedFilterRef.current.style.borderBottom = "none";

              readyFilterRef.current.style.color = "black";
              readyFilterRef.current.style.borderBottom = "none";

              completedFilterRef.current.style.color = "black";
              completedFilterRef.current.style.borderBottom = "none";

              cancelledFilterRef.current.style.color = "black";
              cancelledFilterRef.current.style.borderBottom = "none";
            }}
          >
            Accepted (
            {props.orders.filter((order) => order.status === "Accepted").length}
            )
          </button>
          <button
            ref={readyFilterRef}
            onClick={() => {
              setFilter(
                props.orders.filter((order) => order.status === "Ready")
              );
              readyFilterRef.current.style.borderBottom = "4px #ff7da3 solid";
              readyFilterRef.current.style.color = "#ff7da3";

              allFilterRef.current.style.color = "black";
              allFilterRef.current.style.borderBottom = "none";

              acceptedFilterRef.current.style.color = "black";
              acceptedFilterRef.current.style.borderBottom = "none";

              dispatchedFilterRef.current.style.color = "black";
              dispatchedFilterRef.current.style.borderBottom = "none";

              pendingFilterRef.current.style.color = "black";
              pendingFilterRef.current.style.borderBottom = "none";

              completedFilterRef.current.style.color = "black";
              completedFilterRef.current.style.borderBottom = "none";

              cancelledFilterRef.current.style.color = "black";
              cancelledFilterRef.current.style.borderBottom = "none";
            }}
          >
            Ready (
            {props.orders.filter((order) => order.status === "Ready").length})
          </button>
          <button
            ref={dispatchedFilterRef}
            onClick={() => {
              setFilter(
                props.orders.filter((order) => order.status === "Delivered")
              );
              dispatchedFilterRef.current.style.borderBottom =
                "4px #ff7da3 solid";
              dispatchedFilterRef.current.style.color = "#ff7da3";

              allFilterRef.current.style.color = "black";
              allFilterRef.current.style.borderBottom = "none";

              acceptedFilterRef.current.style.color = "black";
              acceptedFilterRef.current.style.borderBottom = "none";

              pendingFilterRef.current.style.color = "black";
              pendingFilterRef.current.style.borderBottom = "none";

              readyFilterRef.current.style.color = "black";
              readyFilterRef.current.style.borderBottom = "none";

              completedFilterRef.current.style.color = "black";
              completedFilterRef.current.style.borderBottom = "none";

              cancelledFilterRef.current.style.color = "black";
              cancelledFilterRef.current.style.borderBottom = "none";
            }}
          >
            Dispatched (
            {
              props.orders.filter((order) => order.status === "Delivered")
                .length
            }
            )
          </button>
          <button
            ref={completedFilterRef}
            onClick={() => {
              setFilter(
                props.orders.filter((order) => order.status === "Completed")
              );
              completedFilterRef.current.style.borderBottom =
                "4px #ff7da3 solid";
              completedFilterRef.current.style.color = "#ff7da3";

              allFilterRef.current.style.color = "black";
              allFilterRef.current.style.borderBottom = "none";

              acceptedFilterRef.current.style.color = "black";
              acceptedFilterRef.current.style.borderBottom = "none";

              dispatchedFilterRef.current.style.color = "black";
              dispatchedFilterRef.current.style.borderBottom = "none";

              readyFilterRef.current.style.color = "black";
              readyFilterRef.current.style.borderBottom = "none";

              pendingFilterRef.current.style.color = "black";
              pendingFilterRef.current.style.borderBottom = "none";

              cancelledFilterRef.current.style.color = "black";
              cancelledFilterRef.current.style.borderBottom = "none";
            }}
          >
            Completed (
            {
              props.orders.filter((order) => order.status === "Completed")
                .length
            }
            )
          </button>
          <button
            ref={cancelledFilterRef}
            onClick={() => {
              setFilter(
                props.orders.filter((order) => order.status === "Cancelled")
              );
              cancelledFilterRef.current.style.borderBottom =
                "4px #ff7da3 solid";
              cancelledFilterRef.current.style.color = "#ff7da3";

              allFilterRef.current.style.color = "black";
              allFilterRef.current.style.borderBottom = "none";

              acceptedFilterRef.current.style.color = "black";
              acceptedFilterRef.current.style.borderBottom = "none";

              dispatchedFilterRef.current.style.color = "black";
              dispatchedFilterRef.current.style.borderBottom = "none";

              readyFilterRef.current.style.color = "black";
              readyFilterRef.current.style.borderBottom = "none";

              completedFilterRef.current.style.color = "black";
              completedFilterRef.current.style.borderBottom = "none";

              pendingFilterRef.current.style.color = "black";
              pendingFilterRef.current.style.borderBottom = "none";
            }}
          >
            Cancelled (
            {props.orders.filter((order) => order.status === "Cancelled").length})
          </button>
        </div>

        {filter &&
          filter.map((order, index) => <OrderItem order={order} key={index} />)}

        {/* {result?.length &&
          result.map((r, index) => <OrderItem order={r} key={uuid()} />)} */}

        {/* {!result.length &&
          !search &&
          !filter &&
          props.orders.map((order, index) => (
            <OrderItem order={order} key={uuid()} />
          ))} */}
      </section>
    </>
  );
}

export default AdminOrders;
