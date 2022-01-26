import { useState } from "react";
import { Grid, Button, TextField, Alert } from "@mui/material";

const LocationForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      setError(`Error: The "Location Name" field is required.`);
    } else {
        //TODO handle api call
      // fetch(`/api/activeitems?keywords=${keywords}&condition=${conditionValue}`)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setActiveItems(data.activeItems);
      //     setDisplayForm(false);
      //   });
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
