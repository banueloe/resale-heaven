import { useState } from "react";
import { Grid, Button } from "@mui/material";
import { getInventoryItems } from "../../lib/server-side/inventory-items";
import InventoryTable from "../../components/tables/inventory-table";

export async function getServerSideProps() {
  const currentItems = await getInventoryItems();
  let currentLocations = "";
  return { props: { currentLocations, currentItems } };
}

const Inventory = ({ currentLocations, currentItems }) => {
  const [inventoryItems, setInventoryItems] = useState (currentItems.inventoryItems);

  return (
    <Grid container alignItems="center" justify="center" direction="column">
      <Grid item>
        <h1 className="title">INVENTORY MANAGEMENT</h1>
        <h3>
          Manage your eCommerce Business Inventory in one place. To do so,
          create <i>inventory items</i> that are stored in{" "}
          <i>inventory locations</i>.
        </h3>
      </Grid>
      <Grid item>
        <Button variant="contained">Create New Inventory Location</Button>
      </Grid>
      <Grid item>
        <Button variant="contained">Create New Inventory Item</Button>
      </Grid>
      <Grid item>
        <InventoryTable inventoryItems={inventoryItems}/>
      </Grid>
    </Grid>
  );
};

export default Inventory;
