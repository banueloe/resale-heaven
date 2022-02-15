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
  const [sales, setSales] = useState({});
  const [shippingCost, setShippingCost] = useState({});

  useEffect(() => {
    fetch("/api/auth/paypal-token", {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text();
        }
      })
      .then((data) => {
        console.log(data, "data");
      });
  }, []);

  const fetchSales = () => {
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
        if (data.data) setSales(data);
        else setSales({});
      });
  };

  const fetchShippingCosts = () => {
      console.log("fetching")
    fetch(
      `/api/paypal-transactions?start=2021-01-01T00:00:00Z&end=2021-01-31T23:59:59Z`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text();
        }
      })
      .then((data) => {
          console.log(data, "paypal")
        if (data.data) setShippingCost(data);
        else setShippingCost({});
      });
  };

  const fetchTransactions = (event) => {
    event.preventDefault();
    fetchSales();
    fetchShippingCosts();
  };

  console.log("sales", sales, "expenses", shippingCost);
  if (!loggedIn) {
    return <AuthError />;
  }

  return <div onClick={fetchTransactions}>test</div>;
};

export default Accounting;
