import dbConnect from "../../lib/dbConnect";
import OrderCheckout from "../../models/order";
async function handleCardPayment(req, res) {
  if (req?.method === "POST" && req?.body.type !== "orderItems") {
    res.json({message: 'done'});
    // ${paymobAPIData.is_standalone_payment}
    //  const hmacString = `${paymobAPIData.amount_cents}${paymobAPIData.order.created_at}${paymobAPIData.currency}${paymobAPIData.error_occured}${paymobAPIData.has_parent_transaction}${paymobAPIData.id}${paymobAPIData.integration_id}${paymobAPIData.is_3d_secure}${paymobAPIData.is_auth}${paymobAPIData.is_capture}${paymobAPIData.is_refunded}${paymobAPIData.is_voided}${paymobAPIData.order.id}${paymobAPIData.owner}${paymobAPIData.pending}${paymobAPIData.source_data.pan}${paymobAPIData.source_data.sub_type}${paymobAPIData.source_data.type}${paymobAPIData.success}`;
    //  const hashedMac = sha512.hmac(
    //    "A475CA34EDC769ECD9C709DB9AAB137B",
    //    hmacString.toString()
    //  );
    let paymobAPIData = req.body.obj;
    if (paymobAPIData.success === true) {
      OrderCheckout.findOneAndUpdate(
        { paymobId: paymobAPIData.order.id },
        { paid: true },
        { new: true },
        (err, doc) => {
          if (err) {
            alert(err);
          }
        }
      );
    } else if (paymobAPIData.success === false) {
      OrderCheckout.findOneAndDelete(
        { paymobId: paymobAPIData.order.id },
        (err, doc) => {
          if (err) {
            alert(err);
          }
        }
      );
    }
  }
  if (req?.method === "POST" && req.body.type === "orderItems") {
    await dbConnect();
    const checkoutdetails = new OrderCheckout(req.body.dataItems);
    await checkoutdetails.save();
    res.status(200).json({ message: "data" });
  }
}
export default handleCardPayment;
