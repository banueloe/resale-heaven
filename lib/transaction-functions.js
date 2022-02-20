export const fetchEbayTransactions = (
  startDate,
  endDate,
  setSales,
  setExpenses
) => {
  fetch(`/api/accounting/ebay-transactions?start=${startDate}&end=${endDate}`, {
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
      if (data.expenses)
        setExpenses((prevState) => {
          if(prevState)
            return [...prevState, ...data.expenses];
          else 
            return data.expenses;
        });
    });
};

export const fetchShippingCosts = (startDate, endDate, setShippingCost) => {
  fetch(`/api/accounting/paypal-transactions?start=${startDate}&end=${endDate}`, {
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

export const fetchUserInputTransactions = (startDate, endDate, userExpenses, setExpenses) => {
  const filteredExpenses = userExpenses.filter((expense) => expense.date>=startDate && expense.date<=endDate);
  setExpenses((prevState) => {
    if(prevState)
      return [...prevState, ...filteredExpenses];
    else 
      return filteredExpenses;
  });
};

