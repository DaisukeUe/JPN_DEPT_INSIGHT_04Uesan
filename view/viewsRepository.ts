import type { SHOWDE_SAVE, USER } from "../front/src/type";
import { db } from "../knex";
import crypto from "crypto";
import { Response, Request } from "express";
import { DAILY_ROW } from "../type_backend";
import axios from "axios";
import csv from "csvtojson";
const USERS_TABLE = "users";
const DEPT_TABLE = "dept_value";
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
  };
};
