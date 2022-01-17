import { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";

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
        <Grid item>
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
          <Grid item>
            <FormControl component="fieldset">
              <FormLabel component="legend">Condition</FormLabel>
              <RadioGroup
                aria-label="condition"
                name="condition-radio-buttons-group"
                value={conditionValue}
                onChange={(event) => {
                  setConditionValue(event.target.value);
                }}
              >
                <FormControlLabel value="new" control={<Radio />} label="New" />
                <FormControlLabel
                  value="used"
                  control={<Radio />}
                  label="Used"
                />
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="View All"
                />
              </RadioGroup>
            </FormControl>
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
