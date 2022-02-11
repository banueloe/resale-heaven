import { Grid, Typography } from "@mui/material";
import MediaCard from "../components/media-card";
import BookSale from "../public/booksale.jpg";
import Money from "../public/money.jpg";
import Warehouse from "../public/warehouse.jpg";
import AuthError from "../components/auth-error";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        loggedIn: req.session.user.token ? true : false,
      },
    };
  },
  sessionOptions
);

const Home = ({ loggedIn }) => {
  if (!loggedIn) {
    return <AuthError />;
  }

  return (
    <>
      <Grid container>
        <Grid container alignItems="center" justify="center" direction="column">
          <Typography variant="h3" mt={8} mb={16}>
            What would you like to do today?
          </Typography>
        </Grid>

        <Grid item xs={1} />
        <Grid item xs={3}>
          <MediaCard
            title="Buy"
            link="/buy"
            description="test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsum"
            image={BookSale}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <MediaCard
            title="Inventory Management"
            link="/inventory"
            description="test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsum"
            image={Warehouse}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <MediaCard
            title="Accounting"
            link="/accounting"
            description="test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsum"
            image={Money}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
