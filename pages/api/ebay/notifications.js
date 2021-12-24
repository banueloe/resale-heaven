const crypto = require('crypto');
 export default function handler(req, res) {
   if (req.method === "GET") {
     const challengeCode = req.query.challenge_code;

     const hash = crypto.createHash("sha256");
     hash.update(challengeCode);
     hash.update(process.env.VERIFICATION_TOKEN);
     hash.update(process.env.EBAY_NOTIFICATIONS_ENDPOINT);
     const responseHash = hash.digest("hex");
     let challengeResponse = new Buffer.from(responseHash).toString();

     res.status(200).json({ challengeResponse: challengeResponse });
   } else {
     res.status(405).json({ error: "This endpoint only accepts GET requests" });
   }
 }