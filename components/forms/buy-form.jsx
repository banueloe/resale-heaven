import { useState } from "react";
import { Grid, Button, TextField } from "@mui/material";

const BuyForm = ({ setActiveItems }) => {
  const [keywords, setKeywords] = useState("");

  const getActiveItems = (keywords) => {
    fetch(`/api/activeitems?keywords=${keywords}`)
      .then((response) => response.json())
      .then((data) => {
        setActiveItems(data.activeItems);
        console.log(data.activeItems);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getActiveItems(keywords);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid item>
        <TextField
          id="keyword-input"
          label="Keywords"
          value={keywords}
          onChange={(event) => setKeywords(event.target.value)}
          required
        />
      </Grid>
      <Grid item>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default BuyForm;
