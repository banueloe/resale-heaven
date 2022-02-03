import { useState } from "react";
import { Grid, Button, TextField, Alert } from "@mui/material";
import {useRouter} from "next/router";

const LocationForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      setError(`Error: The "Location Name" field is required.`);
    } else {
      fetch("/api/inventory/new-location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      })
        .then((res) => {
          if (res.ok) {
            router.push('/inventory');
          } else {
            return res.text();
          }
        })
        .then((error) => {
          setError(error);
        });
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid item mt={6}>
          <TextField
            fullWidth={true}
            onChange={(event) => setName(event.target.value)}
            value={name}
            label="Location Name"
          />
        </Grid>
        <Grid item mt={2}>
          <TextField
            fullWidth={true}
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            label="Location Description"
          />
        </Grid>
        <Grid item mt={2}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default LocationForm;
