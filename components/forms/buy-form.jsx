import { useState } from "react";
import { Grid, Button, TextField } from "@mui/material";
import LabelledCheckbox from "../checkbox/labelled-checkbox";

const conditionOptions = [
  { value: "new", label: "New" },
  { value: "used", label: "Used" },
  { value: "all", label: "View All" },
];

const BuyForm = ({ setActiveItems }) => {
  const [keywords, setKeywords] = useState("");
  const [conditionValue, setConditionValue] = useState("new");
  const [displayForm, setDisplayForm] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/activeitems?keywords=${keywords}&condition=${conditionValue}`)
      .then((response) => response.json())
      .then((data) => {
        setActiveItems(data.activeItems);
        setDisplayForm(false);
      });
  };

  if (displayForm) {
    return (
      <form onSubmit={handleSubmit}>
        <Grid item mb={2}>
          <TextField
            id="keyword-input"
            label="Keywords"
            value={keywords}
            onChange={(event) => setKeywords(event.target.value)}
            onClick={() => {
              if (!displayForm) {
                setDisplayForm(true);
              }
            }}
            required
          />
        </Grid>
        <div>
          <Grid item mb={1}>
            <LabelledCheckbox
              label="Condition"
              category={conditionValue}
              setCategory={setConditionValue}
              options={conditionOptions}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </div>
      </form>
    );
  } else {
    return (
      <Grid item>
        <Button
          variant="contained"
          onClick={() => {
            setDisplayForm(true);
          }}
        >
          Search for a different item
        </Button>
      </Grid>
    );
  }
};

export default BuyForm;
