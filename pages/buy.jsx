import { useState } from "react";
import { Grid } from "@mui/material";
import BuyForm from "../components/forms/buy-form";
import ItemsTable from "../components/tables/items-table";
import {
  formatMoney,
  getAverage,
  getMedian,
  getPriceWithShipping,
} from "../lib/helpers";
import BuyDistribution from "../components/charts/buy-distribution";

const Buy = () => {
  const [activeItems, setActiveItems] = useState();
  let itemPrices;
  if (activeItems) {
    itemPrices = activeItems.map((item) => getPriceWithShipping(item));
  }

  return (
    <Grid
      container
      spacing={4}
      alignItems="center"
      justify="center"
      direction="column"
    >
      <Grid item>
        <h1 className="title">How much is this item worth?</h1>
        <h3>
          Use this page to determine whether or not you should buy an item to
          resell. Remember, the prices shown below are current or historical
          listings and are not guaranteed to remain the same in the future.
        </h3>
      </Grid>
      <Grid item>
        <BuyForm setActiveItems={setActiveItems} />
      </Grid>
      {activeItems && (
        <div>
          <Grid item>Results found = {itemPrices.length}</Grid>
          <Grid item>
            Average price = {formatMoney(getAverage(itemPrices))}
          </Grid>
          <Grid item>Median price = {formatMoney(getMedian(itemPrices))}</Grid>
          {activeItems.length > 6 ? (
            <Grid item>
              <BuyDistribution items={itemPrices} />
            </Grid>
          ) : (
            <div>Not enough comparable items to accurately determine item worth.</div>
          )}
          <Grid item>
            <ItemsTable items={activeItems} />
          </Grid>
        </div>
      )}
    </Grid>
  );
};

export default Buy;
