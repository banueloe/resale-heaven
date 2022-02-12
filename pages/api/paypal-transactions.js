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
    
    if (!req.session || !req.session.user.token || !req.session.user.email || !req.session.user.paypal_token) {
      res.status(401).json({ error: "Unauthorized: User is not logged in" });
      return resolve();
    }

    axios
      .get(`https://api-m.paypal.com/v1/reporting/transactions`, {
        params: {start_date: "2021-01-01T00:00:00Z", end_date: "2021-01-31T23:59:59Z", page_size: 500},
        headers: {
          Authorization: `Bearer ${req.session.user.paypal_token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
          console.log("response," , response);
        res.status(200).json({ data: response.data });
        return resolve();
      })
      .catch((error) => {
          console.log(error);
        res.status(400).json({ error: "Error getting transaction data." });
        return resolve();
      });
  });
}, sessionOptions);
