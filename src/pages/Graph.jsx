import React, { useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export const Graph = ({ income, expense }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ['Income', 'Expense'],
      datasets: [
        {
          data: [income, expense],
          backgroundColor: ['#36A2EB', '#FF6384'],
          hoverBackgroundColor: ['#36A2EB', '#FF6384'],
        },
      ],
    };

    const ctx = chartRef.current.getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'pie',
      data: data,
    });

    return () => {
      newChart.destroy();
    };
  }, [income, expense]); // Include income and expense as dependencies

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default Graph;
