import cors from "cors";
import axios from "axios";
import csv from "csvtojson";
import path from "path";
import express, { Request, Response } from "express";

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "/public")));

// 正しい型定義（Request, Response）を適用
app.use("/api", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});

app.use(cors());
type DailyRow = {
  Date: string;
  Open: string;
  High: string;
  Low: string;
  Close: string;
  Volume: string;
};
async function fetchDaily(symbol: string): Promise<DailyRow[]> {
  const url = `https://stooq.com/q/d/l/?s=${symbol}&i=d&apikey=udu8gyS2pTVcXsD9U1ONl3jtFJbvahfC`;
  const res = await axios.get(url);
  const json = await csv().fromString(res.data);
  return json;
}
app.get("/jgb-daily", async (req: any, res: any) => {
  try {
    const [y2, y5, y10] = await Promise.all([
      fetchDaily("2yjpy.b"),
      fetchDaily("5yjpy.b"),
      fetchDaily("10yjpy.b"),
    ]);
    console.log(req);
    // 日付で揃えてマージ（単純に10Y基準で結合）
    const map: Record<string, any> = {};
    for (const row of y10) {
      map[row.Date] = { date: row.Date, y10: parseFloat(row.Close) };
    }
    for (const row of y5) {
      if (!map[row.Date]) map[row.Date] = { date: row.Date };
      map[row.Date].y5 = parseFloat(row.Close);
    }
    for (const row of y2) {
      if (!map[row.Date]) map[row.Date] = { date: row.Date };
      map[row.Date].y2 = parseFloat(row.Close);
    }
    const data = Object.values(map).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "failed to fetch" });
  }
});
