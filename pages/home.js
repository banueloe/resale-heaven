import { Grid, Button } from "@mui/material";
import MediaCard from "../components/media-card";
import { useRouter } from "next/router";
import BookSale from "../public/booksale.jpg";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    console.log("this is a test")
    console.log("req.session is ", req.session.user)
    return {
      props: {
        loggedIn: req.session.user,
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
        <Grid item xs={4}>
          <MediaCard
            title="Buy"
            description="test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsum"
            image={BookSale}
          />
        </Grid>
        <Grid item xs={4}>
          <MediaCard
            title="Buy"
            description="test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsum"
            image={BookSale}
          />
        </Grid>
        <Grid item xs={4}>
          <MediaCard
            title="Buy"
            description="test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsum test lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsumtest lorem ipsum"
            image={BookSale}
          />
        </Grid>
      </Grid>
    </>
  );
  // return (
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
