import classes from "../components/thankyou.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
// import handleCardPayment from "./api/cardPayment";
import { useSession } from "next-auth/react";

function ThankYou() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isApproved, setStatus] = useState();
  const [status, addStatus] = useState();

  useEffect(() => {
    if (session) {
      setTimeout(() => {
        router.push("/history");
      }, 2000);
    } else if(!session) {
      router.push('/menu')
    }
  });
  // useEffect(() => {
  //   const data = handleCardPayment()
  //   addStatus(data)
  //   console.log(data)
  //   // console.log(res, "results")
  // // addStatus(handleCardPayment())
  // }, [])

  // useEffect(() => {
  //   const { success } = router.query;
  //   setStatus(success)
  //   console.log(router.query)
  //   console.log(success)
  // }, [router]);

  return (
    <>
      <Head>
        <title>Thank you</title>
        <meta
          name="description"
          content="This dessert made with great love,
extreme dedication and the best quality"
        />
      </Head>
      {/* {isApproved === 'true' ? ( */}
      <div className={classes.container}>
        <h1>Thank you for your order</h1>
        <p>You will be redirected to your order history page</p>
      </div>
      {/* ) : ( */}
      {/* <div className={classes.container}>
          <h1>An Error Has Occured With Your Transaction</h1>
          <p>Please try a different card or payment method</p>
        </div> */}
      {/* )} */}
    </>
  );
}

export default ThankYou;
