import React from "react";
import { useSavings } from "@/context/SavingContext";
import { savingsCategoryOptions } from "@/assets/constants";
import Chart from "@/components/chart";

function getSavingsChartData(expense: any, savingexpense: any) {
  return savingsCategoryOptions
    .map((cat) => {
      const saved = savingexpense?.[cat.label] ?? 0;
      const goalAmount = expense?.[cat.label] ?? 0;
      return {
        column: cat.label,
        income: goalAmount,
        expense: saved,
      };
    })
    .filter((entry) => entry.expense > 0 || entry.income > 0);
}

const SavingsChart = () => {
  const { savingexpense, goal, loading } = useSavings(); // <-- get data from context

  if (loading) return null;

  const data = getSavingsChartData(goal, savingexpense);

  return (
    <Chart
      data={data as any}
      maxHeight={120}
      col2={"Savings"}
      col1={"Goals"}
      // ...other props
    />
  );
};

export default SavingsChart;
