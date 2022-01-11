import { useState } from "react";
import { Grid } from "@mui/material";
import BuyForm from "../components/forms/buy-form";
import ItemsTable from "../components/tables/items-table";

export async function getServerSideProps() {
  return { props: {} };
}

const Buy = () => {
  const [activeItems, setActiveItems] = useState("");

  const getAveragePrice = () => {
    let total = 0;

    activeItems.forEach(item => {
      total += +item.sellingStatus[0].currentPrice[0].__value__;//TODO Price should include shipping(in table as well)
    });

    return total/activeItems.length;
  }

  return (
    <Grid container alignItems="center" justify="center" direction="column">
      <Grid item>
        <BuyForm setActiveItems={setActiveItems} />
      </Grid>
      {activeItems && (
        <div>
          <Grid item>
            Average price = ${getAveragePrice()}
          </Grid>
          <Grid item>
            <ItemsTable items={activeItems} />
          </Grid>
        </div>
      )}
    </Grid>
  );
};

export default Buy;
