import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer
} from "@mui/material";

const ItemsTable = ({ items }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>CONDITION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.itemId}>
              <TableCell align="left" component="th" scope="row">
                <img src={item.galleryURL} />
                {item.title}
              </TableCell>
              <TableCell align="right">
                {item.sellingStatus[0].currentPrice[0].__value__}
              </TableCell>
              <TableCell align="center">
                {" "}
                <a href={item.viewItemURL[0]}>{item.viewItemURL}</a>
              </TableCell>
              <TableCell align="left">{item.condition[0].conditionDisplayName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;
