import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid, Typography, Card } from "@mui/material";
import TabsWrapper from "../components/tabs/tabs-wrapper";
import { useState } from "react";
import { formatMoney } from "../lib/helpers";

const AccountingCard = ({ title, data }) => {
  const [tab, setTab] = useState(0);
  let total = 0;
  data.forEach((transaction) => (total += transaction.amount));

  return (
    <Card variant="outlined" ml={8} sx={{ backgroundColor: "#eeeee4" }}>
      <Grid container justifyContent="center">
        <Typography mt={4} mb={2} variant="h3">
          {title}
        </Typography>
      </Grid>
      <TabsWrapper
        tabs={[
          { id: 1, label: "Summary" },
          { id: 2, label: "Details" },
        ]}
        value={tab}
        setValue={setTab}
      />
      {tab === 0 && <div>Total = {formatMoney(total)}</div>}
      {tab === 1 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((transaction) => (
                <TableRow key={transaction.transactionId}>
                  <TableCell>{transaction.transactionId}</TableCell>
                  <TableCell>{transaction.orderId}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.source}</TableCell>
                  <TableCell>{formatMoney(transaction.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
};

export default AccountingCard;
