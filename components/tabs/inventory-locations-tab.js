import { Grid, Button, Typography, Card, CardContent } from "@mui/material";

const InventoryLocationsTab = ({ inventoryLocations }) => {
  inventoryLocations = inventoryLocations.map((location) => {
    let items = "";
    location.inventoryItems.forEach((item) => (items += ` ${item},`));
    return { ...location, items: items.slice(0, -1) };
  });
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={2} />
      <Grid item xs={10}>
        <Grid item mt={4} mb={2}>
          <Typography variant="h4">Locations</Typography>
        </Grid>
        <Grid item mt={2} mb={6}>
          <Button href="/inventory/new-location" variant="contained">
            Create New Inventory Location
          </Button>
        </Grid>

        <Grid container direction="row">
          {inventoryLocations.map((location, index) => (
            <Card
              key={index}
              sx={{ border: 1, borderColor: "gray", width: 400, mr: 8, mb: 8 }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {location.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {location.description}
                </Typography>
                {location.items && (
                  <Typography variant="body2" color="text.secondary">
                    Inventory Items: {location.items}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InventoryLocationsTab;
