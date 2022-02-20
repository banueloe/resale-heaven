const mergeSortedArrays = (ascending, descending) => {
  let sortedArray = [];
  let i=0, j= descending.length-1, k=0;

  while (i < ascending.length && j >= 0) {
    if (ascending[i].date < descending[j].date)
      sortedArray[k++] = ascending[i++];
    else
    sortedArray[k++] = descending[j--];
  }

  while (i < ascending.length)
  sortedArray[k++] = ascending[i++];
 
  while (j >= 0)
    sortedArray[k++] = descending[j--];

  return sortedArray;
} 

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
            return mergeSortedArrays(prevState, data.expenses); //[...prevState, ...data.expenses]
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
            return mergeSortedArrays(data.data, prevState);
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
      return mergeSortedArrays(filteredExpenses, prevState);
    else 
      return filteredExpenses;
  });
};
