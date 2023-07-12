import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Chart = () => {
  const [data, setData] = useState([]);
  const [dataLamaran, setDataLamaran] = useState([]);
  const [mitraTerbanyak, setMitraTerbanyak] = useState("");

  function jumlahkanData(data) {
    var total = 0;

    for (var i = 0; i < data.length; i++) {
      total += data[i].count;
    }

    return total;
  }

  var hasilJumlah = jumlahkanData(data);

  const [counter, setCounter] = useState({ mitras: 0 });
  const handleCount = () => {
    fetch("/api/countloker", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCounter(data.data);
      })
      .catch((err) => {
        console.log("Error: ", err.message);
      });
  };

  useEffect(() => {
    handleCount();
    fetchData();
    fetchLamaran();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/countloker");
      const result = await response.json();
      const modifiedData = result.data.lokerCounts.map((item) => {
        const mitraName = item.name || "Mitra Baru";
        return {
          mitraId: item.mitraId,
          name: mitraName,
          count: item.count,
        };
      });
      setData(modifiedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchLamaran = async () => {
    try {
      const response = await fetch("/api/countalumnis");
      const result = await response.json();
      const modifiedData = result.data.lamaranCounts.map((item) => {
        const mitraName = item.name || "Mitra Baru";
        return {
          mitraId: item.mitraId,
          name: mitraName,
          count: item.count,
        };
      });
      setDataLamaran(modifiedData);
      findMitraTerbanyak(modifiedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const findMitraTerbanyak = (chartData) => {
    let maxCount = 0;
    let mitraTerbanyak = "";
    chartData.forEach((item) => {
      if (item.count > maxCount) {
        maxCount = item.count;
        mitraTerbanyak = item.name;
      }
    });
    setMitraTerbanyak(mitraTerbanyak);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="row m-2">
          <div className="col-lg-6">
            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Jumlah Loker" />
            </BarChart>
          </div>
          <div className="col-lg-6">
            <ul style={{ listStyleType: "square" }}>
              <li style={{ fontSize: "20px" }}>
                Jumlah Mitra Masuk :{" "}
                <label className="text-success">{counter.mitras}</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="row m-2">
          <div className="col-lg-6">
            <BarChart width={500} height={300} data={dataLamaran}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Jumlah Lamaran" />
            </BarChart>
          </div>
          {/* <div className="col-lg-6">
            <ul style={{ listStyleType: "square" }}>
              <li style={{ fontSize: "20px" }}>
                Mitra yang paling banyak digunakan:{" "}
                <label className="text-success">{mitraTerbanyak}</label>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Chart;
