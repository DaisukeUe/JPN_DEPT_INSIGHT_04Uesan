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
  graphData,
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

app.get("/jgb-daily", graphData);
app.get("/users", usersView);
app.get("/deptvalue", deptValue);
app.post("/deptvalue", upDateDeptValue);
app.post("/userlogin", loginUser);
app.post("/signup", signUpUser);
app.delete("/delete", deleteFavorite);
