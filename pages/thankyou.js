import classes from "../components/thankyou.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { sha512 } from "js-sha512";
// import { getHash } from "next/dist/server/image-optimizer";
function ThankYou(props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isApproved, setStatus] = useState();
  const [status, addStatus] = useState();

  useEffect(() => {
    if (session) {
      setTimeout(() => {
        router.push("/history");
      }, 2000);
    } else if (!session) {
      router.push("/menu");
    }
  });

  useEffect(() => {
    const { success } = router.query;
    setStatus(success);
  }, [router]);

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
      {isApproved === "true" ? (
        <div className={classes.container}>
          <h1>Thank you for your order</h1>
          {session ? (
            <p>You will be redirected to your order history page</p>
          ) : (
           null
          )}
        </div>
      ) : (
        <div className={classes.container}>
          <h1>An Error Has Occured With Your Transaction</h1>
          <p>Please try a different card or payment method</p>
        </div>
      )}
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
