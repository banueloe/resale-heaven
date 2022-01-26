import { Grid, TextField } from "@mui/material";

const ControlledTextInput = ({value, setValue, label, marginTop}) => {
  return (
    <Grid item mt={marginTop}>
      <TextField
        fullWidth={true}
        onChange={(event) => setValue(event.target.value)}
        value={value}
        label={label}
      />
    </Grid>
  );
};

ControlledTextInput.defaultProps = {
    marginTop : 2
  }
export default ControlledTextInput;
