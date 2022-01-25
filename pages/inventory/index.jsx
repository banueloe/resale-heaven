import { useState } from "react";
import { Grid, Button } from "@mui/material";
import { getInventoryItems } from "../../lib/server-side/inventory-items";
import TabsWrapper from "../../components/tabs/tabs-wrapper";
import InventoryItemsTab from "../../components/tabs/inventory-items-tab";
import InventoryLocationsTab from "../../components/tabs/inventory-locations-tab";

import clientPromise from "../../lib/mongodb";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    let inventoryLocations;
    try {
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("inventoryLocations");
      //await collection.insertOne({_id:"1237", name: "123", inventoryItems: []})
      inventoryLocations = await collection.find({}).toArray();
      console.log(inventoryLocations)
    } catch (e) {
      console.error(e);
      inventoryLocations = [];
    }

    const user =
      "v^1.1#i^1#I^3#p^3#f^0#r^0#t^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";
    const currentItems = await getInventoryItems(user);
    return {
      props: {
        loggedIn: user ? true : false,
        inventoryLocations,
        currentItems,
      },
    };
  },
  sessionOptions
);

const Inventory = ({ inventoryLocations, currentItems }) => {
  const inventoryItems = currentItems.inventoryItems;
  const [tab, setTab] = useState(0);
  //console.log(inventoryLocations);
  return (
    <>
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        spacing={2}
      >
        <Grid item>
          <h1 className="title">INVENTORY MANAGEMENT</h1>
          <h3>
            Manage your eCommerce Business Inventory in one place. To do so,
            create <i>inventory items</i> that are stored in{" "}
            <i>inventory locations</i>.
          </h3>
        </Grid>
      </Grid>

      <TabsWrapper
        tabs={[
          { id: 1, label: "Inventory Items" },
          { id: 2, label: "Inventory Locations" },
        ]}
        value={tab}
        setValue={setTab}
      />

      <Grid item>
        <Button variant="contained">Create New Inventory Item</Button>
      </Grid>

      {tab === 0 && <InventoryItemsTab inventoryItems={inventoryItems} />}
      {tab === 1 && <InventoryLocationsTab />}
    </>
  );
};

export default Inventory;
