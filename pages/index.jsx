import clientPromise from "../lib/mongodb";
import { Button, Grid } from "@mui/material";
import Image from "next/image";
import BookSale from "../public/booksale.jpg";

const EbayAuthToken = require("ebay-oauth-nodejs-client");

const scopes = [
  "https://api.ebay.com/oauth/api_scope",
  "https://api.ebay.com/oauth/api_scope/sell.inventory.readonly",
  "https://api.ebay.com/oauth/api_scope/sell.inventory",
];

export async function getServerSideProps(context) {
  const ebayAuthToken = new EbayAuthToken({
    clientId: process.env.EBAY_APP_ID,
    clientSecret: process.env.EBAY_CERT_ID,
    redirectUri: process.env.EBAY_RUNAME,
  });

  const authLink = ebayAuthToken.generateUserAuthorizationUrl(
    "PRODUCTION",
    scopes
  );

  try {
    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    const client = await clientPromise;
    const db = client.db();
    // const collection= db.collection('email');

    // await collection.insertOne({email: "johndoe@gmail.com"});

    return {
      props: { isConnected: true, authLink: authLink },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false, authLink: authLink },
    };
  }
}

export default function LandingPage({ isConnected, authLink }) {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Image src={BookSale} alt="Picture of the author" layout="responsive" height="100" width="100" />
      </Grid>
      <Grid item xs={6}>
        <main>
          <h1 className="title">Welcome to Resale Heaven</h1>

          <Button
            variant="contained"
            onClick={() => {
              window.open(authLink);
            }}
          >
            Sign In
          </Button>

          {isConnected ? (
            <h2 className="subtitle">You are connected to MongoDB</h2>
          ) : (
            <h2 className="subtitle">
              You are NOT connected to MongoDB. Check the <code>README.md</code>{" "}
              for instructions.
            </h2>
          )}
        </main>

        <style jsx>{`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .title a {
            color: #0070f3;
            text-decoration: none;
          }

          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }

          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }

          .title,
          .description {
            text-align: center;
          }

          .subtitle {
            font-size: 2rem;
          }

          .description {
            line-height: 1.5;
            font-size: 1.5rem;
          }

          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }

          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;

            max-width: 800px;
            margin-top: 3rem;
          }

          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }

          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
          }

          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }

          .logo {
            height: 1em;
          }

          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}</style>
      </Grid>
    </Grid>
  );
}
