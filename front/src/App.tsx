import React, {
  useEffect,
  useState,
  type ReactEventHandler,
  type ReactHTMLElement,
} from "react";
import axios from "axios";
import { setId, setUser } from "./slices/userSlice";
import { setDeptInfo } from "./slices/deptSlice";
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

function App() {
  const { user, dept } = useAppSelector((state) => state);
  const dispatch = useAddDispatch();
  const [data, setData] = useState<DAILY_POINT[]>([]);
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const now = `${year}${month}${day}`;

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

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      sspan: Number(newValue),
    }));
  };
  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      fspan: Number(newValue),
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
        console.log(res.data);
      })
      .catch(console.error);
    console.log(formData);
  };

  useEffect(() => {
    axios.get<USER[]>(`${import.meta.env.VITE_API_URL}/users`).then((res) => {
      dispatch(setUser(res.data));
      console.log(res.data);
      console.log(user);
      console.log(import.meta.env.VITE_APT_URL);
    });
  }, []);

  useEffect(() => {
    axios
      .get<SHOWDE_SAVE[]>(`${import.meta.env.VITE_API_URL}/deptvalue`)
      .then((res) => {
        dispatch(setDeptInfo(res.data));
        console.log(res.data);
        console.log(dept);
        console.log(import.meta.env.VITE_APT_URL);
      });
  }, [dispatch]);

  useEffect(() => {
    console.log(dept);
    // if (
    //   !dept ||
    //   dept.length === 0 ||
    //   !dept[0]?.show_save ||
    //   dept[0].show_save.kinds === undefined
    // ) {
    //   return;
    // }
    const showSave = dept[0] as any;
    const assetionData = showSave.showSave;
    console.log(showSave.kinds, showSave.sspan);
    axios
      .get<DAILY_POINT[]>(`${import.meta.env.VITE_API_URL}/jgb-daily`, {
        params: {
          formData: {
            kinds: "2yjpy.b",
            sspan: showSave.sspan,
            fspan: showSave.fspan,
            showmode: showSave.showmode,
          },
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data, dept[0]);
      })
      .catch(console.error);
  }, [dept]);
  const get = store.getState();
  console.log(get.dept[0]);

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
        <LineChart data={data}>
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
          {/* <Line
            type="monotone"
            dataKey="y5"
            stroke="#82CA9D"
            name="5年"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="y10"
            stroke="#FF7300"
            name="10年"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="y30"
            stroke="#ff0080"
            name="30年"
            dot={false}
          /> */}
        </LineChart>
      </ResponsiveContainer>
      <div>
        <div>
          種類:
          <select onChange={handleKindChange} defaultValue={""}>
            <option value={""}></option>
            {KINDS.map((kind, index) => {
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
          開始日:
          <input type="text" onChange={handleStartChange} />
        </div>
        <div>
          終了日:
          <input type="text" onChange={handleEndChange} />
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
    </div>
  );
}
export default App;
