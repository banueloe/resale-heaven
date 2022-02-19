import { Grid, Select, FormControl, MenuItem, InputLabel } from "@mui/material";
import conditionOptions from "../../lib/conditionOptions";

const ConditionSelector = ({ condition, onChange }) => {
  return (
    <Grid item mt={2}>
      <FormControl fullWidth>
        <InputLabel id="select-id">Condition</InputLabel>
        <Select
          id="select-component-id"
          value={condition}
          label="Condition"
          onChange={onChange}
        >
          {conditionOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default ConditionSelector;
