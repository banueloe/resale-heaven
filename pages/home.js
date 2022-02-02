import { Grid, Typography } from "@mui/material";
import MediaCard from "../components/media-card";
import { useRouter } from "next/router";
import BookSale from "../public/booksale.jpg";
import Money from "../public/money.jpg";
import Warehouse from "../public/warehouse.jpg";

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
  console.log(loggedIn);
  const router = useRouter();
  return (
    <>
      <Grid container>
        <Grid container alignItems="center" justify="center" direction="column">
          <Typography variant="h3" mt={8} mb={16}>
            What would you like to do today?
          </Typography>
        </Grid>

        <Grid item xs={1}/>
        <Grid item xs={3}>
          <MediaCard
            title="Buy"
            link="/buy"
            description="test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsum"
            image={BookSale}
          />
        </Grid>
        <Grid item xs={1}/>
        <Grid item xs={3}>
          <MediaCard
            title="Inventory Management"
            link="/inventory"
            description="test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsum"
            image={Warehouse}
          />
        </Grid>
        <Grid item xs={1}/>
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
  // return (//TODO add this to all pages
  //   <Grid container alignItems="center" justify="center" direction="column">
  //     <Grid item>
  //       <h>Authentication Error</h>
  //     </Grid>
  //     <h2>
  //       Authentication is required to use certain features in resale-heaven.
  //       Please try again.
  //     </h2>
  //     <Button>Sign in</Button>
  //   </Grid>
  // );
};

export default Home;
