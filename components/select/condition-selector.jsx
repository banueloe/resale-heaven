import { Grid, Select, FormControl, MenuItem, InputLabel } from "@mui/material";

const ConditionSelector = ({ condition, setCondition }) => {
  const handleChange = (event) => {
    setCondition(event.target.value);
  };

  return (
    <Grid item mt={2}>
      <FormControl fullWidth>
        <InputLabel id="select-id">Condition</InputLabel>
        <Select
          id="select-component-id"
          value={condition}
          label="Condition"
          onChange={handleChange}
        >
          <MenuItem value={1}>Brand New</MenuItem>
          <MenuItem value={2}>New Other - New Without Tags</MenuItem>
          <MenuItem value={3}>Used - Excellent</MenuItem>
          <MenuItem value={4}>Used - Very Good</MenuItem>
          <MenuItem value={5}>Used - Good</MenuItem>
          <MenuItem value={6}>Used - Acceptable</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default ConditionSelector;
