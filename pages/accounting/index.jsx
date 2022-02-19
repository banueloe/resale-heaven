import AuthError from "../../components/auth-error";
import { useState, useEffect } from "react";
import format from "date-fns/format";
import { fetchEbayTransactions, fetchShippingCosts } from "../../lib/transaction-functions";
import { Grid } from "@mui/material";
import AccountingCard from "../../components/accounting-card";
import AccountingForm from "../../components/forms/accounting-form";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

const MAX_DAYS = 2592000000;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    req.session.user.token="v^1.1#i^1#p^3#r^0#I^3#f^0#t^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";
    return {
      props: {
        loggedIn: req.session.user && req.session.user.token && req.session.user.email ? true : false,
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
    <Grid container spacing={2} justifyContent="center">
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
