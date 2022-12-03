import Footer from "../components/footer";
import Menu from "../components/Menu";
import Navbar from "../components/navbar";
import dbConnect from "../lib/dbConnect";
import MenuItem from "../models/menuItems";
import Cart from "../models/cart";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
function MenuPage(props) {
  
    return (
      <>
        <Navbar cartItemCount={props.cartItemCount} />
        <Menu
          cheesecakeMenuData={props.cheesecakeMenuData}
          browniesMenuData={props.browniesMenuData}
          session={props.session}
        />
        <Footer />
      </>
    );
}

export async function getServerSideProps(ctx) {
  await dbConnect();
  const cheesecakeMenuData = await MenuItem.find({category: 'cheesecake'});
  const browniesMenuData = await MenuItem.find({category: 'brownies'});


  let session = await getSession(ctx)
     const cartItems = await Cart.find({ userId: session.user._id });
     let cartItemCount = cartItems.length;
return {
    props: {
        cheesecakeMenuData: JSON.parse(JSON.stringify(cheesecakeMenuData)),
        browniesMenuData: JSON.parse(JSON.stringify(browniesMenuData)),
        session: session,
        cartItemCount
    }
}
}
export default MenuPage