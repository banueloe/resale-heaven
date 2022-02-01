import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  if (req.body.username && req.body.password) {
    //Handle app authentication

    // get user from database then:
    req.session.user = {
      username: req.body.username,
    };
    await req.session.save();
    res
      .status(200)
      .json({ message: "Logged in" });
  } else {
    res
      .status(400)
      .json({ message: "Missing user code, username, or password" });
  }
}, sessionOptions);
