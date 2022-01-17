import { Grid, Button } from "@mui/material";
import { useRouter } from "next/router";
const EbayAuthToken = require("ebay-oauth-nodejs-client");

export async function getServerSideProps(context) {
  const ebayAuthToken = new EbayAuthToken({
    clientId: process.env.EBAY_APP_ID,
    clientSecret: process.env.EBAY_CERT_ID,
    redirectUri: process.env.EBAY_RUNAME,
  });
  // Exchange Code for Authorization token
  ebayAuthToken
    .exchangeCodeForAccessToken("PRODUCTION", context.query.code)
    .then((data) => {
      console.log("data is ", data);
    })
    .catch((error) => {
      console.log(`Error to get Access token :${JSON.stringify(error)}`);
    });

  return { props: {} };
}

const Home = () => {
  const router = useRouter();
  if (router.query.code) {
    return (
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <Button>Test</Button>
        </Grid>
        {router.query.code}
      </Grid>
    );
  } else {
    return (
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <h>Authentication Error</h>
        </Grid>
        <h2>
          Authentication is required to use certain features in resale-heaven.
          Please try again.
        </h2>
        <Button>Sign in</Button>
      </Grid>
    );
  }
};

export default Home;
