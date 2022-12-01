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
        console.log(result);
    }, [search]);

    useEffect(() => {
        const high = [...props.orders].sort(
            (a, b) => parseFloat(b.totalPrice) - parseFloat(a.totalPrice)
        );

        const low = [...props.orders].sort(
            (a, b) => parseFloat(a.totalPrice) - parseFloat(b.totalPrice)
        );

        const old = [...props.orders].sort(
            (a, b) => new Date(a.dateSubmitted) - new Date(b.dateSubmitted)
        );

        const recent = [...props.orders].sort(
            (a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted)
        );

        if (sort === "high") {
            setResult(high);
        } else if (sort === "low") {
            setResult(low);
        } else if (sort === "new") {
            setResult(recent);
        } else if (sort === "old") {
            setResult(old);
        } else if (sort === "default") {
            setResult([...props.orders]);
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
                    <button>All</button>
                    <button>Pending</button>
                    <button>Accepted</button>
                    <button>Ready</button>
                    <button>Dispatched</button>
                    <button>Completed</button>
                </div>
                {result?.length &&
                    result.map((r, index) => (
                        <OrderItem order={r} key={uuid()} />
                    ))}
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
