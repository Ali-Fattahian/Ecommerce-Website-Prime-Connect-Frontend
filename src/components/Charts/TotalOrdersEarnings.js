import React from "react";
import TotalMonthlyEarningsCard from "./TotalMonthlyEarningsCard";
import TotalAnnualEarningsCard from "./TotalAnnualEarningsCard";
import classes from "../../pages/Admin/Admin.module.css";
import TotalMonthlyOrdersCard from "./TotalMonthlyOrdersCard";
import TotalAnnualOrdersCard from "./TotalAnnualOrdersCard";

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
          <i
            className="far fa-money-bill-alt fa-2x"
            style={{
              color: "#333",
              padding: ".5rem",
              borderRadius: "4px",
              backgroundColor: "#c0eef2",
            }}
          ></i>
        </div>
        <div className="d-flex gap-4 total-cards__container">
          <TotalMonthlyEarningsCard />
          <TotalAnnualEarningsCard />
        </div>
      </div>
      <div id={classes["earnings-card__container"]}>
        <div className="d-flex gap-4 justify-content-between">
          <p
            className="txt--black font-family-secondary m-0"
            style={{ fontSize: "1.2rem" }}
          >
            ORDERS
          </p>
          <i
            className="fa fa-shopping-bag fa-2x"
            style={{
              color: "#e9f8f9",
              padding: ".5rem",
              borderRadius: "4px",
              backgroundColor: "#432a71",
            }}
          ></i>
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
