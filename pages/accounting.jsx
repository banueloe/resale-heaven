import AuthError from "../components/auth-error";
import { useState, useEffect } from "react";
import format from "date-fns/format";
import { fetchEbayTransactions, fetchShippingCosts } from "../lib/transaction-functions";
import { Grid } from "@mui/material";
import AccountingCard from "../components/accounting-card";
import AccountingForm from "../components/forms/accounting-form";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";

const MAX_DAYS = 2592000000;

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
  const [sales, setSales] = useState();
  const [expenses, setExpenses] = useState();
  const [dateRange, setDateRange] = useState([null, null]);
  const [error, setError] = useState();

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

  const fetchTransactions = (event) => {
    event.preventDefault();
    setSales();
    setExpenses();
    if (!dateRange[0] || !dateRange[1]) {
      setError(
        `Error: Missing one or more dates. Remember, both date fields are required.`
      );
    } else if (dateRange[1] - dateRange[0] > MAX_DAYS) {
      setError(`Error: The date range must be no more than 31 days.`);
    } else {
      const startDate = format(
        new Date(dateRange[0]),
        "yyyy-MM-dd'T'HH:mm:ss'Z'"
      );
      let endDate = new Date(dateRange[1]).setHours(23);
      endDate = new Date(endDate).setMinutes(59, 59);
      endDate = format(endDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
      fetchEbayTransactions(startDate, endDate, setSales, setExpenses);
      fetchShippingCosts(startDate, endDate, setExpenses);
    }
  };

  if (!loggedIn) {
    return <AuthError />;
  }

  return (
    <Grid container spacing={2}>
      <AccountingForm
        dateRange={dateRange}
        setDateRange={setDateRange}
        fetchTransactions={fetchTransactions}
        error={error}
      />
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={4}>
          {sales && <AccountingCard title="Sales" data={sales} />}
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={4}>
          {expenses && <AccountingCard title="Expenses" data={expenses} />}
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Grid>
  );
};

export default Accounting;
