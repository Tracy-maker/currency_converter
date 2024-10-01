import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchHistoricalRates } from "@/utils/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HistoricalChart = ({ currency, onClose }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHistoricalData = async () => {
      try {
        setLoading(true);
        const data = await fetchHistoricalRates(currency);
        console.log("Fetched historical data:", data);
        setHistoricalData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching historical data:", error);
        setLoading(false);
      }
    };

    getHistoricalData();
  }, [currency]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: historicalData?.map((item) => item.date) || [],
    datasets: [
      {
        label: `Exchange Rate for ${currency}`,
        data: historicalData?.map((item) => item.rate) || [],
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        pointRadius: 5,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 16,
          },
        },
      },
      title: {
        display: true,
        text: `Exchange Rate History for the Last 14 Days - ${currency}`,
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 14,
          },
          padding: 10,
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
          },
          padding: 10,
        },
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-3xl mb-6 text-center">
          Past 14 Days Exchange Rate for {currency}
        </h2>
        <div className="h-80 w-full">
          <Line data={chartData} options={chartOptions} />
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg text-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HistoricalChart;
