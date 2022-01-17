import axios from "axios";

const getConditionValue = (condition) => {
  if (condition === "new") {
    return 1000;
  } else if (condition === "used") {
    return 3000;
  }
  return null;
};

export default function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method === "GET") {
      let ebayEndpoint = `https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=${process.env.EBAY_APP_ID}&OPERATION-NAME=findItemsByKeywords&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&buyerPostalCode=60118&keywords=${req.query.keywords}&GLOBAL-ID=EBAY-US&itemFilter(0).name=ListingType&itemFilter(0).value=FixedPrice`;
      
      const conditionValue = getConditionValue(req.query.condition);
      if (conditionValue) {
        ebayEndpoint = ebayEndpoint.concat(`&itemFilter(1).name=Condition&itemFilter(1).value=${conditionValue}`);
      }

      axios.get(ebayEndpoint).then((response) => {
        if (response.status === 200) {
          if (
            response.data.findItemsByKeywordsResponse[0].ack[0] === "Success" ||
            response.data.findItemsByKeywordsResponse[0].ack[0] === "Warning"
          ) {
            res.status(200).json({
              activeItems:
                response.data.findItemsByKeywordsResponse[0].searchResult[0]
                  .item,
            });
          } else {
            res.status(400).json({
              ack: response.data.findItemsByKeywordsResponse[0].ack[0],
            });
          }
          return resolve();
        } else {
          res.status(response.status).json({ error: response.errorMessage });
          return resolve();
        }
      });
    } else {
      res
        .status(405)
        .json({ error: "This endpoint only accepts GET requests" });
      return resolve();
    }
  });
}
