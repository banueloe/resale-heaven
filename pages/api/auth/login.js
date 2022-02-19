import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import clientPromise from "../../../lib/mongodb";
import { v4 as uuidv4 } from "uuid";
import { hashString, verifyPassword } from "../../../lib/encryption";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  const { email, password, newUser } = req.body;

  if (!email ||!email.includes("@") || !password || password.trim().length < 7) {
    res.status(422).json("Invalid email or password. Password must be 8 characters or longer.");
    return;
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("users");
    const existingUser = await collection.findOne({ email: email });
    const hashedPassword = await hashString(password);

    if (newUser) {
      if (Array.isArray(existingUser) && existingUser.length > 0) {
        res.status(422).json("Account with this email already exists");
        return;
      }

      await collection.insertOne({
        _id: uuidv4(),
        email: email,
        password: hashedPassword,
        inventoryLocations: [],
        expenses: [],
      });
    } else {
      const isValid = await verifyPassword(password, existingUser.password);
      if (!existingUser || !isValid) {
        res.status(422).json("Incorrect Email address or password. Please Try again.");
        return;
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(`Unknown error. Please contact site admin or try again later. Error message: ${e}`);
    return;
  }

  req.session.user = {
    email: email,
  };
  await req.session.save();
  res.status(200).json({ message: "Logged in" });
}, sessionOptions);
