import Footer from "../components/footer";
import Menu from "../components/Menu";
import Navbar from "../components/navbar";
import Head from "next/head";

import dbConnect from "../lib/dbConnect";
import MenuItem from "../models/menuItems";
import Cart from "../models/cart";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
function MenuPage(props) {
  let { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Thera Menu</title>
        <meta
          name="description"
          content="This dessert made with great love,
extreme dedication and the best quality"
        />
      </Head>
      {session ? <Navbar count={props.count} /> : <Navbar />}

      <Menu
        cheesecakeMenuData={props.cheesecakeMenuData}
        browniesMenuData={props.browniesMenuData}
        ramadanMenuData={props.ramadanMenuData}
        session={props.session}
        count={props.count}
      />
      <Footer />
    </>
  );
}

export async function getServerSideProps(ctx) {
  await dbConnect();
  const cheesecakeMenuData = await MenuItem.find({ category: "cheesecake" });
  const browniesMenuData = await MenuItem.find({ category: "brownies" });
  const ramadanMenuData = await MenuItem.find({category: 'ramadan'})
  // const cartItems = await Cart.find({ userId: session.user._id });
  // let cartItemCount = cartItems.length;
  let session = await getSession(ctx);
  if (session) {
    const cartItems = await Cart.find({ userId: session.user._id });
    let cartItemCount = cartItems.length;

    return {
      props: {
        cheesecakeMenuData: JSON.parse(JSON.stringify(cheesecakeMenuData)),
        browniesMenuData: JSON.parse(JSON.stringify(browniesMenuData)),
        ramadanMenuData: JSON.parse(JSON.stringify(ramadanMenuData)),
        session: session,
        count: typeof cartItems !== "undefined" ? cartItemCount : 0,
      },
    };
  } else if (!session) {
    return {
      props: {
        cheesecakeMenuData: JSON.parse(JSON.stringify(cheesecakeMenuData)),
        browniesMenuData: JSON.parse(JSON.stringify(browniesMenuData)),
        session: session,
      },
    };
  }
}
export default MenuPage;
