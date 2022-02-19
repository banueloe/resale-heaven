import { Grid, Button, Typography } from "@mui/material";
import InventoryTable from "../../components/tables/inventory-table";
import LabelledCheckbox from "../checkbox/labelled-checkbox";
import { useState } from "react";
import conditionOptions from "../../lib/conditionOptions";

const InventoryItemsTab = ({ inventoryItems, inventoryLocations }) => {
  const [conditionFilter, setConditionFilter] = useState();

  return (
    <Grid container spacing={2}>
      <Grid item xs={2} mt={4}>
        <Grid item>
          <LabelledCheckbox
            label="Condition"
            category={conditionFilter}
            setCategory={setConditionFilter}
            options={conditionOptions}
          />
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Grid item mt={4} mb={2}>
          <Typography variant="h4">Inventory</Typography>
        </Grid>
        <Grid item mt={2} mb={2}>
          <Button href="/inventory/new-item" variant="contained">
            Create New Inventory Item
          </Button>
        </Grid>

        <InventoryTable
          inventoryItems={inventoryItems}
          inventoryLocations={inventoryLocations}
        />
      </Grid>
    </Grid>
  );
};

export default InventoryItemsTab;
