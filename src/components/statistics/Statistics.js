import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailData } from "../../redux/features/EmailSlice";
import BarChart from "../../utils/BarChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import "./statistics.css";
import Spinner from "react-bootstrap/Spinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emails.emails);
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let md = emails.map((el) => {
    return {
      month: months[el._id - 1],
      emailsPerMonth: el.epm,
    };
  });

  useEffect(() => {
    setChartData({
      labels: md.map((el) => el.month),
      datasets: [
        {
          label: "Emails sent per month",
          data: md.map((el) => el.emailsPerMonth),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Emails sent per month",
        },
      },
    });
  }, []);

  const [userData, setUserData] = useState({
    labels: md.map((el) => el.month),
    datasets: [
      {
        label: "Emails sent per month",
        data: md.map((el) => el.emailsPerMonth),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
        lineTension: 0.3,
      },
    ],
  });

  useEffect(() => {
    dispatch(emailData());
  }, [dispatch]);

  return (
    <div>
      <div className="container">
        <div className="stats-wrapper ">
          <h1 className="stats-heading">Your emails statistics</h1>
          <div className="stats-chart">
            {emails ? (
              <BarChart chartData={userData} />
            ) : (
              <Spinner animation="grow" variant="dark" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

// backgroundColor: [
//   "rgba(255, 99, 132, 0.2)",
//   "rgba(75, 192, 192, 0.2)",
//   "rgba(255, 159, 64, 0.2)",
//   "rgba(255, 205, 86, 0.2)",
//   "rgba(54, 162, 235, 0.2)",
//   "rgba(153, 102, 255, 0.2)",
//   "rgba(201, 203, 207, 0.2)",
// ],
