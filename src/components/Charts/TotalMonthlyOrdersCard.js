import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Message from "../Message";
import classes from "../../pages/Admin/Admin.module.css";

const TotalMonthlyOrdersCard = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const config = useSelector((state) => state.config);
  const { baseURL } = config;
  const [totalOrders, setTotalOrders] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const token = userInfo.token;
    try {
      const { data } = await axios.get("/products/get-total-monthly-orders", {
        headers: {
          Authorization: `JWT ${token}`,
        },
        baseURL: baseURL,
      });

      setTotalOrders(data);
    } catch (e) {
      setError(
        "There was a problem loading the monthly orders, Make sure you have a stable internet connection"
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {totalOrders ? (
        <div className={classes["admin-card"]}>
          <p className="txt--black font-family-secondary m-0">{totalOrders}</p>
          <p className="txt--black font-family-secondary m-0">Last 30 days</p>
        </div>
      ) : (
        error && <Message variant="danger">{error}</Message>
      )}
    </div>
  );
};

export default TotalMonthlyOrdersCard;
