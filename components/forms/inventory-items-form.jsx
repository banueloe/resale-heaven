import { useState } from "react";
import { Grid, Button, Alert } from "@mui/material";
import NumberSelector from "../select/number-selector";
import ControlledTextInput from "./controlled-text-field";
import ConditionSelector from "../select/condition-selector";
import ImageUpload from "../images/image-upload";

const MAX_IMAGES = 12;
const ItemsForm = () => {
  const [SKU, setSKU] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState();
  const [condition, setCondition] = useState();
  const [brand, setBrand] = useState();
  const [images, setImages] = useState(Array(MAX_IMAGES).fill(null));

  const [error, setError] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      setError(`Error: The "Location Name" field is required.`);
    } else {
      //TODO handle api call
      // fetch(`/api/activeitems?keywords=${keywords}&condition=${conditionValue}`)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setActiveItems(data.activeItems);
      //     setDisplayForm(false);
      //   });
    }
  };

  //TODO support image upload
  return (
    <form onSubmit={handleSubmit}>
      <ControlledTextInput
        value={SKU}
        setValue={setSKU}
        label="SKU: Input custom SKU or leave empty to use next available SKU"
        marginTop={6}
      />
      <ControlledTextInput
        value={name}
        setValue={setName}
        label="Inventory Item Name"
      />
      <ControlledTextInput value={brand} setValue={setBrand} label="Brand" />
      <ControlledTextInput
        value={description}
        setValue={setDescription}
        label="Description: Basic HTML tags are supported"
        multiline={true}
      />
      <ConditionSelector condition={condition} setCondition={setCondition} />
      <Grid item mt={2}>
        <NumberSelector
          label="Quantity"
          maxNum={10}
          selected={quantity}
          setSelected={setQuantity}
        />
      </Grid>
      <Grid item mt={2}>
        <ImageUpload images={images} setImages={setImages} />
      </Grid>

      {error && <Alert severity="error">{error}</Alert>}
      <Grid item mt={2}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default ItemsForm;
