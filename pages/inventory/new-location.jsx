import { Grid, Typography } from "@mui/material";
import LocationForm from "../../components/forms/location-form";
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

const NewLocation = ({loggedIn}) => {
  if (!loggedIn) {
    return <AuthError />;
  }

  return (
    <Grid container>
      <Grid item xs={4}/>
      <Grid item xs={4}>
        <Typography variant="h3" mt={3}>
          Create New Inventory Location
        </Typography>
        <Typography variant="subtitle-2">
          {`Inventory locations can be shelves, racks or boxes where inventory
          items are stored. Only the "Location Name" field is required for
          initial location creation.`}
        </Typography>
        <LocationForm />
      </Grid>
      <Grid item xs={4}/>
    </Grid>
  );
};

export default NewLocation;
