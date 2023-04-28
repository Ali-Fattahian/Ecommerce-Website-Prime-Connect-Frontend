import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Message from "../Message";
import classes from "../../pages/Admin/Admin.module.css";

const TotalMonthlyEarningsCard = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const [totalEarnings, setTotalEarnings] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const token = userInfo.token;
    try {
      const { data } = await axios.get("/products/get-total-monthly-earnings", {
        headers: {
          Authorization: `JWT ${token}`,
        },
        baseURL: "http://localhost:8000/api",
      });

      setTotalEarnings(data);
    } catch (e) {
      setError(
        "There was a problem loading the monthly earnings, Make sure you have a stable internet connection"
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {totalEarnings ? (
        <div className={classes["admin-card"]}>
          <p className="txt--black font-family-secondary m-0">
            {Math.trunc(totalEarnings)} <i className="fa fa-usd"></i>
          </p>
          <p className="txt--black font-family-secondary m-0">Last 30 days</p>
        </div>
      ) : (
        error && <Message variant="danger">{error}</Message>
      )}
    </div>
  );
};

export default TotalMonthlyEarningsCard;
