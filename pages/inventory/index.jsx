import { useState } from "react";
import { Grid } from "@mui/material";
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
      const collection = db.collection("users");
      inventoryLocations = await collection.findOne({email: req.session.user.email});
    } catch (e) {
      console.error(e);
      inventoryLocations = [];
    }

    const user = req.session.user;
    const currentItems = await getInventoryItems("v^1.1#i^1#p^3#f^0#r^0#I^3#t^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");

    //TODO associate items with their locations here
    //TODO change back loggedinprop
    return {
      props: {
        loggedIn: user,
        inventoryLocations: inventoryLocations.inventoryLocations,
        inventoryItems: currentItems.inventoryItems,
      },
    };
  },
  sessionOptions
);

const Inventory = ({ loggedIn, inventoryLocations, inventoryItems }) => {
  const [tab, setTab] = useState(0);
  console.log(loggedIn);
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

      {tab === 0 && <InventoryItemsTab inventoryItems={inventoryItems} />}
      {tab === 1 && <InventoryLocationsTab inventoryLocations={inventoryLocations}/>}
    </>
  );
};

export default Inventory;
