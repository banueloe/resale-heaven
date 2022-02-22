import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
const axios = require("axios");

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  if (req.method !== "GET")
    res.status(405).json({ error: "This endpoint only accepts GET requests" });

  if (!req.session.user || !req.session.user.token || !req.session.user.email)
    res.status(401).json({ error: "Unauthorized: User is not logged in" });

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
      if (data.data.access_token) {
        req.session.user = {
          ...req.session.user,
          paypal_token: data.data.access_token,
        };
        console.log(req.session.user, "log")
        await req.session.save().then(() => {
          res
            .status(200)
            .json({ Success: "Paypal token has been stored in user session" });
        });
      }
    })
    .catch((error) => {
      res.status(400).json({ error: `Error getting Access token :${error}` });
    });
}, sessionOptions);
