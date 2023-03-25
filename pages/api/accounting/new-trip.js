import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import clientPromise from "../../../lib/mongodb";
import { v4 as uuidv4 } from "uuid";
const axios = require("axios");

const STANDARD_MILEAGE_RATE = .655; //2023 Standard Mileage Rate
function getMiles(i) {
    return i*0.000621371192;
}

export default withIronSessionApiRoute(async function handler(req, res) {
  if (!req.method === "POST") {
    res.status(405).json({ error: "This endpoint only accepts POST requests" });
  }
  if (!req.body.date || !req.body.placeIds || !req.body.placeNames) {
    res
      .status(400)
      .json({ error: "Missing date or placeIds from request body." });
  }
  if (!req.session.user.email) {
    res.status(401).json({ error: "Unauthorized" });
  }

  const { placeIds, placeNames } = req.body;
  let waypoints = "";
  for (let i = 1; i < placeIds.length - 1; i++) {
    waypoints += `place_id:${placeIds[i]}|`;
  }

  axios({
    method: "get",
    url: `https://maps.googleapis.com/maps/api/directions/json?key=${process.env.NEXT_PUBLIC_GCP_API_KEY}&origin=place_id:${placeIds[0]}&destination=place_id:${placeIds[placeIds.length - 1]}&waypoints=${waypoints}`,
    headers: {},
  })
    .then(async function (response) {
      const tripLegs = response.data.routes[0].legs;
      let distance = 0;
      tripLegs.forEach((leg) => (distance += leg.distance.value));
      const miles = getMiles(distance);

      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("users");

      await collection.updateOne(
        { email: req.session.user.email },
        {
          $push: {
            expenses: {
              transactionId: uuidv4(),
              date: req.body.date,
              placeIds: placeIds,
              placeNames: placeNames,
              distance: distance,
              miles: miles,
              amount: miles * STANDARD_MILEAGE_RATE,
              category: "Mileage Deduction"
            },
          },
        }
      );
      res.status(200).json({ message: "Trip expense saved succesfully" });
    })
    .catch(function (error) {
      console.log(error);
      res.status(400).json({ message: "Error calculating trip distance" });
    });
}, sessionOptions);
