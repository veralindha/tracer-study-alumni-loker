import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = () => {
  const [data, setData] = useState([]);
  const [dataLamaran, setDataLamaran] = useState([]);
  const [mitraTerbanyak, setMitraTerbanyak] = useState('');

  useEffect(() => {
    fetchData();
    fetchLamaran();
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

  const fetchLamaran = async () => {
    try {
      const response = await fetch('/api/countalumnis');
      const result = await response.json();
      const modifiedData = result.data.lamaranCounts.map((item) => {
        const mitraName = item.name || 'Mitra Baru';
        return {
          mitraId: item.mitraId,
          name: mitraName,
          count: item.count,
        };
      });
      setDataLamaran(modifiedData);
      findMitraTerbanyak(modifiedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const findMitraTerbanyak = (chartData) => {
    let maxCount = 0;
    let mitraTerbanyak = '';
    chartData.forEach((item) => {
      if (item.count > maxCount) {
        maxCount = item.count;
        mitraTerbanyak = item.name;
      }
    });
    setMitraTerbanyak(mitraTerbanyak);
  };

  return (
    <div>
      <div>
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Jumlah Loker" />
        </BarChart>
      </div>
      <div className='d-flex w-auto'>
        <div className='pr-3'>
        <BarChart width={500} height={300} data={dataLamaran}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Jumlah Lamaran" />
        </BarChart>
        </div>
        <div className='d-flex'>
          Mitra yang paling banyak diajukan: {mitraTerbanyak}
        </div>
      </div>
    </div>
  );
};

export default Chart;
