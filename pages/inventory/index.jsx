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
    const currentItems = await getInventoryItems(req.session.user.token);

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
