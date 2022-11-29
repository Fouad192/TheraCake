import Footer from "../components/footer";
import Menu from "../components/Menu";
import Navbar from "../components/navbar";
import dbConnect from "../lib/dbConnect";
import MenuItem from "../models/menuItems";
import { getSession } from "next-auth/react";
function menuPage(props) {
   
    return (
      <>
    
        <Menu
          cheesecakeMenuData={props.cheesecakeMenuData}
          browniesMenuData={props.browniesMenuData}
          session={props.session}
        />

      </>
    );
}

export async function getServerSideProps(ctx) {
  await dbConnect();
  const cheesecakeMenuData = await MenuItem.find({category: 'cheesecake'});
  const browniesMenuData = await MenuItem.find({category: 'brownies'});
  let session = await getSession(ctx)
  if(session.user.email === 'anwarcitcm@gmail.com') {
    let authorizedAdmin = true
  }
return {
    props: {
        cheesecakeMenuData: JSON.parse(JSON.stringify(cheesecakeMenuData)),
        browniesMenuData: JSON.parse(JSON.stringify(browniesMenuData)),
        session: session,
    }
}
}
export default menuPage