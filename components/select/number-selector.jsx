import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const NumberSelector = ({ maxNum, label, selected, setSelected }) => {
  const handleChange = (event) => {
    setSelected(event.target.value);
  };

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
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default NumberSelector;
