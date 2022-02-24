import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import clientPromise from "../../../lib/mongodb";
import { v4 as uuidv4 } from "uuid";

export default withIronSessionApiRoute(async function handler(req, res) {
  if (!req.method === "POST") {
    res.status(405).json({ error: "This endpoint only accepts POST requests" });
  }
  if (!req.body.date || !req.body.amount || !req.body.description) {
    res.status(400).json({ error: "Missing fields from request body" });
  }
  if (!req.session.user.email) {
    res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("users");

    await collection.updateOne(
      { email: req.session.user.email },
      {
        $push: {
          expenses: {
            id: uuidv4(),
            date: req.body.date,
            amount: req.body.amount,
            description: req.body.description,
            category: "Miscellaneous Expense"
          },
        },
      }
    );
  } catch (e) {
    res.status(400).json({ error: `Error w/ MongoDB request. ${e}` });
  }
  res.status(200).json({ message: "New-Expense Saved Succesfully" });
}, sessionOptions);