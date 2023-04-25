import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Message from "../Message";

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
      setError(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {totalEarnings
        ? totalEarnings
        : error && <Message variant="danger">{error}</Message>}
    </div>
  );
};

export default TotalMonthlyEarningsCard;
