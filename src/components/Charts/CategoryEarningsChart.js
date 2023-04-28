import React, { useEffect, useState } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import Message from "../Message";
import { useNavigate } from "react-router-dom";

const CategoryEarningsChart = () => {
  const [earnings, setEarnings] = useState(null);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = userInfo.token;
    try {
      const { data } = await axios.get(
        "/products/get-total-earnings-by-category",
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
          baseURL: "http://localhost:8000/api",
        }
      );

      setEarnings({
        labels: Object.keys(data),
        datasets: [
          {
            label: "Total Earnings By Category",
            data: Object.values(data).map((item) => item.totalEarnings),
            backgroundColor: [
              "#54bebe",
              "#76c8c8",
              "#98d1d1",
              "#badbdb",
              "#dedad2",
              "#e4bcad",
              "#df979e",
              "#d7658b",
              "#c80064",
            ],
            borderColor: "#ccc",
            borderWidth: 1,
          },
        ],
      });
    } catch (e) {
      setError(
        "There was a problem loading the category earnings chart, Make sure you have a stable internet connection"
      );
    }
  };

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if (userInfo.isAdmin) fetchData();
  }, []);
  return (
    <div className="chart">
      {earnings && <Doughnut data={earnings} />}
      {error && <Message variant="danger">{error}</Message>}
    </div>
  );
};

export default CategoryEarningsChart;
