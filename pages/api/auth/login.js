import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
const EbayAuthToken = require("ebay-oauth-nodejs-client");

const scopes = [
  "https://api.ebay.com/oauth/api_scope",
  "https://api.ebay.com/oauth/api_scope/sell.inventory.readonly",
  "https://api.ebay.com/oauth/api_scope/sell.inventory",
];

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  const ebayAuthToken = new EbayAuthToken({
    clientId: process.env.EBAY_APP_ID,
    clientSecret: process.env.EBAY_CERT_ID,
    redirectUri: process.env.EBAY_RUNAME,
  });

  const authLink = ebayAuthToken.generateUserAuthorizationUrl(
    "PRODUCTION",
    scopes
  );

  if (req.body.username && req.body.password) {
    // authenticate user with database then:
    req.session.user = {
      username: req.body.username,
      password: req.body.password,
    };
    await req.session.save();
    res.redirect(
      "https://auth.ebay.com/oauth2/authorize?client_id=ErnestoB-resalehe-PRD-ca0e5e2a1-7048ac66&redirect_uri=Ernesto_Banuelo-ErnestoB-resale-oycbeqs&response_type=code&scope=https://api.ebay.com/oauth/api_scope%20https://api.ebay.com/oauth/api_scope/sell.inventory.readonly%20https://api.ebay.com/oauth/api_scope/sell.inventory"
    );
  } else {
    res
      .status(400)
      .json({ message: "Missing username or password" });
  }
}, sessionOptions);
