import React from "react";
import { Bar } from "react-chartjs-2";
import "./barChart.css";

const BarChart = ({ chartData }) => {
  return <Bar data={chartData} className="chartLine" />;
};

export default BarChart;
