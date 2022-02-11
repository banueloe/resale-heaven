import AuthError from "../components/auth-error";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    let user = req.session.user;
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
