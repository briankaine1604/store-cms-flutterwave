"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { BarChart } from "@tremor/react";

interface OverviewProps {
  data: { name: string; Total: number }[];
}

export const Overview: React.FC<OverviewProps> = ({ data }) => {
  const dataFormatter = (number: number) =>
    Intl.NumberFormat("NGN").format(number).toString();

  return (
    <>
      <h3 className="text-lg font-medium">Monthly Revenue</h3>
      <BarChart
        className="mt-4 h-72"
        data={data}
        categories={["Total"]}
        index="name"
        colors={["blue"]}
        valueFormatter={dataFormatter}
        yAxisWidth={80}
      />
    </>
  );
};
