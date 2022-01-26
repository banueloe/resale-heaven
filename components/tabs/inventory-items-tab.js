import { Grid, Button } from "@mui/material";
import InventoryTable from "../../components/tables/inventory-table";

const InventoryItemsTab = ({ inventoryItems }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        Test
      </Grid>
      <Grid item xs={10}>
        <InventoryTable inventoryItems={inventoryItems} />
        <Grid item>
          <Button variant="contained">Create New Inventory Item</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InventoryItemsTab;