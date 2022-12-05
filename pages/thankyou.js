import classes from "../components/thankyou.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

function ThankYou() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/history");
    }, 2000);
  });
  return (
    <div className={classes.container}>
      <h1>Thank you for your order</h1>
      <p>You will be redirected to your order history page</p>
    </div>
  );
}

export default ThankYou;
