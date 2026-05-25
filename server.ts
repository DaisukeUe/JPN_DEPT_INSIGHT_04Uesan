import cors from "cors";
import axios from "axios";
import csv from "csvtojson";
import path from "path";
import express, { Request, Response } from "express";
import { viewsFunction } from "./view/views";
import type { DAILY_ROW } from "./type_backend";

const PORT = 3000;
const app = express();
const {
  usersView,
  deptValue,
  upDateDeptValue,
  loginUser,
  signUpUser,
  deleteFavorite,
} = viewsFunction();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});

async function fetchDaily(
  sSpan: number,
  fSpan: Number,
  kinds: string,
  showMode: string,
): Promise<DAILY_ROW[]> {
  const url = `https://stooq.com/q/d/l/?s=${kinds}&f=${sSpan}&t=${fSpan}&i=${showMode}&apikey=udu8gyS2pTVcXsD9U1ONl3jtFJbvahfC`;
  const res = await axios.get(url);
  const json = await csv().fromString(res.data);
  return json;
}
app.get("/jgb-daily", async (req: Request, res: Response) => {
  const kinds = req.query["formData[kinds]"] as string;
  const sspanStr = req.query["formData[sspan]"] as string;
  const fspanStr = req.query["formData[fspan]"] as string;
  const showmode = req.query["formData[showmode]"] as string;

  const sspanNum = Number(sspanStr || 0);
  const fspanNum = Number(fspanStr || 0);

  try {
    const selected = await fetchDaily(sspanNum, fspanNum, kinds, showmode);
    const map: Record<string, any> = {};
    for (const row of selected) {
      map[row.Date] = {
        date: row.Date,
        selected: parseFloat(row.Close),
        kinds: kinds,
      };
    }
    const data = Object.values(map).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "値を取得できませんでした。" });
  }
});

app.get("/users", usersView);
app.get("/deptvalue", deptValue);
app.post("/deptvalue", upDateDeptValue);
app.post("/userlogin", loginUser);
app.post("/signup", signUpUser);
app.delete("/delete", deleteFavorite);
