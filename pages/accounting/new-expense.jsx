import { Grid, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import AuthError from "../../components/auth-error";
import BasicDatePicker from "../../components/date/date-picker";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        loggedIn:
          req.session.user && req.session.user.token && req.session.user.email
            ? true
            : false,
      },
    };
  },
  sessionOptions
);

const NewExpense = ({ loggedIn }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [date, setDate] = useState(null);

  const handleSubmit = (event) => {//TODO FINISH THIS
    // event.preventDefault();
    // if (!name) {
    //   setError(`Error: The "Location Name" field is required.`);
    // } else {
    //   fetch("/api/accounting/new-expense", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       name: name,
    //       description: description,
    //     }),
    //   })
    //     .then((res) => {})
    //     .then((error) => {
    //       setError(error);
    //     });
    // }
  };

  if (!loggedIn) {
    return <AuthError />;
  }

  return (
    <Grid container>
      <Grid item xs={4} />
      <Grid item xs={4}>
        <Typography variant="h3" mt={3}>
          Create New General Expense
        </Typography>
        <Typography variant="subtitle-2">
          {`Use this form to save miscellaneous expenses like office and shipping supplies. 
          If you are looking to log mileage information, go back to the previous page and 
          click "Log Business Trip".`}
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Grid item mt={6}>
            <TextField
              fullWidth={true}
              onChange={(event) => setDescription(event.target.value)}
              value={description}
              label="Expense Description (Include location and items purchased)"
            />
          </Grid>
          <Grid item mt={2}>
            <TextField
              fullWidth={true}
              onChange={(event) => setAmount(event.target.value)}
              value={amount}
              label="Amount"
            />
          </Grid>
          <Grid item mt={2}>
            <BasicDatePicker
              date={date}
              setDate={setDate}
              setError={setError}
            />
          </Grid>
          <Grid item mt={2}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
};

export default NewExpense;
