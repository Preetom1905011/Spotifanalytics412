import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

// Utility functions (similar to Utils in the example)
const Utils = {
  numbers: ({ count, min, max }) =>
    Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min),
  months: ({ count }) =>
    Array.from({ length: count }, (_, i) => `Month ${i + 1}`),
  namedColor: (index) => ['red', 'blue', 'green', 'purple', 'orange'][index % 5],
  transparentize: (color, opacity) => `rgba(${color}, ${opacity})`,
};

// Initial setup
const initialLabels = Utils.months({ count: 7 });
const initialData = {
  labels: initialLabels,
  datasets: [
    {
      label: 'Dataset 1',
      data: Utils.numbers({ count: 7, min: -100, max: 100 }),
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      label: 'Dataset 2',
      data: Utils.numbers({ count: 7, min: -100, max: 100 }),
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
    },
  ],
};

const ChartComponent = () => {
  const [chartData, setChartData] = useState(initialData);

  // Actions
  const randomizeData = () => {
    const newDatasets = chartData.datasets.map((dataset) => ({
      ...dataset,
      data: Utils.numbers({ count: chartData.labels.length, min: -100, max: 100 }),
    }));
    setChartData({ ...chartData, datasets: newDatasets });
  };

  const addDataset = () => {
    const newDataset = {
      label: `Dataset ${chartData.datasets.length + 1}`,
      data: Utils.numbers({ count: chartData.labels.length, min: -100, max: 100 }),
      borderColor: Utils.namedColor(chartData.datasets.length),
      backgroundColor: Utils.transparentize(Utils.namedColor(chartData.datasets.length), 0.5),
    };
    setChartData({ ...chartData, datasets: [...chartData.datasets, newDataset] });
  };

  const addData = () => {
    const newLabels = [...chartData.labels, `Month ${chartData.labels.length + 1}`];
    const newDatasets = chartData.datasets.map((dataset) => ({
      ...dataset,
      data: [...dataset.data, Math.floor(Math.random() * 201) - 100],
    }));
    setChartData({ labels: newLabels, datasets: newDatasets });
  };

  const removeDataset = () => {
    const newDatasets = chartData.datasets.slice(0, -1);
    setChartData({ ...chartData, datasets: newDatasets });
  };

  const removeData = () => {
    const newLabels = chartData.labels.slice(0, -1);
    const newDatasets = chartData.datasets.map((dataset) => ({
      ...dataset,
      data: dataset.data.slice(0, -1),
    }));
    setChartData({ labels: newLabels, datasets: newDatasets });
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Chart.js Line Chart' },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
      <div>
        <button onClick={randomizeData}>Randomize</button>
        <button onClick={addDataset}>Add Dataset</button>
        <button onClick={addData}>Add Data</button>
        <button onClick={removeDataset}>Remove Dataset</button>
        <button onClick={removeData}>Remove Data</button>
      </div>
    </div>
  );
};

export default ChartComponent;
