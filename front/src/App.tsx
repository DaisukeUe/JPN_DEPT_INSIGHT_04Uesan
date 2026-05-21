import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
type DailyPoint = {
  date: string;
  y2?: number;
  y5?: number;
  y10?: number;
};
function App() {
  const [data, setData] = useState<DailyPoint[]>([]);
  useEffect(() => {
    axios
      .get<DailyPoint[]>("http://localhost:3000/jgb-daily")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch(console.error);
  }, []);
  return (
    <div style={{ padding: 16 }}>
      <h2>日本国債 日次金利ダッシュボード（2Y / 5Y / 10Y）</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="y2"
            stroke="#8884D8"
            name="2年"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="y5"
            stroke="#82CA9D"
            name="5年"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="y10"
            stroke="#FF7300"
            name="10年"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export default App;
