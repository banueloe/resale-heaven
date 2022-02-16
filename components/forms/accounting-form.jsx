import { Grid, Button, Typography, Alert } from "@mui/material";
import CalendarRangePicker from "../date-range-picker";

const AccountingForm = ({ dateRange, setDateRange, fetchTransactions, error }) => {
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
          {`To get started, choose a start and end date for the data you want to
      calculate and click "View Data".`}
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

export default AccountingForm;
