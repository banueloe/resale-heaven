import { Grid, Button } from "@mui/material";
import { getInventoryItems } from "../../lib/server-side/inventory-items";
import InventoryTable from "../../components/tables/inventory-table";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user.token;
    const currentItems = await getInventoryItems(user);
    let currentLocations = "";
    return {
      props: {
        loggedIn: user ? true : false,
        currentLocations,
        currentItems,
      },
    };
  },
  sessionOptions
);

const Inventory = ({ currentLocations, currentItems }) => {
  const inventoryItems = currentItems.inventoryItems;

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
        <Grid item>
          <Button variant="contained">Create New Inventory Location</Button>
        </Grid>
        <Grid item>
          <Button variant="contained">Create New Inventory Item</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          Test
        </Grid>
        <Grid item xs={10}>
          <InventoryTable inventoryItems={inventoryItems} />
        </Grid>
      </Grid>
    </>
  );
};

export default Inventory;
