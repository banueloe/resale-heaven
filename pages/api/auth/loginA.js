import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    // get user from database then:
    req.session.user = {
      id: 230,
      admin: true,
    };
    await req.session.save();
    res.redirect("https://auth.ebay.com/oauth2/authorize?client_id=ErnestoB-resalehe-PRD-ca0e5e2a1-7048ac66&redirect_uri=Ernesto_Banuelo-ErnestoB-resale-oycbeqs&response_type=code&scope=https://api.ebay.com/oauth/api_scope%20https://api.ebay.com/oauth/api_scope/sell.inventory.readonly%20https://api.ebay.com/oauth/api_scope/sell.inventory");
  },
  sessionOptions
);