import {
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";

const InventoryLocationsTab = ({ inventoryLocations }) => {
  //TODO display associated items
  return (
    <Grid container spacing={2}>
      <Grid item xs={2} />
      <Grid item xs={10}>
        <Grid item mt={4} mb={2}>
          <Typography variant="h4">Locations</Typography>
        </Grid>
        <Grid item mt={2} mb={6}>
          <Button href="/inventory/new-item" variant="contained">
            Create New Inventory Location
          </Button>
        </Grid>

        <Grid container direction="row">
          {inventoryLocations.map((location) => (
            <Card sx={{ border: 1, borderColor: 'gray', width: 400, mr: 8, mb: 8 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {location.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {location.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InventoryLocationsTab;
