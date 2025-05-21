import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/gaze-data")  // 중계 서버에서 Lambda 호출
        .then(res => res.json())
        .then(json => {
          try {
            setData(json.Items || []);
          } catch (err) {
            console.error("Error parsing data", err);
          }
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: data.map(d => d.ID),
    datasets: [
      {
        label: 'Age',
        data: data.map(d => d.Age),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h1>Gaze Dashboard</h1>
      <Bar data={chartData} />
    </div>
  );
}
