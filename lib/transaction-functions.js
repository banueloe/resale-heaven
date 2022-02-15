export const fetchSales = (startDate, endDate, setSales) => {
  fetch("/api/ebay-transactions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.text();
      }
    })
    .then((data) => {
      if (data.data) setSales(data);
      else setSales({});
    });
};

export const fetchShippingCosts = (startDate, endDate, setShippingCost) => {
  fetch(
    `/api/paypal-transactions?start=${startDate}&end=${endDate}`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.text();
      }
    })
    .then((data) => {
      if (data.data) setShippingCost(data);
      else setShippingCost({});
    });
};
