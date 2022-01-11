import axios from "axios";

export default function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method === "GET") {
      //TODO SUPport used condition product searches(right now only NEW, Buy it now, products are returned)
      axios
        .get(
          `https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=${process.env.EBAY_APP_ID}&OPERATION-NAME=findItemsByKeywords&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=${req.query.keywords}&GLOBAL-ID=EBAY-US&itemFilter(0).name=Condition&itemFilter(0).value=1000&itemFilter(1).name=ListingType&itemFilter(1).value=FixedPrice`
        )
        .then((response) => {
          if (response.status === 200) {
            if (
              response.data.findItemsByKeywordsResponse[0].ack[0] === "Success" ||
              response.data.findItemsByKeywordsResponse[0].ack[0] === "Warning"
            ) {
              res.status(200).json({ activeItems: response.data.findItemsByKeywordsResponse[0].searchResult[0].item });
            } else {
              res.status(400).json({ ack: response.data.findItemsByKeywordsResponse[0].ack[0] });
            }
            return resolve();
          } else {
            res.status(response.status).json({ error: response.errorMessage });
            return resolve();
          }
        });
    } else {
      res.status(405).json({ error: "This endpoint only accepts GET requests" });
      return resolve();
    }
  });
}
