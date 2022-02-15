import AuthError from "../components/auth-error";
import { useState, useEffect } from "react";
import CalendarRangePicker from "../components/date-range-picker";
import format from "date-fns/format";
import { fetchSales, fetchShippingCosts } from "../lib/transaction-functions";
import { Grid, Button, Typography, Alert } from "@mui/material";

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
  const [sales, setSales] = useState({});
  const [shippingCost, setShippingCost] = useState({});
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
      const endDate = format(
        new Date(dateRange[1]),
        "yyyy-MM-dd'T'HH:mm:ss'Z'"
      );
      fetchSales(startDate, endDate, setSales);
      fetchShippingCosts(startDate, endDate, setShippingCost);
    }
  };

  console.log("sales", sales, "expenses", shippingCost);
  if (!loggedIn) {
    return <AuthError />;
  }

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justify="center"
      direction="column"
    >
      <Grid item>
        <Typography mt={4} mb={2} variant="h3">
          Accounting
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">
          View your past eBay and PayPal transactions to calculate revenue,
          expenses and estimate profit. Resale-Heaven assumes that your linked
          PayPal account is a business account that processes shipping
          transactions only.
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">
          To get started, choose a start and end date for the data you want to
          calculate and click "View Data".
        </Typography>
      </Grid>
      <Grid item>
        <CalendarRangePicker
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </Grid>
      {error && (
        <Grid item>
          <Alert severity="error">{error}</Alert>{" "}
        </Grid>
      )}
      <Grid item>
        <Button variant="contained" onClick={fetchTransactions}>
          View Data
        </Button>
      </Grid>
    </Grid>
  );
};

export default Accounting;
