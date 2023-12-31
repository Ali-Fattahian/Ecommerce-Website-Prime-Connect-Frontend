import React, { useEffect, useState } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, PolarArea } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import Message from "../Message";
import { useNavigate } from "react-router-dom";

const CountryEarningsChart = () => {
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
        "/products/get-total-earnings-by-country",
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
          baseURL: baseURL,
        }
      );

      setEarnings({
        labels: Object.keys(data),
        datasets: [
          {
            label: "Total Earnings from Countries",
            data: Object.values(data).map((item) => item.totalEarnings),
            backgroundColor: [
              "#fd7f6f",
              "#7eb0d5",
              "#b2e061",
              "#bd7ebe",
              "#ffb55a",
              "#ffee65",
              "#beb9db",
              "#fdcce5",
              "#8bd3c7",
            ],
            borderColor: "#ccc",
            borderWidth: 1,
          },
        ],
      });
    } catch (e) {
      setError(
        "There was a problem loading the country earnings chart, Make sure you have a stable internet connection"
      );
    }
  };

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if (userInfo.isAdmin) fetchData();
  }, []);
  return (
    <div className="chart">
      {earnings && <PolarArea data={earnings} />}
      {error && <Message variant="danger">{error}</Message>}
    </div>
  );
};

export default CountryEarningsChart;
