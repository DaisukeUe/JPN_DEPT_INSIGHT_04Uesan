import React, { useEffect, useState } from "react";
import axios from "axios";
import { FavoriteModal } from "./components/FavoriteModal";
import { setUser } from "./slices/userSlice";
import { setDeptInfo } from "./slices/deptSlice";
import { setDataState } from "./slices/dataSlice";
import { useAppSelector, useAddDispatch } from "./store";
import type { DAILY_POINT, SHOWDE_SAVE, USER } from "./type";
import { store } from "./store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type DEPT = {
  kinds: string;
  sspan: number;
  fspan: number;
  showmode: string;
};

type Favorite = {
  dept_id: number | null;
  user_foreign_id: number | null;
  favorite: string;
  kinds: string;
  sspan: number;
  fspan: number;
  showmode: string;
};

function App() {
  const { user, dept, data_body } = useAppSelector((state) => state);
  const dispatch = useAddDispatch();
  const [data, setData] = useState<DAILY_POINT[]>([]);
  const [deptYear, setDeptYear] = useState("");
  const [deptMonth, setDeptMonth] = useState("");
  const [deptDay, setDeptDay] = useState("");
  const [fdeptYear, fsetDeptYear] = useState("");
  const [fdeptMonth, fsetDeptMonth] = useState("");
  const [fdeptDay, fsetDeptDay] = useState("");
  const [favoriteData, setFavoriteData] = useState<Favorite | null>(null);

  const handleSelectYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeptYear(e.target.value);
  };
  const handleSelectMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = String(e.target.value);
    setDeptMonth(newValue.padStart(2, "0"));
  };
  const handleSelectDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = String(e.target.value);
    setDeptDay(newValue.padStart(2, "0"));
  };

  const handleSelectFyear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fsetDeptYear(e.target.value);
  };
  const handleSelecFmonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = String(e.target.value);
    fsetDeptMonth(newValue.padStart(2, "0"));
  };
  const handleSelectFday = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = String(e.target.value);
    fsetDeptDay(newValue.padStart(2, "0"));
  };

  // ###########################
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const now = `${year}${month}${day}`;
  //############################
  const [formData, setFormData] = useState<DEPT>({
    kinds: "10yjpy.b",
    sspan: 20250101,
    fspan: Number(now),
    showmode: "d",
  });

  const KINDS = [
    { "２年": "2yjpy.b" },
    { "５年": "5yjpy.b" },
    { "１０年": "10yjpy.b" },
    { "３０年": "30yjpy.b" },
  ];
  const SHOWMODE = ["d", "w", "m", "y"];

  const handleKindChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      kinds: String(newValue),
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      showmode: String(newValue),
    }));
  };

  const handleShowButton = () => {
    axios
      .get<DAILY_POINT[]>(`${import.meta.env.VITE_API_URL}/jgb-daily`, {
        params: {
          formData: formData,
        },
      })
      .then((res) => {
        setData(res.data);
        dispatch(setDataState(res.data));
        console.log(res.data);
      })
      .catch(console.error);
    console.log(formData);
  };

  useEffect(() => {
    const newValue = `${deptYear}${deptMonth}${deptDay}`;
    setFormData((prevState) => ({
      ...prevState,
      sspan: Number(newValue),
    }));
  }, [deptYear, deptMonth, deptDay]);
  useEffect(() => {
    const newValue = `${fdeptYear}${fdeptMonth}${fdeptDay}`;
    setFormData((prevState) => ({
      ...prevState,
      fspan: Number(newValue),
    }));
  }, [fdeptDay, fdeptMonth, fdeptYear]);

  useEffect(() => {
    axios.get<USER[]>(`${import.meta.env.VITE_API_URL}/users`).then((res) => {
      dispatch(setUser(res.data));
      console.log(res.data);
      console.log(user);
      console.log(import.meta.env.VITE_APT_URL);
    });
  }, []);

  useEffect(() => {
    const idx = user[0] as any;
    if (idx.user_name === "") return;
    console.log(idx.user);
    axios
      .get<SHOWDE_SAVE[]>(`${import.meta.env.VITE_API_URL}/deptvalue`, {
        params: {
          user_id: idx.user_id,
        },
      })
      .then((res) => {
        dispatch(setDeptInfo(res.data));
        setFavoriteData(res.data[0].show_save);
        console.log(res.data);
        console.log(dept);
        console.log(import.meta.env.VITE_APT_URL);
      });
  }, [dispatch, user]);

  useEffect(() => {
    console.log(dept);
    const showSave = dept[0] as any;
    console.log(showSave.kinds, showSave.sspan);
    axios
      .get<DAILY_POINT[]>(`${import.meta.env.VITE_API_URL}/jgb-daily`, {
        params: {
          formData: {
            kinds: showSave.kinds,
            sspan: showSave.sspan,
            fspan: showSave.fspan,
            showmode: showSave.showmode,
          },
        },
      })
      .then((res) => {
        setData(res.data); //show用
        console.log(res.data, dept[0]);
      })
      .catch(console.error);
  }, [dept]);
  const get = store.getState();
  console.log(get);

  return (
    <div style={{ padding: 16 }}>
      <h2>
        日本国債 日次金利ダッシュボード：
        {formData.kinds === "2yjpy.b"
          ? "2年国債"
          : formData.kinds === "5yjpy.b"
            ? "5年国債"
            : formData.kinds === "10yjpy.b"
              ? "10年国債"
              : formData.kinds === "30yjpy.b"
                ? "30n年国債"
                : ""}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data_body}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="selected"
            stroke="#8884D8"
            name={
              formData.kinds === "2yjpy.b"
                ? "2年国債"
                : formData.kinds === "5yjpy.b"
                  ? "5年国債"
                  : formData.kinds === "10yjpy.b"
                    ? "10年国債"
                    : formData.kinds === "30yjpy.b"
                      ? "30n年国債"
                      : ""
            }
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <div>
        <div>
          種類:
          <select onChange={handleKindChange} defaultValue={""}>
            <option value={""}></option>
            {KINDS.map((kind) => {
              const [[label, value]] = Object.entries(kind);
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          開始年:
          <select onChange={handleSelectYear} defaultValue={""}>
            <option value={""}></option>
            {Array.from({ length: 2026 - 2020 + 1 }, (_, i) => 2020 + i).map(
              (year) => (
                <option key={year} value={year}>
                  {year}年
                </option>
              ),
            )}
          </select>
          開始月：
          <select onChange={handleSelectMonth} defaultValue={""}>
            <option value={""}></option>
            {Array.from({ length: 12 - 1 + 1 }, (_, i) => 1 + i).map(
              (month) => (
                <option key={month} value={month}>
                  {month}月
                </option>
              ),
            )}
          </select>
          開始日：
          <select onChange={handleSelectDay} defaultValue={""}>
            <option value={""}></option>
            {Array.from({ length: 31 - 1 + 1 }, (_, i) => 1 + i).map((day) => (
              <option key={day} value={day}>
                {day}日
              </option>
            ))}
          </select>
        </div>
        <div>
          終了年:
          <select onChange={handleSelectFyear} defaultValue={""}>
            <option value={""}></option>
            {Array.from({ length: 2026 - 2020 + 1 }, (_, i) => 2020 + i).map(
              (year) => (
                <option key={year} value={year}>
                  {year}年
                </option>
              ),
            )}
          </select>
          終了月：
          <select onChange={handleSelecFmonth} defaultValue={""}>
            <option value={""}></option>
            {Array.from({ length: 12 - 1 + 1 }, (_, i) => 1 + i).map(
              (month) => (
                <option key={month} value={month}>
                  {month}月
                </option>
              ),
            )}
          </select>
          終了日：
          <select onChange={handleSelectFday} defaultValue={""}>
            <option value={""}></option>
            {Array.from({ length: 31 - 1 + 1 }, (_, i) => 1 + i).map((day) => (
              <option key={day} value={day}>
                {day}日
              </option>
            ))}
          </select>
        </div>
        <div>
          {SHOWMODE.map((mode) => (
            <label>
              <input
                type="radio"
                name={mode}
                value={mode}
                checked={formData.showmode === mode}
                onChange={handleRadioChange}
              />
              {mode}
            </label>
          ))}
        </div>
      </div>
      <button onClick={handleShowButton}>リクエスト</button>
      <div>
        <FavoriteModal />
      </div>
    </div>
  );
}
export default App;
