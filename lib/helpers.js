export function formatMoney(number) {
  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export const getAverage = (numbers) => {
  let total = 0;
  numbers.forEach((item) => {
    total += +item;
  });
  return total / numbers.length;
};

export const getMedian = (numbers) => {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
};

export const getPriceWithShipping = (item) => {
  return +item.sellingStatus[0].currentPrice[0].__value__ + +item.shippingInfo[0].shippingServiceCost[0].__value__;
}