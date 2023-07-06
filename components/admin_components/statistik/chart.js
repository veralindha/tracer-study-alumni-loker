import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/countloker');
      const result = await response.json();
      const modifiedData = result.data.lokerCounts.map((item) => {
        const mitraName = item.name || 'Mitra Baru';
        return {
          mitraId: item.mitraId,
          name: mitraName,
          count: item.count,
        };
      });
      setData(modifiedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" name="Jumlah Loker" />
    </BarChart>
  );
};

export default Chart;
