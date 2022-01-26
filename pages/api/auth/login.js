import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
const EbayAuthToken = require("ebay-oauth-nodejs-client");

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  if (req.query.code) {
    const ebayAuthToken = new EbayAuthToken({
      clientId: process.env.EBAY_APP_ID,
      clientSecret: process.env.EBAY_CERT_ID,
      redirectUri: process.env.EBAY_RUNAME,
    });
    // Exchange Code for Authorization token
    await ebayAuthToken
      .exchangeCodeForAccessToken("PRODUCTION", req.query.code)
      .then(async (data) => {
        let dataObject = JSON.parse(data);//Todo use refresh token
        if (dataObject.access_token) {
          //get auth token then:
          req.session.user = {
            token: dataObject.access_token,
          };
          await req.session.save().then(() => {
            res.redirect("/home");
          });
        } else {
          res.redirect("/");
          return resolve();
        }
      })
      .catch((error) => {
        console.log(`Error getting Access token :${JSON.stringify(error)}`);
        res.redirect("/");
      });
  } else {
    console.log("Missing code");
    res.redirect("/");
  }
}, sessionOptions);
