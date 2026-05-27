import type { SHOWDE_SAVE, USER } from "../front/src/type";
import { db } from "../knex";
import crypto from "crypto";
import { Response, Request } from "express";
import { DAILY_ROW } from "../type_backend";
import axios from "axios";
import csv from "csvtojson";
import { viewsRepository } from "./viewsRepository";

const USERS_TABLE = "users";
const DEPT_TABLE = "dept_value";
const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");
const now = `${year}${month}${day}`;
const { getUsers, fetchDaily, createUser, loginAuth, getDeptValue } =
  viewsRepository();

export const viewsFunction = () => {
  const graphData = async (req: Request, res: Response) => {
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
          sspanNum: sspanNum,
          fspanNum: fspanNum,
          showmode: showmode,
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
  };

  const usersView = async (req: Request, res: Response) => {
    let result: USER[] = [];
    try {
      result = await getUsers();
      res.status(200);
      res.json(result);
    } catch (err) {
      console.error("エラー", err);
      return res.status(500).json({ error: "user取得失敗" });
    }
  };
  const deptValue = async (req: Request, res: Response) => {
    let result: SHOWDE_SAVE[];
    console.log(req.query["user_id"]);
    try {
      const id = req.query["user_id"];
      console.log(id);
      result = await getDeptValue(Number(id));
      res.status(200);
      res.json(result);
    } catch (err) {
      console.error("エラー", err);
      return res.status(500).json({ error: "お気に入り取得失敗" });
    }
  };

  const upDateDeptValue = async (req: Request, res: Response) => {
    let result: any;
    console.log("RRRRR", result, "REQQQQ", req.body);
    try {
      result = req.body.formData;
      const compareData = await db(DEPT_TABLE).where(
        "user_foreign_id",
        result["user_foreign_id"],
      );
      console.log("コンオペデータ", compareData);
      if (!result) {
        return res.status(400).json({ error: "データが空です" });
      }
      const insertData = await db(DEPT_TABLE).insert(result, ["*"]);
      return res.status(200).json(insertData);
    } catch (err) {
      console.error("入力エラー", err);
      return res.status(500).json({ error: "保存失敗" });
    }
  };

  const loginUser = async (req: Request, res: Response) => {
    const id = req.body.user_id;
    const password = req.body.password;
    console.log(password);
    try {
      const userData = await loginAuth(id, password);
      console.log(userData);
      if (userData?.length !== 0) {
        res.status(200).json(userData);
      } else {
        res.status(203).json({ data: "パスワードが違います" });
      }
    } catch (err) {
      console.error("入力エラー", err);
      return res.status(500).json({ error: "ログイン失敗" });
    }
  };

  const signUpUser = async (req: Request, res: Response) => {
    const userName = req.body.user_name;
    const passWord = req.body.password;
    const solt = crypto.randomBytes(6).toString("hex");
    const soltPassword = `${solt}${passWord}`;
    const hash = crypto.createHash("sha256");
    const hashPassword = hash.update(soltPassword).digest("hex");
    console.log(hashPassword);
    if (userName === undefined) return;
    try {
      const upDateData = {
        user_name: userName,
        password: hashPassword,
        solt: solt,
      };
      const insertData = await createUser(upDateData);
      // const insertData = await db(USERS_TABLE).insert(upDateData, ["*"]);
      return res.status(200).json(insertData);
    } catch (err) {
      console.error("入力エラー", err);
      return res.status(500).json({ error: "登録失敗" });
    }
  };

  const deleteFavorite = async (req: Request, res: Response) => {
    const id = req.body.dept_id;
    try {
      const deleteData = await db(DEPT_TABLE).where("dept_id", id).del(["*"]);
      return res.status(200).json(deleteData);
    } catch (err) {
      console.error("削除エラー", err);
      return res.status(500).json({ error: "削除失敗" });
    }
  };

  return {
    graphData,
    usersView,
    deptValue,
    upDateDeptValue,
    loginUser,
    signUpUser,
    deleteFavorite,
  };
};
