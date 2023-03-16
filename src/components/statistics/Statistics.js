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
            <ResponsiveContainer
              className="stats-cont"
              width="95%"
              height={500}
            >
              <AreaChart data={data}>
                <Area
                  type="monotone"
                  dataKey="emailsPerMonth"
                  stroke="#7872E8"
                  fill="#7872E8"
                  strokeWidth={1}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
