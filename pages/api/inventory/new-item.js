import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import formidable from "formidable";
const axios = require('axios');
const cloudinary = require("cloudinary").v2;

//disable bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};

const postNewItem = async (fields, images) => {
    console.log(fields, images);
};

export default withIronSessionApiRoute(async function handler(req, res) {
  if (!req.method === "POST")
    res.status(405).json({ error: "This endpoint only accepts POST requests" });
  if (!req.session.user.email) res.status(401).json({ error: "Unauthorized" });

  const data = await new Promise((resolve, reject) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) reject({ err });
      resolve({ err, fields, files });
    });
  });

  if (data.err)
    res.status(405).json({
      error: "Error parsing form data. Try again or contact app administrator.",
    });

  let images = Array.isArray(data.files.image) ? data.files.image : new Array(data.files.image);
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
      .then((imageLinks) => postNewItem(data.fields, imageLinks))
      .catch(() => {
        res.status(400).json({ message: "Error saving images" });
      });
  } else {
    postNewItem(data.fields, []);
  }

  res.status(200).json({ message: "Item created succesfully" });
}, sessionOptions);
