import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Select, InputLabel, FormControl, MenuItem } from "@mui/material";

export default function InventoryTable({ inventoryItems, inventoryLocations }) {
  return (
      <TableContainer>
        <h2>Inventory</h2>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow key={item.sku}>
                <TableCell align="left">
                  <img width="90" height="90" src={item.product.imageUrls[0]} />
                </TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell component="th" scope="row">
                  {item.product.title}
                </TableCell>
                <TableCell>{item.product.description}</TableCell>
                <TableCell>{item.product.brand}</TableCell>
                <TableCell>{item.condition}</TableCell>
                <TableCell>
                  {item.availability.shipToLocationAvailability.quantity}
                </TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel id= {`select-location-${item.sku}`}>Location</InputLabel>
                    <Select
                      id= {`select-component-location-${item.sku}`}
                      value={10}
                      label="Age"
                      onChange={() => {}}
                    >
                      {inventoryLocations.map(location => <MenuItem key={location.name} value={location.name}>{location.name}</MenuItem>)}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
