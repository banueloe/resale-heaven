import { Grid, Select, FormControl, MenuItem, InputLabel } from "@mui/material";

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
          <MenuItem value={"NEW"}>Brand New</MenuItem>
          <MenuItem value={"NEW_OTHER"}>New Other - New Without Tags</MenuItem>
          <MenuItem value={"USED_EXCELLENT"}>Used </MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default ConditionSelector;
