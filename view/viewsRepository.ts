import type { SHOWDE_SAVE, USER } from "../front/src/type";
import { db } from "../knex";
import crypto from "crypto";
import { DAILY_ROW } from "../type_backend";
import axios from "axios";
import csv from "csvtojson";
const USERS_TABLE = "users";
const DEPT_TABLE = "dept_value";
const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");
const now = `${year}${month}${day}`;
export const viewsRepository = () => {
  const getUsers = async (): Promise<USER[]> => {
    return await db(USERS_TABLE).select();
  };

  const createUser = async (upDateData: any): Promise<USER[]> => {
    return await db(USERS_TABLE).insert(upDateData, ["*"]);
  };

  const loginAuth = async (id: number, password: string): Promise<USER[]> => {
    const solt = await db(USERS_TABLE).select("solt").where("user_id", id);
    const soltPassword = `${solt[0].solt}${password}`;
    const dataBasePassword = await db(USERS_TABLE)
      .select("password")
      .where("user_id", id);
    const hash = crypto.createHash("sha256");
    const hashPassword = hash.update(soltPassword).digest("hex");
    if (`${dataBasePassword[0].password}` === `${hashPassword}`) {
      return await db(USERS_TABLE).where("user_id", id);
    }
    return [];
  };

  const getDeptValue = async (id: number): Promise<SHOWDE_SAVE[]> => {
    let result: SHOWDE_SAVE[] = [];
    result = await db(DEPT_TABLE).where("user_foreign_id", id);
    if (result.length <= 0) {
      (result as any).push({
        dept_id: null,
        favorite: "",
        kinds: "10yjpy.b",
        sspan: 20250101,
        fspan: Number(now),
        showmode: "d",
        user_foreign_id: null,
      });
      return result;
    }
    return result;
  };
  const dataUpdate = async (object: any): Promise<any> => {
    const result = await db(DEPT_TABLE).insert(object, ["*"]);
    return result;
  };

  const removeFavorite = async (id: number): Promise<any> => {
    const result = await db(DEPT_TABLE).where("dept_id", id).del(["*"]);
    return result;
  };

  const fetchDaily = async (
    sSpan: number,
    fSpan: Number,
    kinds: string,
    showMode: string,
  ): Promise<DAILY_ROW[]> => {
    const url = `https://stooq.com/q/d/l/?s=${kinds}&f=${sSpan}&t=${fSpan}&i=${showMode}&apikey=udu8gyS2pTVcXsD9U1ONl3jtFJbvahfC`;
    const res = await axios.get(url);
    const json = await csv().fromString(res.data);
    return json;
  };

  return {
    getUsers,
    fetchDaily,
    createUser,
    loginAuth,
    getDeptValue,
    dataUpdate,
    removeFavorite,
  };
};
