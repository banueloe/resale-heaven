import { useState } from "react";
import { Button, Grid, Typography, TextField } from "@mui/material";
import Image from "next/image";
import Office from "../public/office.jpg";

export async function getServerSideProps(context) {
  return {};
}

export default function LandingPage({ authLink }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (newUser) => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        newUser: newUser,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
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
        <Typography variant="h3" mt={16}>
          Welcome to Resale Heaven
        </Typography>

        <Grid item mt={2}>
          <TextField
            sx={{ input: { background: "white" }, width: "45ch" }}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            label="Username"
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
            onClick={() => handleLogin(true)}
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
