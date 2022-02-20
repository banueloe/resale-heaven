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

    if (!req.query.start || !req.query.end) {
      res
        .status(400)
        .json({ error: "Error: Missing start or end date in request." });
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
        let sales = [];
        let expenses = [];

        response.data.transactions.forEach((transaction) => {
          let sale = null;
          let expense = null;
          let defaultTransaction = {
            category: transaction.transactionType,
            source: "eBay",
            transactionId: transaction.transactionId,
            amount: +transaction.amount.value,
            date: transaction.transactionDate,
            orderId: transaction.orderId ? transaction.orderId : "",
          };
          switch (transaction.transactionType) {
            case "NON_SALE_CHARGE":
              expense = {
                ...defaultTransaction,
                category: "Ad Fee",
                description: transaction.feeType,
                orderId: transaction.references[1]
                  ? transaction.references[1].referenceId
                  : "",
              };
              break;
            case "REFUND":
              expense = {
                ...defaultTransaction,
                description: `Refund for ${transaction.buyer.username}'s order #${transaction.orderId}`,
              };
              break;
            case "SHIPPING_LABEL":
              expense = {
                ...defaultTransaction,
                description: transaction.transactionMemo,
              };
              break;
            case "SALE":
              sale = {
                ...defaultTransaction,
                description: `Sale to ${transaction.buyer.username}`,
                amount: +transaction.totalFeeBasisAmount.value,
              };
              expense = {
                ...defaultTransaction,
                category: "eBay Sale Fees",
                description: `Fees for sale to ${transaction.buyer.username}`,
                amount: +transaction.totalFeeAmount.value,
              };
              break;
          }
          if (expense) expenses.push(expense);
          if (sale) sales.push(sale);
        });

        res.status(200).json({ sales: sales, expenses: expenses });
        return resolve();
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ error: "Error getting transaction data." });
        return resolve();
      });
  });
}, sessionOptions);
