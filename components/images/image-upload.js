import PreviewImage from "./preview-image";
import UploadButton from "./upload-button";
import { Grid } from "@mui/material";

const ImageUpload = ({ images, setImages }) => {
  return (
    <>
      <Grid container direction="row">
        {images.map((image, index) =>
          image ? (
            <PreviewImage image={image} key={index} />
          ) : (
            <UploadButton setImages={setImages} index={index} key={index} />
          )
        )}
      </Grid>
    </>
  );
};

export default ImageUpload;
