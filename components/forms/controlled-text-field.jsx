import { Grid, TextField } from "@mui/material";

const ControlledTextInput = ({value, setValue, label, marginTop, multiline}) => {
  return (
    <Grid item mt={marginTop}>
      <TextField
        fullWidth={true}
        onChange={(event) => setValue(event.target.value)}
        value={value}
        label={label}
        multiline={multiline}
        rows={12}
      />
    </Grid>
  );
};

ControlledTextInput.defaultProps = {
    marginTop : 2
  }
export default ControlledTextInput;
