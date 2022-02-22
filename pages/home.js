import { Grid, Typography } from "@mui/material";
import MediaCard from "../components/media-card";
import BookSale from "../public/booksale.jpg";
import Money from "../public/money.jpg";
import Warehouse from "../public/warehouse.jpg";
import AuthError from "../components/auth-error";
import { useEffect } from "react";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        loggedIn: req.session.user && req.session.user.token && req.session.user.email ? true : false,
      },
    };
  },
  sessionOptions
);

const Home = ({ loggedIn }) => {
  useEffect(() => {
    fetch("/api/auth/paypal-token", {
      method: "POST",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text();
        }
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

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
            description="Sourcing guidance: use this page to determine whether or not you should buy an item to resale."
            image={BookSale}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <MediaCard
            title="Inventory Management"
            link="/inventory"
            description="Manage your eCommerce Business Inventory in one place."
            image={Warehouse}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <MediaCard
            title="Accounting"
            link="/accounting"
            description="View your past eBay and PayPal transactions to calculate revenue, expenses and estimate profit."
            image={Money}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
