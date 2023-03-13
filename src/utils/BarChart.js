import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "./barChart.css";

const BarChart = ({ chartData }) => {
  return <Bar data={chartData} className="chartLine " />;
};

export default BarChart;
