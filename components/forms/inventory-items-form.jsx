import { useState } from "react";
import { Grid, Button, Alert } from "@mui/material";
import NumberSelector from "../select/number-selector";
import ControlledTextInput from "./controlled-text-field";
import ConditionSelector from "../select/condition-selector";
import ImageUpload from "../images/image-upload";
import { useRouter } from "next/router";

const MAX_IMAGES = 12;

const ItemsForm = () => {
  const [userInput, setUserInput] = useState({
    SKU: "",
    name: "",
    brand: "",
    description: "",
    quantity: "",
    condition: "",
    imageLinks: [],
  });
  const [images, setImages] = useState(Array(MAX_IMAGES).fill(null));
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userInput.name) {
      setError(`Error: The "Location Name" field is required.`); //TODO handle form check
    } else {
      const formData = new FormData();
      Object.keys(userInput).forEach((input) => {
        formData.append(input, userInput[input]);
      });

      images.forEach((image) => {
        if (image) {
          formData.append("image", image);
        }
      });

      fetch("/api/inventory/new-item", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (res.ok) {
            router.push("/inventory");
          } else {
            return res.text();
          }
        })
        .then((error) => {
          setError(error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ControlledTextInput
        value={userInput.SKU}
        onChange={(event) =>
          setUserInput({ ...userInput, SKU: event.target.value })
        }
        label="Custom SKU (Leave empty to default to next available SKU)"
        marginTop={6}
      />
      <ControlledTextInput
        value={userInput.name}
        onChange={(event) =>
          setUserInput({ ...userInput, name: event.target.value })
        }
        label="Inventory Item Name"
      />
      <ControlledTextInput
        value={userInput.brand}
        onChange={(event) =>
          setUserInput({ ...userInput, brand: event.target.value })
        }
        label="Brand"
      />
      <ControlledTextInput
        value={userInput.description}
        onChange={(event) =>
          setUserInput({ ...userInput, description: event.target.value })
        }
        label="Description: Basic HTML tags are supported"
        multiline={true}
      />
      <ConditionSelector
        condition={userInput.condition}
        onChange={(event) =>
          setUserInput({ ...userInput, condition: event.target.value })
        }
      />
      <Grid item mt={2}>
        <NumberSelector
          label="Quantity"
          maxNum={10}
          selected={userInput.quantity}
          onChange={(event) =>
            setUserInput({ ...userInput, quantity: event.target.value })
          }
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
