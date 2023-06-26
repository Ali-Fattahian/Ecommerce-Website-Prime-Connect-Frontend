import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Message from "../Message";
import classes from "../../pages/Admin/Admin.module.css";

const TotalAnnualEarningsCard = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const config = useSelector((state) => state.config);
  const { baseURL } = config;
  const [totalEarnings, setTotalEarnings] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const token = userInfo.token;
    try {
      const { data } = await axios.get("/products/get-total-annual-earnings", {
        headers: {
          Authorization: `JWT ${token}`,
        },
        baseURL: baseURL,
      });

      setTotalEarnings(data);
    } catch (e) {
      setError(
        "There was a problem loading the annual earnings, Make sure you have a stable internet connection"
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
            {Math.trunc(totalEarnings)} <span className="font-weight-bold px-2">$</span>
          </p>
          <p className="txt--black font-family-secondary m-0">This Year</p>
        </div>
      ) : (
        error && <Message variant="danger">{error}</Message>
      )}
    </div>
  );
};

export default TotalAnnualEarningsCard;
