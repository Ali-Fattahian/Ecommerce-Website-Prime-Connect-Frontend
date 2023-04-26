import React from "react";
import MonthlyEarningsChart from "./MonthlyEarningsChart";
import AnnualEarningsChart from "./AnnualEarningsChart";
import SubCategoryEarningsChart from "./SubCategoryEarningsChart";
import CategoryEarningsChart from "./CategoryEarningsChart";
import CountryEarningsChart from "./CountryEarningsChart";

const Charts = () => {
  return (
    <div
      id="charts"
      className="p-4"
      style={{ flexDirection: "column", margin: "auto", gap: "2rem" }}
    >
      <MonthlyEarningsChart />
      <AnnualEarningsChart />
      <SubCategoryEarningsChart />
      <CategoryEarningsChart />
      <CountryEarningsChart />
    </div>
  );
};

export default Charts;
