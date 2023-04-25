import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Message from "../Message";
import classes from "../../pages/Admin/Admin.module.css";

const TotalAnnualEarningsCard = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const [totalEarnings, setTotalEarnings] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const token = userInfo.token;
    try {
      const { data } = await axios.get("/products/get-total-annual-earnings", {
        headers: {
          Authorization: `JWT ${token}`,
        },
        baseURL: "http://localhost:8000/api",
      });

      setTotalEarnings(data);
    } catch (e) {
      setError(e);
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
            {Math.trunc(totalEarnings)} $
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
