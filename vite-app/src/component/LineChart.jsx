import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Utility functions (similar to Utils in the example)
const Utils = {
  numbers: ({ count, min, max }) =>
    Array.from(
      { length: count },
      () => Math.floor(Math.random() * (max - min + 1)) + min
    ),
  x_pts: ({ count }) => Array.from({ length: count }, (_, i) => `${i + 1}`),
  namedColor: (index) =>
    ["255, 99, 132", "8, 101, 141", "119, 141, 8", "141, 8, 97", "31, 221, 242", "201, 31, 31"][index % 6],
  transparentize: (color, opacity) => `rgba(${color}, ${opacity})`,
};

// Initial setup
const initialLabels = Utils.x_pts({ count: 7 });
const initialData = {
  labels: initialLabels,
  datasets: [
    {
      label: "Dataset 1",
      data: Utils.numbers({ count: 7, min: -100, max: 100 }),
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    },
    {
      label: "Dataset 2",
      data: Utils.numbers({ count: 7, min: -100, max: 100 }),
      borderColor: "rgba(54, 162, 235, 1)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
    },
  ],
};

const LineChart = ({ result, plotVar }) => {
  const [chartData, setChartData] = useState(initialData);
  const [title, setTitle] = useState("Graph Tab");

  useEffect(() => {
    console.log(">>>", result, plotVar);
    const generateArray = (n) => Array.from({ length: n }, (_, i) => i + 1);
    if (plotVar?.value === "artists") {
      const newDataset = {
        label: `Popularity`, // Custom dataset label
        data: result.map((item) => ({
          y: item.ar_popularity,
          x: item.p_name,
          info: "",
        })),
        borderColor: "rgba(255, 99, 132, 1)", // Color for line
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Color for points
      };

      setChartData({
        labels: result.map((item) => item.p_name),
        datasets: [newDataset],
      });
      setTitle(plotVar?.label);

      console.log(newDataset);
    } else if (plotVar?.value === "songs") {
      const newDatasets = Object.entries(result).map(([artistName, data], index) => {
        return {
          label: artistName, // Custom label for each dataset
          data: data.map((item, idx) => ({
            x: idx, // Song's released date (or index if date is unavailable)
            y: item.tr_popularity, // Popularity value
            info: "Song: " + item.tr_name + ", Popularity: ",
          })),
          borderColor: `rgba(${Utils.namedColor(index)}, 1)`, // Unique line color per artist
          backgroundColor: Utils.transparentize(Utils.namedColor(index), 0.2), // Transparentized point color
          showLine: true, // Don't connect data points with a line
        };
      });
    
      console.log(newDatasets);
      setChartData({
        datasets: newDatasets,
      });
      setTitle(plotVar?.label);
    }
     else if (plotVar?.value === "albums") {
      const allDates = new Set();

      // Collect all unique dates
      Object.values(result).forEach((data) => {
        data.forEach((item) => allDates.add(item.al_releasedate));
      });

      // Sort dates chronologically
      const sortedDates = Array.from(allDates).sort(
        (a, b) => new Date(a) - new Date(b)
      );

      const newDatasets = Object.entries(result).map(
        ([artistName, data], index) => {
          // Create a map for quick lookups
          const dateMap = new Map(
            data.map((item) => [item.al_releasedate, item.al_popularity])
          );
          const infoMap = new Map(
            data.map((item) => [item.al_releasedate, item.al_name])
          );
          // Align data with the sortedDates
          const alignedData = sortedDates.map((date) => ({
            x: date,
            y: dateMap.get(date) || null, // Use null for missing values,
            info: "Album: " + infoMap.get(date) + ", Popularity: " || null,
          }));

          return {
            label: artistName, // Custom dataset label
            data: alignedData, // Aligned {x, y} data points
            borderColor: `rgba(${Utils.namedColor(index)}, 1)`, // Line color
            backgroundColor: Utils.transparentize(Utils.namedColor(index), 0.2), // Point color
            showLine: false, // Connect points with a line
          };
        }
      );

      console.log(JSON.stringify(newDatasets, null, 2));

      setChartData({
        datasets: newDatasets, // Updated datasets
      });

      setTitle(plotVar?.label);
    }
  }, [result]);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: title },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            // Access custom data from the point
            const datasetLabel = tooltipItem.dataset.label || "";
            const xValue = tooltipItem.raw.x; // Tooltip raw x value (date)
            const yValue = tooltipItem.raw.y; // Tooltip raw y value (popularity)
            const weight = tooltipItem.raw.info; // Custom weight attribute

            // Return a custom string with all attributes
            return `${datasetLabel} (${weight}${yValue})`;
          },
        },
      },
    },
    scales: {
      x: {
        type: title === "Songs"
        ? "linear"
        : "category", // Conditional scale type
        position: 'bottom',
        ticks: {
          stepSize: title === "Songs" ? 1 : undefined, // Use stepSize only for numerical scales
        },
      }
    },
  };

  return (
    <div className="linechart">
      <div>
        <h3>Graph Tab</h3>
      </div>

      {title !== "Graph Tab" && <Line data={chartData} options={options} />}
    </div>
  );
};

export default LineChart;
