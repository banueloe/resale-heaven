export const fetchEbayTransactions = (
  startDate,
  endDate,
  setSales,
  setExpenses
) => {
  fetch(`/api/ebay-transactions?start=${startDate}&end=${endDate}`, {
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
      if (data.sales) setSales(data.sales);
      if (data.fees)
        setExpenses((prevState) => {
          if(prevState)
            return [...prevState, ...data.fees];
          else 
            return data.fees;
        });
      else setSales();
    });
};

export const fetchShippingCosts = (startDate, endDate, setShippingCost) => {
  fetch(`/api/paypal-transactions?start=${startDate}&end=${endDate}`, {
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.text();
      }
    })
    .then((data) => {
      if (data.data)
        setShippingCost((prevState) => {
          if(prevState)
            return [...prevState, ...data.data];
          else 
            return data.data;
        });
      else setShippingCost();
    });
};
