import React from "react";
import MonthlyEarningsChart from "./MonthlyEarningsChart";
import AnnualEarningsChart from "./AnnualEarningsChart";
import SubCategoryEarningsChart from "./SubCategoryEarningsChart";
import CategoryEarningsChart from "./CategoryEarningsChart";
import CountryEarningsChart from "./CountryEarningsChart";

const Charts = () => {
  return (
    <div className="charts-container">
      <MonthlyEarningsChart />
      <AnnualEarningsChart />
      <SubCategoryEarningsChart />
      <CategoryEarningsChart />
      <CountryEarningsChart />
    </div>
  );
};

export default Charts;
