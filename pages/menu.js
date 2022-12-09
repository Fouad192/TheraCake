import Footer from "../components/footer";
import Menu from "../components/Menu";
import Navbar from "../components/navbar";
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
        {session ? (
          <Navbar count={props.count} />
        ) : (
          <Navbar />
        )}

        <Menu
          cheesecakeMenuData={props.cheesecakeMenuData}
          browniesMenuData={props.browniesMenuData}
          session={props.session}
          count={props.count}
        />
        <Footer />
      </>
    );
}

export async function getServerSideProps(ctx) {
  await dbConnect()
  const menuData = await fetch('http://localhost:3000/api/newMenuItem', {method: 'GET'}).then(r => r.json())
  const {cheesecake, brownies} = menuData


  let session = await getSession(ctx)
  if (session) {
    const cartItems = await Cart.find({ userId: session.user._id });
    let cartItemCount = cartItems.length;
    return {
      props: {
        cheesecakeMenuData: JSON.parse(JSON.stringify(cheesecake)),
        browniesMenuData: JSON.parse(JSON.stringify(brownies)),
        session: session,
        count: typeof cartItems !== "undefined" ? cartItemCount : 0,
      },
    };
  } else if (!session) {
    return {
      props: {
        cheesecakeMenuData: JSON.parse(JSON.stringify(cheesecake)),
        browniesMenuData: JSON.parse(JSON.stringify(brownies)),
        session: session,
      },
    };
  }
}
export default MenuPage