import axios from "axios";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";

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

    if(!req.query.start || !req.query.end){
      res.status(400).json({ error: "Error: Missing start or end date in request." });
      return resolve();
    }
    axios
      .get(
        `https://apiz.ebay.com/sell/finances/v1/transaction?limit=1000&filter=transactionDate:[${req.query.start}..${req.query.end}]`,
        {
          headers: {
            Authorization: `Bearer ${req.session.user.token}`,
            "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        // todo clean up code

        let adFees = response.data.transactions.filter(transaction => transaction.transactionType === "NON_SALE_CHARGE");
        adFees = adFees.map((transaction) => {
          console.log(transaction.references[1]);
          return {
            category: "Ad Fee",
            source: "eBay",
            description: transaction.feeType,
            amount: +transaction.amount.value,
            orderId: transaction.references[1] ? transaction.references[1].referenceId: '',
            transactionId: transaction.transactionId,
            date: transaction.transactionDate,
          };
        });
        let refunds = response.data.transactions.filter(transaction => transaction.transactionType === "REFUND");
        refunds = refunds.map((transaction) => {
          return {
            category: "Refund",
            source: "eBay",
            description: `Refund for ${transaction.buyer.username}'s order #${transaction.orderId}`,
            amount: +transaction.amount.value,
            orderId: transaction.orderId,
            transactionId: transaction.transactionId,
            date: transaction.transactionDate,
          };
        });

        let shippingLabels = response.data.transactions.filter(transaction => transaction.transactionType === "SHIPPING_LABEL");
        shippingLabels = shippingLabels.map((transaction) => {
          return {
            category: "Postpaid Shipping",
            source: "eBay",
            description: transaction.transactionMemo,
            amount: +transaction.amount.value,
            orderId: '',
            transactionId: transaction.transactionId,
            date: transaction.transactionDate,
          };
        });
        let orders = response.data.transactions.filter(transaction => transaction.transactionType === "SALE");
        const sales = orders.map((transaction) => {
          return {
            category: "Sale",
            source: "eBay",
            description: `Sale to ${transaction.buyer.username}`,
            amount: +transaction.totalFeeBasisAmount.value,
            orderId: transaction.orderId,
            transactionId: transaction.transactionId,
            date: transaction.transactionDate,
          };
        });
        const fees = orders.map((transaction) => {
          return {
            category: "eBay Sale Fees",
            source: "eBay",
            description: `Fees for sale to ${transaction.buyer.username}`,
            amount: +transaction.totalFeeAmount.value,
            orderId: transaction.orderId,
            transactionId: transaction.transactionId,
            date: transaction.transactionDate,
          };
        });

        res.status(200).json({ sales: sales, fees: [...adFees, ...shippingLabels, ...fees, ...refunds] });
        return resolve();
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ error: "Error getting transaction data." });
        return resolve();
      });
  });
}, sessionOptions);
