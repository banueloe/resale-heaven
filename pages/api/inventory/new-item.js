import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import formidable from "formidable";
const axios = require("axios");
const cloudinary = require("cloudinary").v2;

//disable bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};

const postNewItem = async (fields, images, token, res, resolve) => {
  axios
    .put(
      `https://api.ebay.com/sell/inventory/v1/inventory_item/${fields.SKU}`,
      {
        product: {
          brand: fields.brand,
          description: fields.description,
          imageUrls: images,
          title: fields.name,
        },
        availability: {
          shipToLocationAvailability: { quantity: fields.quantity },
        },
        condition: fields.condition,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Language": "en-US",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then(function (response) {
      res.status(200).json({ message: "Item created succesfully" });
      return resolve();
    })
    .catch(function (error) {
      console.log(error.response.data);
      res.status(400).json({ error: `Error creating item. Try again or contact app administrator.`});
      return resolve();
    });
};

export default withIronSessionApiRoute(async function handler(req, res) {
  return new Promise(async (resolve) => {
    if (!req.method === "POST") {
      res
        .status(405)
        .json({ error: "This endpoint only accepts POST requests" });
      return resolve();
    }

    if (!req.session.user.email) {
      res.status(401).json({ error: "Unauthorized" });
      return resolve();
    }

    const data = await new Promise((resolve, reject) => {
      const form = formidable({ multiples: true });

      form.parse(req, (err, fields, files) => {
        if (err) reject({ err });
        resolve({ err, fields, files });
      });
    });

    if (data.err) {
      res.status(400).json({
        error:
          "Error parsing form data. Try again or contact app administrator.",
      });
      return resolve();
    }

    let images = Array.isArray(data.files.image) ? data.files.image: new Array(data.files.image);

    if (!images[0] || !data.fields.name || !data.fields.brand || !data.fields.description || !data.fields.quantity || !data.fields.condition) {
      res.status(400).json({ error: "Missing fields. Remember that only SKU is optional." });
      return resolve();
    }

    if (images[0]) {
      let promises = images.map(
        (file) =>
          new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
              file.filepath,
              { resource_type: "image" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
              }
            );
          })
      );
      Promise.all(promises)
        .then((imageLinks) =>
          postNewItem(data.fields, imageLinks, req.session.user.token, res, resolve)
        )
        .catch(() => {
          res.status(400).json({ message: "Error saving images" });
          return resolve();
        });
    } else {
      postNewItem(data.fields, [], req.session.user.token, res);
    }
  });
}, sessionOptions);
