import axios from "axios";

export const getInventoryItems = (token) => {
  return new Promise((resolve) => {
    axios
      .get(
        `https://api.ebay.com/sell/inventory/v1/inventory_item?limit=100&offset=0`, //TODO Can get multiple pages of results with offset
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          return resolve(response.data);
        } else {
          return resolve();
        }
      })
      .catch((error) => {
        console.log(error);
        return resolve();
      });
  });
};

