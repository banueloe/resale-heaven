import AuthError from "../components/auth-error";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    let user = req.session.user;
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

const Accounting = ({ loggedIn }) => {
  const fetchTransactions = (event) => {
    event.preventDefault;
    fetch("/api/transactions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
        } else {
          return res.text();
        }
      })
      .then((error) => {
        console.log(error);
      });
  };
  if (!loggedIn) {
    return <AuthError />;
  }

  return <div onClick={fetchTransactions}>test</div>;
};

export default Accounting;
