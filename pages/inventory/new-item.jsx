import { Grid, Typography } from "@mui/material";
import ItemsForm from "../../components/forms/inventory-items-form";
import AuthError from "../../components/auth-error";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        loggedIn:
          req.session.user && req.session.user.token && req.session.user.email
            ? true
            : false,
      },
    };
  },
  sessionOptions
);

const NewItem = ({ loggedIn }) => {
  if (!loggedIn) {
    return <AuthError />;
  }

  return (
    <Grid container>
      <Grid item xs={4} />
      <Grid item xs={4}>
        <Typography variant="h3" mt={3}>
          Create New Inventory Item
        </Typography>
        <Typography variant="subtitle-2">
          {`Before a product can be sold in an offer on an eBay marketplace, an
          inventory item record must exist for that product. An inventory item
          record contains such things as product details, item condition,
          quantity available. Every Inventory Item must also have a
          seller-defined SKU value, and this value must be unique across the
          seller's inventory.`}
        </Typography>
        <ItemsForm />
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
};

export default NewItem;
