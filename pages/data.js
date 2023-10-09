import React, { useEffect, useState } from "react";
import ClientData from "../components/clientData";
import classes from "../components/adminOrders.module.css";
import { useRouter } from "next/router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
function Data({ items }) {
  const router = useRouter();
  // if(router?.isFallback) {
  //   return <h1>Wait</h1>
  // }
  const [allNumbers, setAllNumbers] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [result, setResult] = useState([]);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    const searchResult = filter.filter((client) =>
      `${client[0]?.firstName?.toLowerCase()} ${client[0]?.lastName?.toLowerCase()}`.includes(
        search.toLowerCase()
      )
    );

    if (!!searchResult.length) {
      setFilter(searchResult);
    } else {
      setFilter([]);
    }

    if (!search.length) {
      setFilter(dataArray);
    }
  }, [search]);

  useEffect(() => {
    const high = [...filter].sort(
      (a, b) => parseFloat(b.length) - parseFloat(a.length)
    );

    const low = [...filter].sort(
      (a, b) => parseFloat(a.length) - parseFloat(b.length)
    );

    if (sort === "high") {
      setFilter(high);
    } else if (sort === "low") {
      setFilter(low);
    } else if (sort === "default") {
      setFilter(dataArray);
    }
  }, [sort, filter]);

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
    setFilter(arr)
  }, [items]);
  return (
    <>
      <Navbar />
      <section className={classes.adminOrderGrid}>
        <div className={classes.adminOrderInputs}>
          <input
            type="search"
            placeholder="Search by name"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <select
            defaultValue=""
            id={classes.sortInput}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Default Sorting</option>
            <option value="high">Price High to Low</option>
            <option value="low">Price Low to High</option>
          </select>
        </div>

        {filter &&
          filter.map((client, index) => (
            <ClientData client={client} key={index} />
          ))}
      </section>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://theracakee.onrender.com/api/dataAPI");
  const data = await res.json();
  const { items } = data;
  return {
    props: {
      items,
    },
  };
}

export default Data;
