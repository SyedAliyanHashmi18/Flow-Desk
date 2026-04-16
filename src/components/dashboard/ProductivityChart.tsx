"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function ProductivityChart({ data }: any) {
  return (
    <LineChart width={400} height={250} data={data}>
      <XAxis dataKey="_id" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="count" stroke="#22c55e" />
    </LineChart>
  );
}