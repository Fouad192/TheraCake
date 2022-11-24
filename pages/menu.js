import Menu from "../components/Menu";
import dbConnect from "../lib/dbConnect";
import MenuItem from "../models/menuItems";

function menuPage(props) {
   
    return <Menu cheesecakeMenuData={props.cheesecakeMenuData} browniesMenuData={props.browniesMenuData}/>
}

export async function getServerSideProps() {
  await dbConnect();
  const cheesecakeMenuData = await MenuItem.find({category: 'cheesecake'});
  const browniesMenuData = await MenuItem.find({category: 'brownies'});

return {
    props: {
        cheesecakeMenuData: JSON.parse(JSON.stringify(cheesecakeMenuData)),
        browniesMenuData: JSON.parse(JSON.stringify(browniesMenuData)),
    }
}
}
export default menuPage