// import cors from "cors";
// import axios from "axios";
// import csv from "csvtojson";
// import path from "path";
// import express, { Request, Response } from "express";
// import { viewsFunction } from "./view/views";
// import type { DAILY_ROW } from "./type_backend";

// const PORT = 3000;
// const app = express();
// const { usersView, deptValue } = viewsFunction();

// app.use(express.static(path.join(__dirname, "/public")));
// app.listen(PORT, () => {
//   console.log(`server running on PORT ${PORT}`);
// });
// app.use(cors());

// async function fetchDaily(
//   sSpan: number,
//   fSpan: Number,
//   kinds: string,
//   showMode: string,
// ): Promise<DAILY_ROW[]> {
//   const url = `https://stooq.com/q/d/?f=${sSpan}&t=${fSpan}&s=${kinds}&c=0&i=${showMode}&apikey=udu8gyS2pTVcXsD9U1ONl3jtFJbvahfC`;
//   const res = await axios.get(url);
//   const json = await csv().fromString(res.data);
//   console.log("URLLLLLL", json);
//   return json;
// }
// // `https://stooq.com/q/d/?f=20220810&t=20230810&s=2yjpy.b&c=0&i=d&apikey=udu8gyS2pTVcXsD9U1ONl3jtFJbvahfC`
// app.get("/jgb-daily", async (req: Request, res: Response) => {
//   const kinds = req.query["formData[kinds]"] as string;
//   const sspanStr = req.query["formData[sspan]"] as string;
//   const fspanStr = req.query["formData[fspan]"] as string;
//   const showmode = req.query["formData[showmode]"] as string;

//   // これで NaN にならず、正しく数値に変換されます
//   const sspanNum = Number(sspanStr || 0); // 20241212
//   const fspanNum = Number(fspanStr || 0); // 20251212

//   try {
//     const selected = await fetchDaily(sspanNum, fspanNum, kinds, showmode);
//     // fetchDaily("5yjpy.b"),
//     // fetchDaily("10yjpy.b"),
//     // fetchDaily("30yjpy.b"),

//     console.log(req.query);
//     console.log(sspanNum, fspanNum);
//     console.log(selected);

//     const map: Record<string, any> = {};
//     for (const row of selected) {
//       map[row.Date] = { date: row.Date, selekted: parseFloat(row.Close) }; //終わり値
//     }
//     // for (const row of y10) {
//     //   if (!map[row.Date]) map[row.Date] = { date: row.Date };
//     //   map[row.Date].y10 = parseFloat(row.Close);
//     // }
//     // for (const row of y5) {
//     //   if (!map[row.Date]) map[row.Date] = { date: row.Date };
//     //   map[row.Date].y5 = parseFloat(row.Close);
//     // }
//     // for (const row of y2) {
//     //   if (!map[row.Date]) map[row.Date] = { date: row.Date };
//     //   map[row.Date].y2 = parseFloat(row.Close);
//     // }
//     const data = Object.values(map).sort(
//       (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
//     );
//     res.json(data);
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "値を取得できませんでした。" });
//   }
// });

// app.get("/users", usersView);
// app.get("/deptvalue", deptValue);

// import cors from "cors";
// import axios from "axios";
// import csv from "csvtojson";
// import path from "path";
// import express, { Request, Response } from "express";
// import { viewsFunction } from "./view/views";
// import type { DAILY_ROW } from "./type_backend";

// const PORT = 3000;
// const app = express();
// const { usersView, deptValue } = viewsFunction();

// app.use(express.static(path.join(__dirname, "/public")));
// app.listen(PORT, () => {
//   console.log(`server running on PORT ${PORT}`);
// });
// app.use(cors());

// async function fetchDaily(kinds: string): Promise<DAILY_ROW[]> {
//   const url = `https://stooq.com/q/d/l/?s=${kinds}&i=d&apikey=udu8gyS2pTVcXsD9U1ONl3jtFJbvahfC`;
//   // https://stooq.com/q/d/?f=20231128&t=20260522&s=10yjpy.b&c=0
//   // https://stooq.com/q/d/?f=${sSpan}&t=${fSpan}&s=${kinds}.b&c=0&i=${showMode}　app.getでqueryparamsをゲットする
//   //　　　　　　　　　　　　　｜日付範囲ーーーーーーーーー　　　　　　　　　｜表示date切り替え
//   const res = await axios.get(url);
//   const json = await csv().fromString(res.data);
//   console.log("RRRRR", res.data);
//   return json;
// }
// app.get("/jgb-daily", async (req: Request, res: Response) => {
//   try {
//     const [y2, y5, y10, y30] = await Promise.all([
//       fetchDaily("2yjpy.b"),
//       fetchDaily("5yjpy.b"),
//       fetchDaily("10yjpy.b"),
//       fetchDaily("30yjpy.b"),
//     ]);
//     console.log(req);

//     const map: Record<string, any> = {};
//     for (const row of y30) {
//       map[row.Date] = { date: row.Date, y30: parseFloat(row.Close) }; //終わり値
//     }
//     for (const row of y10) {
//       if (!map[row.Date]) map[row.Date] = { date: row.Date };
//       map[row.Date].y10 = parseFloat(row.Close);
//     }
//     for (const row of y5) {
//       if (!map[row.Date]) map[row.Date] = { date: row.Date };
//       map[row.Date].y5 = parseFloat(row.Close);
//     }
//     for (const row of y2) {
//       if (!map[row.Date]) map[row.Date] = { date: row.Date };
//       map[row.Date].y2 = parseFloat(row.Close);
//     }
//     const data = Object.values(map).sort(
//       (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
//     );
//     res.json(data);
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "値を取得できませんでした。" });
//   }
// });

// app.get("/users", usersView);
// app.get("/deptvalue", deptValue);
