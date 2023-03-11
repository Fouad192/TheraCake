import React, { useEffect, useState } from "react";
import ClientData from "../components/clientData";
import classes from "../components/adminOrders.module.css";
import { useRouter } from "next/router";
function Data({ items }) {
  const router = useRouter();
  // if(router?.isFallback) {
  //   return <h1>Wait</h1>
  // }
  const [allNumbers, setAllNumbers] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  useEffect(() => {
    items.map((item) => {
      let stringNumber = item.mobile?.toString();
      if (!allNumbers.includes(stringNumber?.slice(0, stringNumber.length))) {
        allNumbers.push(stringNumber);
        setAllNumbers([...allNumbers, stringNumber]);
      }
    });
  }, [items]);
  useEffect(() => {
    let arr = [];

    for (let num of allNumbers) {
      let foundDocument = items.filter((item) => item.mobile == num);
      arr.push(foundDocument);
    }
    setDataArray(arr);
  }, [items]);
  return (
    <section className={classes.adminOrderGrid}>
      <div className={classes.adminOrderInputs}>
        <input type="search" placeholder="Search by name" />
        <select defaultValue="" id={classes.sortInput}>
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
        <button>Cancelled</button>
      </div>

      {dataArray.map((client, index) => (
        <ClientData client={client} key={index} />
      ))}
    </section>
  );
}

export async function getServerSideProps() {
  const res = await fetch("/api/dataAPI");
  const data = await res.json();
  const { items } = data;
  return {
    props: {
      items,
    },
  };
}

export default Data;
