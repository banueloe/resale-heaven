import { PieChart, Pie, Tooltip } from "recharts";

export default function BasicPie({data}) {
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
      />
      <Tooltip />
    </PieChart>
  );
}
