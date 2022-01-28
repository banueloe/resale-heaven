import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import Image from "next/image";
const MediaCard = ({title, description, image }) => {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <Image
          src={image}
          alt="Category image"
          priority={true}
          layout="responsive"
          height="400"
          width="400"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MediaCard;
