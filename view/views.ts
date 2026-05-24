import type { SHOWDE_SAVE, USER } from "../front/src/type";
import { db } from "../knex";
import { Response, Request } from "express";
const USERS_TABLE = "users";
const DEPT_TABLE = "dept_value";

export const viewsFunction = () => {
  const usersView = async (req: Request, res: Response) => {
    let result: USER[] = [];
    try {
      result = await db(USERS_TABLE);
      // console.log(result);
      res.status(200);
      res.json(result);
    } catch (err) {
      console.error("エラー", err);
      return res.status(500).json({ error: "user取得失敗" });
    }
  };
  const deptValue = async (req: Request, res: Response) => {
    let result: SHOWDE_SAVE[] = [];
    console.log(req.query["user_id"]);
    try {
      const id = req.query["user_id"];
      result = await db(DEPT_TABLE).where("user_foreign_id", id);
      console.log("dept", result);
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

  return {
    usersView,
    deptValue,
    upDateDeptValue,
  };
};
