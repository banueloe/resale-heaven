import AuthError from "../components/auth-error";
import { useState, useEffect } from "react";

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
  const [transactions, setTransactions] = useState({});

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
          console.log(data, "data")
        });
  }, []);

  const fetchTransactions = (event) => {
    event.preventDefault;
    fetch("/api/ebay-transactions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text();
        }
      })
      .then((data) => {
        if (data.data) setTransactions(data);
        else setTransactions({});
      });
  };

  console.log(transactions);
  if (!loggedIn) {
    return <AuthError />;
  }

  return <div onClick={fetchTransactions}>test</div>;
};

export default Accounting;
