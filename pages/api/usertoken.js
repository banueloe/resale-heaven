const EbayAuthToken = require("ebay-oauth-nodejs-client");

export default function handler(req, res) {
  if (req.method === "POST") {
    const ebayAuthToken = new EbayAuthToken({
      clientId: process.env.EBAY_APP_ID,
      clientSecret: process.env.EBAY_CERT_ID,
      redirectUri: process.env.EBAY_RUNAME,
    });
    console.log(req.body.code, "testing")
    // Exchange Code for Authorization token
    ebayAuthToken
      .exchangeCodeForAccessToken("PRODUCTION", req.body.code)
      .then((data) => {
        console.log(data);
        res.status(200).json({ data: data});
      })
      .catch((error) => {
        console.log(`Error to get Access token :${JSON.stringify(error)}`);
        res.status(200).json({ error: error});
      });
      
  } else {
    res
      .status(405)
      .json({ error: "This endpoint only accepts POST requests" });
  }
}
