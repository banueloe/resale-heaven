import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import { getPriceWithShipping, formatMoney } from "../../lib/helpers";

const ItemsTable = ({ items }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Price (W/Shipping)</TableCell>
            <TableCell>Condition</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.itemId}>
              <TableCell align="left" component="th" scope="row">
                <img src={item.galleryURL} />
              </TableCell>
              <TableCell align="left">
                <a target="_blank" rel="noreferrer" href={item.viewItemURL[0]}>
                  {item.title}
                </a>
              </TableCell>
              <TableCell align="right">
                {formatMoney(getPriceWithShipping(item))}
              </TableCell>
              <TableCell align="left">
                {item.condition[0].conditionDisplayName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;
