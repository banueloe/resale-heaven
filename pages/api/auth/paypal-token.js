import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
const axios = require("axios");

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  let dataString = "grant_type=client_credentials";
  await axios
    .post("https://api-m.paypal.com/v1/oauth2/token", dataString, {
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(async (data) => {
      req.session.user = {
        ...req.session.user,
        paypal_token: data.data.access_token,
      };
      await req.session.save().then(() => {
        res.status(200).json({ token: data.data.scope });
      });
    })
    .catch((error) => {
      res.status(400).json({ error: `Error getting Access token :${error}` });
    });
}, sessionOptions);
