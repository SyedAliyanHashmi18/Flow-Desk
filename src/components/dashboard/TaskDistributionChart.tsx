 "use client";

import { PieChart, Pie, Tooltip } from "recharts";

type DataItem = {
  name: string;
  value: number;
  fill: string;
};

interface Props {
  data: DataItem[];
}

export default function TaskDistributionChart({ data }: Props) {
  return (
    <div className="flex flex-col items-center">

      <PieChart width={350} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          innerRadius={60} // donut chart look
          label
        />

        <Tooltip />
      </PieChart>

      {/* Custom Legend */}
      <div className="flex gap-6 mt-4 text-sm">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            {item.name}
          </div>
        ))}
      </div>

    </div>
  );
}