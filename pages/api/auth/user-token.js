import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
const EbayAuthToken = require("ebay-oauth-nodejs-client");

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  if (req.query.code) {
    //Handle eBay Authentication
    const ebayAuthToken = new EbayAuthToken({
      clientId: process.env.EBAY_APP_ID,
      clientSecret: process.env.EBAY_CERT_ID,
      redirectUri: process.env.EBAY_RUNAME,
    });
    // Exchange Code for Authorization token
    await ebayAuthToken
      .exchangeCodeForAccessToken("PRODUCTION", req.query.code)
      .then(async (data) => {
        let dataObject = JSON.parse(data);
        await axios
          .post(
            "https://api-m.paypal.com/v1/oauth2/token",
            "grant_type=client_credentials",
            {
              auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_SECRET,
              },
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then(async (paypalData) => {
            req.session.user = {
              ...req.session.user,
              paypal_token: paypalData.data.access_token,
              token: dataObject.access_token,
            };
            await req.session.save().then(() => {
              res.redirect("/home");
            });
          });
      })
      .catch((error) => {
        console.log(`Error getting Access token :${JSON.stringify(error)}`);
        res.redirect("/");
      });
  } else {
    console.log("Error: missing code");
    res.redirect("/");
  }
}, sessionOptions);
