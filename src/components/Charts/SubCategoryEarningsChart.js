import React, { useEffect, useState } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import Message from "../Message";
import { useNavigate } from "react-router-dom";
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const SubCategoryEarningsChart = () => {
  const [earnings, setEarnings] = useState(null);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = userInfo.token;
    try {
      const { data } = await axios.get(
        "/products/get-total-earnings-by-subCategory",
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
            type: "line",
            label: "Total Earnings by Sub Category",
            borderColor: "#3e3e3e",
            pointBackgroundColor: "#fff",
            pointBorderColor: "#466964",
            borderWidth: 2,
            fill: false,
            data: Object.values(data).map((item) => item.totalEarnings),
          },
          {
            type: "bar",
            label: "Number of Orders by Sub Category",
            backgroundColor: "rgb(75, 192, 192)",
            data: Object.values(data).map((item) => item.count),
            borderColor: "white",
            borderWidth: 2,
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
      {earnings && <Chart type="bar" data={earnings} />}
      {error && <Message variant="danger" />}
    </div>
  );
};

export default SubCategoryEarningsChart;
