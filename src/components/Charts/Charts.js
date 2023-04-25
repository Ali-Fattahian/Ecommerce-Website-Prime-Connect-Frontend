import React from "react";
import MonthlyEarningsChart from "./MonthlyEarningsChart";
import AnnualEarningsChart from "./AnnualEarningsChart";
import SubCategoryEarningsChart from "./SubCategoryEarningsChart";
import CategoryEarningsChart from "./CategoryEarningsChart";
import CountryEarningsChart from "./CountryEarningsChart";

const Charts = () => {
  return (
    <div id="charts" className="p-4" style={{ flexDirection: "column", width: '70%', margin: 'auto', gap: '2rem' }}>
      <div className="d-flex gap-2 charts__container">
        <MonthlyEarningsChart />
        <AnnualEarningsChart />
      </div>
      {/* <div> */}
        <SubCategoryEarningsChart />
      {/* </div> */}
      <div className="d-flex gap-2 charts__container">
        <CategoryEarningsChart />
        <CountryEarningsChart />
      </div>
    </div>
  );
};

export default Charts;
