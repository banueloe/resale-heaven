import * as React from "react";
import { styled } from "@mui/material/styles";
import UploadIcon from "./upload-icon";

const Input = styled("input")({
  display: "none",
});

const UploadButton = ({ setImages, index }) => {
  const handleChange = (e) => {
    setImages((prevImages) => {
      let tempImages = [...prevImages];
      tempImages[index] = e.target.files[0];
      return tempImages;
    });
  };

  return (
    <label htmlFor={`upload-button-${index}`}>
      <Input
        accept="image/*"
        id={`upload-button-${index}`}
        type="file"
        onChange={handleChange}
      />
      <UploadIcon />
    </label>
  );
};

export default UploadButton;
