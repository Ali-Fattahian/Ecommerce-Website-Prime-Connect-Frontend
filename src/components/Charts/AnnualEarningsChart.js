import React, { useEffect, useState } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import Message from "../Message";
import { useNavigate } from "react-router-dom";

const AnnualEarningsChart = () => {
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
        "/products/get-annual-earnings-by-months",
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
          baseURL: baseURL,
        }
      );

      setEarnings({
        labels: data.map((item) => item.dateCreated.substring(5, 7)),
        datasets: [
          {
            label: "Total Earnings This Year",
            data: data.map((item) => item.totalEarnings),
            backgroundColor: [
              "#e60049",
              "#0bb4ff",
              "#50e991",
              "#e6d800",
              "#9b19f5",
              "#ffa300",
              "#dc0ab4",
              "#b3d4ff",
              "#00bfa0",
            ],
            borderColor: "#ccc",
            borderWidth: 1,
          },
        ],
      });
    } catch (e) {
      setError(
        "There was a problem loading the annual earnings chart, Make sure you have a stable internet connection"
      );
    }
  };

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if (userInfo.isAdmin) fetchData();
  }, []);
  return (
    <div className="chart">
      {earnings && <Bar data={earnings} />}
      {error && <Message variant="danger">{error}</Message>}
    </div>
  );
};

export default AnnualEarningsChart;
