import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../Message";

const MonthlyEarningsChart = () => {
  const [earnings, setEarnings] = useState(null);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
  const config = useSelector((state) => state.config);
  const { baseURL } = config;
  const { userInfo } = user;
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = userInfo.token;
    try {
      const { data } = await axios.get(
        "/products/get-monthly-earnings-by-days",
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
          baseURL: baseURL,
        }
      );

      setEarnings({
        labels: data.map((item) => item.dateCreated.substring(8, 10)),
        datasets: [
          {
            label: "Total Earnings This Month",
            data: data.map((item) => item.totalEarnings),
            backgroundColor: "#0095f6",
            borderColor: "#98d1d1",
            borderWidth: 2,
            pointBackgroundColor: "#fff",
            pointBorderColor: "#466964",
            tension: 0,
          },
        ],
      });
    } catch (e) {
      setError(
        "There was a problem loading the monthly earnings chart, Make sure you have a stable internet connection"
      );
    }
  };

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if (userInfo.isAdmin) fetchData();
  }, []);
  return (
    <div className="chart">
      {earnings && <Line data={earnings} />}
      {error && <Message variant="danger">{error}</Message>}
    </div>
  );
};

export default MonthlyEarningsChart;
