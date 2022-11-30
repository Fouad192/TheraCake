import classes from "./adminOrders.module.css";
import basicImg from "../public/basic.png";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
// import Navbar from "./navbar";
// import Footer from "./footer";
import OrderItem from "./orderItem";
import OrderCheckout from "../models/order";
function AdminOrders(props) {
    const [orderDetails, toggleOrderDetails] = useState(false);
    const [statusPopup, openStatusPopup] = useState(false);
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);

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
        }else{
          setResult([])
        }

        if (!search.length) {
            setResult([]);
        }
        console.log(result);
    }, [search]);

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
                    <input type="sort" />
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
                    result.map((r, index) => <OrderItem order={r} />)}
                {!result.length &&
                    !search &&
                    props.orders.map((order, index) => (
                        <OrderItem order={order} />
                    ))}
            </section>
        </>
    );
}

export default AdminOrders;
