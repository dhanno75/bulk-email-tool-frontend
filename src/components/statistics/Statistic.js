import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailData } from "../../redux/features/EmailSlice";
import "./statistics.css";
import {
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Statistic = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emails.emails);
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

  let data = emails.map((el) => {
    return {
      month: months[el._id - 1],
      emailsPerMonth: el.epm,
    };
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
            <ResponsiveContainer width={950} height={500}>
              <AreaChart data={data}>
                <Area
                  type="monotone"
                  dataKey="emailsPerMonth"
                  stroke="#7872E8"
                  fill="#7872E8"
                  strokeWidth={1}
                  // strokeDasharray="3 4 5 2"
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
            {/* <ResponsiveContainer width={950} height={500}>
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey="emailsPerMonth"
                  // stroke="#2196F3"
                  stroke="#7872E8"
                  strokeWidth={3}
                  strokeDasharray="3 4 5 2"
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;

// backgroundColor: [
//   "rgba(255, 99, 132, 0.2)",
//   "rgba(75, 192, 192, 0.2)",
//   "rgba(255, 159, 64, 0.2)",
//   "rgba(255, 205, 86, 0.2)",
//   "rgba(54, 162, 235, 0.2)",
//   "rgba(153, 102, 255, 0.2)",
//   "rgba(201, 203, 207, 0.2)",
// ],
