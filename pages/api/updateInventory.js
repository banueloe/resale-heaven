import { v4 as uuidv4 } from "uuid";

export default async function handler (req, res) {
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("inventoryLocations");
      await collection.insertOne({
        _id: uuidv4(),
        inventoryLocations: [],
        name: req.body.name,
        inventoryItems: [],
      });
    } catch (e) {
      res
        .status(200)
        .json({ error: "Error w/ MongoDB request."});
    }
    res
      .status(200)
      .json({ message: "Notication received: User account data deleted" });
  } else if (req.method === "PUT") {
    res
      .status(200)
      .json({ message: "Notication received: User account data deleted" });
  } else {
    res
      .status(405)
      .json({ error: "This endpoint only accepts POST and PUT requests" });
  }
}
