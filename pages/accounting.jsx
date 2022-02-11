import AuthError from "../components/auth-error";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    let user = req.session.user;
    user.token =
      "v^1.1#i^1#r^0#p^3#I^3#f^0#t^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";
    console.log(user)
      if (!user.token || !user.email) {
      return { props: { loggedIn: false } };
    }

    return {
      props: {
        loggedIn: true,
      },
    };
  },
  sessionOptions
);

const Accounting = ({loggedIn}) => {
  if (!loggedIn) {
    return <AuthError />;
  }

  return <div>test</div>;
};

export default Accounting;
