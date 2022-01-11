import { useState } from "react";
import { Grid, Button } from "@mui/material";
import { getInventoryItems } from "../lib/server-side/inventory-items";

export async function getServerSideProps() {
  const currentItems = await getInventoryItems();
  let currentLocations = "";
  return { props: { currentLocations, currentItems } };
}

const Inventory = ({ currentLocations, currentItems }) => {
  console.log(currentItems)
  return (
    <Grid container alignItems="center" justify="center" direction="column">
      <Grid item>
        <h1 className="title">INVENTORY MANAGEMENT {currentItems.total}</h1>
      </Grid>
      <Grid item>
        <Button variant="contained">Test</Button>
      </Grid>
    </Grid>
  );
};

export default Inventory;
