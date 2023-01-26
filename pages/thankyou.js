import classes from "../components/thankyou.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { sha512 } from "js-sha512";
function ThankYou(props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isApproved, setStatus] = useState();
  const [redirected, isRedirected] = useState();

  useEffect(() => {
    if (session) {
      setTimeout(() => {
        router.push("/history");
      }, 3000);
    } else if (!session) {
      setTimeout(() => {
        router.push("/menu");
      }, 3000);
    }
  });

  useEffect(() => {
    const { success } = router.query;
    setStatus(success);
    if (Object.keys(router.query).length === 0) {
      isRedirected(false);
    } else {
      isRedirected(true);
    }
  }, [router]);
  function returnRender() {
    if (redirected) {
      if (isApproved === "true") {
        return (
          <div className={classes.container}>
            <h1>Thank you for your order</h1>
            {session ? (
              <p>You will be redirected to your order history page</p>
            ) : null}
          </div>
        );
      } else if (isApproved === "false") {
        return (
          <div className={classes.container}>
            <h1>An Error Has Occured With Your Transaction</h1>
            <p>Please try a different card or payment method</p>
          </div>
        );
      }
    } else if (!redirected) {
      return (
        <div className={classes.container}>
          <h1>Thank you for your order</h1>
          {session ? (
            <p>You will be redirected to your order history page</p>
          ) : null}
        </div>
      );
    }
  }
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
      {returnRender()}
    </>
  );
}
// export async function getServerSideProps(ctx) {
//   const data = ctx.query;
//   const hmacString = `${data.amount_cents}${data.created_at}${data.currency}${data.error_occured}${data.has_parent_transaction}${data.id}${data.integration_id}${data.is_3d_secure}${data.is_auth}${data.is_capture}${data.is_refunded}${data.is_standalone_payment}${data.is_voided}${data.order}${data.owner}${data.pending}${data["source_data.pan"]}${data["source_data.sub_type"]}${data["source_data.type"]}${data.success}`;
//   const hashedMac = sha512.hmac(
//     "A475CA34EDC769ECD9C709DB9AAB137B",
//     hmacString.toString()
//   );
//   return {
//     props: {
//       data: data,
//       hmacString,
//       hashedMac
//     },
//   };
// }
export default ThankYou;
