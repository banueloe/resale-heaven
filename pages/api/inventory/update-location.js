import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import clientPromise from "../../../lib/mongodb";

export default withIronSessionApiRoute(async function handler(req, res) {
  if (!req.method === "POST") {
    res.status(405).json({ error: "This endpoint only accepts POST requests" });
  }
  if (!req.body.location || !req.body.item) {
    res.status(400).json({ error: "Missing Location name" });
  }
  if (!req.session.user.email) {
    res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("users");
    await collection.updateOne(
      { "inventoryLocations.name": req.body.location },
      {
        $push: {
          "inventoryLocations.$.inventoryItems": req.body.item,
        },
      }
    );
  } catch (e) {
    res.status(400).json({ error: `Error w/ MongoDB request. ${e}` });
  }
  res.status(200).json({ message: "Location created succesfully" });
}, sessionOptions);
