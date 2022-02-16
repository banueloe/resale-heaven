import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid, Typography, Card } from "@mui/material";
import TabsWrapper from "../components/tabs/tabs-wrapper";
import { useState } from "react";

const AccountingCard = ({ title, data }) => {
  const [tab, setTab] = useState(0);
  console.log(title, data);
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
      {tab === 0 && <div>test</div>}
      {tab === 1 && (
        <TableContainer>
          <h2>Inventory</h2>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.sku}>
                  <TableCell align="left">
                    <img
                      width="90"
                      height="90"
                      src={item.product.imageUrls[0]}
                    />
                  </TableCell>
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
