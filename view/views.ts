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
    } catch (err) {}
    res.status(200);
    res.json(result);
  };
  const deptValue = async (req: Request, res: Response) => {
    let result: SHOWDE_SAVE[] = [];
    try {
      result = await db(DEPT_TABLE);
      console.log("dept", result);
    } catch (err) {}
    res.status(200);
    res.json(result);
  };

  return {
    usersView,
    deptValue,
  };
};
