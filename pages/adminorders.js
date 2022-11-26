import AdminOrders from "../components/adminOrders";
import dbConnect from "../lib/dbConnect";
import OrderCheckout from "../models/order";
function AdminOrdersPage(props) {
    return (
      <>
        <AdminOrders orders={props.checkoutOrders}/>
      </>
    );
}

export async function getServerSideProps() {
  await dbConnect()
  const checkoutOrders = await OrderCheckout.find()

  return {
    props: {
      checkoutOrders: JSON.parse(JSON.stringify((checkoutOrders)))
    }
  }
}
export default AdminOrdersPage