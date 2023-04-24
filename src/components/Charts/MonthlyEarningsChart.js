import React, { useEffect, useState } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../Message";

const MonthlyEarningsChart = () => {
  // ChartJS.register(ArcElement, Tooltip, Legend);
  const [earnings, setEarnings] = useState(null);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
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
          baseURL: "http://localhost:8000/api",
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
      setError(e);
    }
  };

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if (userInfo && !userInfo.isAdmin) navigate("/");
    fetchData();
  }, []);
  return (
    <div>
      {earnings && <Line data={earnings} />}
      {error && <Message variant="danger" />}
    </div>
  );
};

export default MonthlyEarningsChart;
