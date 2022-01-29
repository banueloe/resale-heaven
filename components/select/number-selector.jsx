import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const NumberSelector = ({ maxNum, label, selected, onChange }) => {
  let options = [];
  for (let i = 1; i <= maxNum; i++) {
    options.push(i);
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="Number-select-label">{label}</InputLabel>
      <Select
        id="selector-id"
        value={selected}
        label={label}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default NumberSelector;
