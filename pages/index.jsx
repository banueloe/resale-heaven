import { useState } from "react";
import { Button, Grid, Typography, TextField, Alert } from "@mui/material";
import Image from "next/image";
import Office from "../public/office.jpg";
import {useRouter} from "next/router";
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
  return {
    props: { authLink: authLink },
  };
}

export default function LandingPage({ authLink }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const router = useRouter()

  const handleLogin = (newUser) => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        newUser: newUser,
      }),
    })
      .then((res) => {
        if (res.ok) {
          router.push(authLink);
        } else {
          return res.text();
        }
      })
      .then((error) => {
        setError(error);
      });
  };

  return (
    <>
      <div className="bgWrap">
        <Image
          alt="background image"
          priority={true}
          src={Office}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      <Grid container alignItems="center" justify="center" direction="column">
        <Typography variant="h1" mt={16}>
          Welcome to Resale Heaven
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Grid item mt={2}>
          <TextField
            sx={{ input: { background: "white" }, width: "45ch" }}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            label="Email"
          />
        </Grid>

        <Grid item mt={2} mb={2}>
          <TextField
            sx={{ input: { background: "white" }, width: "45ch" }}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            label="Password"
          />
        </Grid>

        <Grid item mt={2} mb={2}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={(event) => {
              event.preventDefault();
              handleLogin(true);
            }}
          >
            Create Account
          </Button>
          <Button variant="contained" onClick={() => handleLogin(false)}>
            Login
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
