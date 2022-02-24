import AuthError from "../../components/auth-error";
import { useState } from "react";
import format from "date-fns/format";
import {
  fetchEbayTransactions,
  fetchShippingCosts,
  fetchUserInputTransactions,
} from "../../lib/transaction-functions";
import { Grid } from "@mui/material";
import AccountingCard from "../../components/accounting-card";
import AccountingForm from "../../components/forms/accounting-form";
import { CSVLink } from "react-csv";

import clientPromise from "../../lib/mongodb";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

const MAX_DAYS = 2592000000;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    let expenses;
    try {
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("users");
      expenses = await collection.findOne(
        { email: req.session.user.email },
        {
          projection: {
            password: false,
            email: false,
            inventoryLocations: false,
          },
        }
      );
    } catch (e) {
      console.error(e);
      expenses = [];
    }

    expenses = expenses.expenses.map((expense) => {
      if (expense.category === "Mileage Deduction") {
        let description = "Trip: ";
        expense.placeNames.forEach((name) => (description += `${name}->`));
        return {
          transactionId: expense.id,
          date: expense.date,
          description: description.slice(0, -2),
          category: expense.category,
          amount: expense.amount,
          source: "User Input",
        };
      } else {
        return { ...expense, source: "User Input" };
      }
    });
    return {
      props: {
        loggedIn:
          req.session.user && req.session.user.token && req.session.user.email
            ? true
            : false,
        userExpenses: expenses,
      },
    };
  },
  sessionOptions
);

const Accounting = ({ loggedIn, userExpenses }) => {
  const [sales, setSales] = useState();
  const [expenses, setExpenses] = useState();
  const [dateRange, setDateRange] = useState([null, null]);
  const [error, setError] = useState();
  const [displayForm, setDisplayForm] = useState(true);

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
      fetchUserInputTransactions(startDate, endDate, userExpenses, setExpenses);
      fetchEbayTransactions(startDate, endDate, setSales, setExpenses);
      fetchShippingCosts(startDate, endDate, setExpenses);
      setDisplayForm(false);
    }
  };

  if (!loggedIn) {
    return <AuthError />;
  }

  let csvData = [];
  if (sales && expenses) csvData = [...expenses, ...sales];
  else if (sales) csvData = sales;
  else if (expenses) csvData = expenses;

  return (
    <Grid container spacing={2} justifyContent="center">
      <AccountingForm
        dateRange={dateRange}
        setDateRange={setDateRange}
        fetchTransactions={fetchTransactions}
        displayForm={displayForm}
        setDisplayForm={setDisplayForm}
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
      <Grid item sx={{ position: "absolute", bottom: "3%" }}>
        {csvData.length !== 0 && (
          <CSVLink data={csvData}>Export Transactions</CSVLink>
        )}
      </Grid>
    </Grid>
  );
};

export default Accounting;
