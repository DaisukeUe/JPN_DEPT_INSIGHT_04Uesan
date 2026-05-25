import React, { useEffect, useState } from "react";
import axios from "axios";
import { FavoriteModal } from "./components/FavoriteModal";
import { ShowFavoriteChange } from "./components/ShowFavoriteChange";
import { setDeptInfo } from "./slices/deptSlice";
import { setDataState } from "./slices/dataSlice";
import { useAppSelector, useAddDispatch } from "./store";
import type {
  DAILY_POINT,
  SHOWDE_SAVE,
  DEPT,
  FAVORITE,
  FAVORITE_DEPT,
} from "./type";
import { store } from "./store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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
  const [favoriteData, setFavoriteData] = useState<FAVORITE | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [mainFavorite, setMainFavorite] = useState("");

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
  const handleShowModal = () => {
    setShowModal(!showModal);
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

  const handleFavoriteSaveMain = () => {
    const idx = user[0] as any;
    console.log("idx", idx);
    axios
      .post(`${import.meta.env.VITE_API_URL}/deptvalue`, {
        formData: {
          user_foreign_id: idx.user_id,
          favorite: mainFavorite,
          kinds: formData["kinds"],
          sspan: formData["sspan"],
          fspan: formData["fspan"],
          showmode: formData["showmode"],
        },
      })
      .then(() => {
        return axios.get<SHOWDE_SAVE[]>(
          `${import.meta.env.VITE_API_URL}/deptvalue`,
          {
            params: {
              user_id: idx.user_id,
            },
          },
        );
      })
      .then((res) => {
        dispatch(setDeptInfo(res.data));
      })
      .catch(console.error);
    console.log(dept);
  };
  const handleFavoriteNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setMainFavorite(newValue);
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

  // useEffect(() => {
  //   console.log(user);
  //   axios
  //     .get<USER[]>(`${import.meta.env.VITE_API_URL}/users`, {
  //       params: {
  //         user_id: (user[0] as any).user_id,
  //       },
  //     })
  //     .then((res) => {
  //       dispatch(setUser(res.data));
  //       console.log(res.data);
  //       console.log(user);
  //       console.log(import.meta.env.VITE_APT_URL);
  //     });
  // }, []);

  useEffect(() => {
    const idx = user[0] as any;
    if (idx.user_name === "") return;
    console.log(idx.user_id);
    axios
      .get<SHOWDE_SAVE[]>(`${import.meta.env.VITE_API_URL}/deptvalue`, {
        params: {
          user_id: idx.user_id,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(dept);
        dispatch(setDeptInfo(res.data));
        setFavoriteData(res.data[0].show_save);
      });
  }, [dispatch, user]);

  useEffect(() => {
    console.log(dept);
    const showSave = dept[0] as any;
    if (showSave?.kinds === "") return;
    console.log(
      showSave.kinds,
      showSave.sspan,
      showSave.kinds,
      showSave.showmode,
    );
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
        dispatch(setDataState(res.data));
        console.log(res.data, dept[0]);
      })
      .catch(console.error);
  }, [dept]);
  const get = store.getState();
  console.log(get);
  const getKindName = (kinds: string) => {
    switch (kinds) {
      case "2yjpy.b":
        return "２年国債";
      case "5yjpy.b":
        return "5年国債";
      case "10yjpy.b":
        return "10年国債";
      case "30yjpy.b":
        return "30年国債";
      default:
        return "国債　金利";
    }
  };
  return (
    <div
      style={{
        padding: 16,
        display: "flex",
        gap: 24,
        alignItems: "flex-start",
      }}
    >
      <div style={{ flex: 1, minWidth: 0, marginTop: 32 }}>
        <h2>
          日本国債 日次金利ダッシュボード：
          {getKindName((data_body[0] as any)?.kinds)}
        </h2>
        <ResponsiveContainer width="100%" height={600}>
          <LineChart
            data={data_body}
            margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickLine={true}
              axisLine={true}
              dy={10}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickLine={true}
              axisLine={true}
              dx={-10}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "none",
                borderRadius: "8px",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                fontSize: "14px",
                color: "#1F2937",
              }}
            />

            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "14px", fontWeight: 500 }}
            />

            <Line
              type="monotone"
              dataKey="selected"
              stroke="#3B82F6" // スタイリッシュなブルー（Tailwindのblue-500）に変更
              strokeWidth={2} // 線を少し太くして見やすく
              name={getKindName((data_body[0] as any)?.kinds)}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: "#3B82F6" }} // ホバーしたときの点を強調
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ flex: 1 }}>
        お気に入りの名前：
        <input type="text" onChange={handleFavoriteNameChange} />
        <button onClick={handleFavoriteSaveMain}>登録</button>
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
              {Array.from({ length: 31 - 1 + 1 }, (_, i) => 1 + i).map(
                (day) => (
                  <option key={day} value={day}>
                    {day}日
                  </option>
                ),
              )}
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
          <ShowFavoriteChange />
        </div>
        <div>
          <button onClick={handleShowModal}>お気に入り登録</button>
          {showModal && <FavoriteModal />}
        </div>
        <div>{(data_body[data_body.length - 1] as any)?.selected}</div>
        <p>ログイン者：{(user[0] as any).user_name}</p>
      </div>
    </div>
  );
}
export default App;
