import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { formatMoney } from "../../lib/helpers";

const getData = (sortedItems) => {
  const numItems = sortedItems.length;
  const rangeSize = sortedItems[numItems - 1] / 6;
  let data = [];

  let itemsIndex = 0;
  for (let i = 0; i < 6; i++) {
    let count = 0;

    while (
      itemsIndex < numItems &&
      sortedItems[itemsIndex] < rangeSize * (i + 1)
    ) {
      itemsIndex++;
      count++;
    }
    data.push({
      name: `${formatMoney(rangeSize * i)} - ${formatMoney(rangeSize * (i + 1))}`,
      value: count,
    });
  }

  console.log(data);
  return data;
};

const BuyDistribution = ({ items }) => {
  let sortedItems = items.sort((a, b) => a - b);
  const data = getData(sortedItems);

  return (
    <AreaChart
      width={800}
      height={300}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#393534" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#393534" stopOpacity={0.12} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#color)"
      />
    </AreaChart>
  );
};

export default BuyDistribution;
