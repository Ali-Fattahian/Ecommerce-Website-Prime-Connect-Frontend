import React from "react";
import TotalMonthlyEarningsCard from "./TotalMonthlyEarningsCard";
import TotalAnnualEarningsCard from "./TotalAnnualEarningsCard";
import classes from "../../pages/Admin/Admin.module.css";
import TotalMonthlyOrdersCard from "./TotalMonthlyOrdersCard";
import TotalAnnualOrdersCard from "./TotalAnnualOrdersCard";
import BillIcon from "../../icons/BillIcon";
import ShoppingBagIcon from "../../icons/ShoppingBagIcon";

const TotalOrdersEarnings = () => {
  return (
    <div id={classes["admin-cards__container"]}>
      <div id={classes["earnings-card__container"]}>
        <div className="d-flex gap-4 justify-content-between">
          <p
            className="txt--black font-family-secondary m-0"
            style={{ fontSize: "1.2rem" }}
          >
            SALES
          </p>
          <BillIcon />
        </div>
        <div className="d-flex gap-4 total-cards__container">
          <TotalMonthlyEarningsCard />
          <TotalAnnualEarningsCard />
        </div>
      </div>
      <div id={classes["earnings-card__container"]} className="earnings-card__section">
        <div className="d-flex gap-4 justify-content-between">
          <p
            className="txt--black font-family-secondary m-0"
            style={{ fontSize: "1.2rem" }}
          >
            ORDERS
          </p>
           <ShoppingBagIcon style={{ fill: '#e9f8f9', fontSize: '28px'} } />
        </div>
        <div className="d-flex gap-4 total-cards__container">
          <TotalMonthlyOrdersCard />
          <TotalAnnualOrdersCard />
        </div>
      </div>
    </div>
  );
};

export default TotalOrdersEarnings;
