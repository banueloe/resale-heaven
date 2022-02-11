import axios from "axios";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(async function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method !== "GET") {
      res
        .status(405)
        .json({ error: "This endpoint only accepts GET requests" });
      return resolve();
    }

    if (!req.session || !req.session.user.token || !req.session.user.email) {
      res.status(401).json({ error: "Unauthorized: User is not logged in" });
      return resolve();
    }

    axios
      .get(`https://apiz.ebay.com/sell/finances/v1/transaction?limit=10`, {
        headers: {
          Authorization: `Bearer ${req.session.user.token}`,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
          Accept: "application/json",
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}, sessionOptions);
