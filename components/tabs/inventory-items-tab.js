import { Grid, Button, Typography } from "@mui/material";
import InventoryTable from "../../components/tables/inventory-table";

const InventoryItemsTab = ({ inventoryItems }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2} />
      <Grid item xs={10}>
        <Grid item mt={4} mb={2}>
          <Typography variant="h4">Inventory</Typography>
        </Grid>
        <Grid item mt={2} mb={2}>
          <Button href="/inventory/new-item" variant="contained">
            Create New Inventory Item
          </Button>
        </Grid>

        <InventoryTable inventoryItems={inventoryItems} />
      </Grid>
    </Grid>
  );
};

export default InventoryItemsTab;
