import PreviewImage from "./preview-image";
import UploadButton from "./upload-button";
import { Grid, Typography } from "@mui/material";

const ImageUpload = ({ images, setImages }) => {
  return (
    <>
      <Typography variant="h6" mt={3}>
        Upload Images
      </Typography>
        {`These images will be associated with your inventory item and if published, eBay listing. Upload up to 12 images. To remove an image, simply click on it after upload.`}
      <Typography variant="subtitle-2">
      </Typography>
      <Grid container direction="row">
        {images.map((image, index) =>
          image ? (
            <PreviewImage image={image} setImages={setImages} index={index} key={index} />
          ) : (
            <UploadButton setImages={setImages} index={index} key={index} />
          )
        )}
      </Grid>
    </>
  );
};

export default ImageUpload;
