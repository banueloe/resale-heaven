import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = [
  "#1769aa",
  "#2196f3",
  "#4dabf5",
  "#2c387e",
  "#3f51b5",
  "#6573c3",
];

export default function BasicPie({ data }) {
  return (
    <PieChart width={1000} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip/>
    </PieChart>
  );
}
