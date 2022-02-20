const mergeSortedArrays = (arr1, arr2) => {
  let sortedArray = [];
  let i=0, j=0, k=0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j])
      sortedArray[k++] = arr1[i++];
    else
    sortedArray[k++] = arr2[j++];
  }

  while (i < arr1.length)
  sortedArray[k++] = arr1[i++];
 
  while (j < arr2.length)
    sortedArray[k++] = arr2[j++];

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
            return mergeSortedArrays(prevState, data.data);
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
      return mergeSortedArrays(prevState, filteredExpenses);
    else 
      return filteredExpenses;
  });
};
