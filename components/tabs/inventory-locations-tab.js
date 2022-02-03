import { Grid, Button } from "@mui/material";

const InventoryLocationsTab = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        Test
      </Grid>
      <Grid item>
        <Button href="/inventory/new-location" variant="contained">Create New Inventory Location</Button>
      </Grid>
    </Grid>
  );
};

export default InventoryLocationsTab;
