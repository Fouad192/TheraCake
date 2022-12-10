import classes from "../components/thankyou.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
function ThankYou() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/history");
    }, 2000);
  });
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
      <div className={classes.container}>
        <h1>Thank you for your order</h1>
        <p>You will be redirected to your order history page</p>
      </div>
    </>
  );
}

export default ThankYou;
