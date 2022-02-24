import { Grid, Button, Typography } from "@mui/material";
import InventoryTable from "../../components/tables/inventory-table";
import LabelledCheckbox from "../checkbox/labelled-checkbox";
import { useState } from "react";
import conditionOptions from "../../lib/conditionOptions";

const InventoryItemsTab = ({ inventoryItems, inventoryLocations }) => {
  const [conditionFilter, setConditionFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  //TODO implement filtering
  let brandOptions = [];
  inventoryItems.forEach((item) => {
    if (
      item.product.brand &&
      !brandOptions.some((option) => option.value === item.product.brand)
    )
      brandOptions.push({
        value: item.product.brand,
        label: item.product.brand,
      });
  });

  const locationOptions = inventoryLocations.map((location) => {
    return { value: location.name, label: location.name };
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={2} mt={8}>
        <Grid item>
          <Typography variant="h4">Filters</Typography>
        </Grid>
        <Grid item mt={2}>
          <LabelledCheckbox
            label="Condition"
            category={conditionFilter}
            setCategory={setConditionFilter}
            options={conditionOptions}
          />
        </Grid>
        <Grid item mt={4}>
          <LabelledCheckbox
            label="Brand"
            category={brandFilter}
            setCategory={setBrandFilter}
            options={brandOptions}
          />
        </Grid>
        <Grid item mt={4}>
          <LabelledCheckbox
            label="Location"
            category={locationFilter}
            setCategory={setLocationFilter}
            options={locationOptions}
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
