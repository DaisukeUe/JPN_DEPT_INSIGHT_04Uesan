import React, { useEffect, useState } from "react";
import axios from "axios";
import { FavoriteModal } from "./components/FavoriteModal";
import { ShowFavoriteChange } from "./components/ShowFavoriteChange";
import { setDeptInfo } from "./slices/deptSlice";
import { setDataState } from "./slices/dataSlice";
import { useAppSelector, useAddDispatch } from "./store";
import { Navber } from "./components/Navber";
import "./components/indicator.css";
import "./App.css";
import type { DAILY_POINT, SHOWDE_SAVE, DEPT, FAVORITE } from "./type";
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
import CircularProgress from "@mui/material/CircularProgress";

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
  const [mainFavorite, setMainFavorite] = useState("サンプル１");
  const [effectControl, setEffectControl] = useState(true);
  const [userEffectControl, setUserEffectControl] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(data, favoriteData, userEffectControl);
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
    fspan: parseInt(now),
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

  const handleShowButton = async () => {
    if (Number(formData["sspan"]) - Number(formData["fspan"]) >= 0) {
      alert("開始日が終了日の後になっています");
      return;
    }
    setIsLoading(true);
    try {
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
        });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      console.log(formData);
    }
  };

  const handleFavoriteSaveMain = () => {
    if (Number(formData["sspan"]) - Number(formData["fspan"]) >= 0) {
      alert("開始日が終了日の後になっています");
      return;
    }
    const judge = window.confirm("お気に入りを登録しますか？");
    if (!judge) return;
    const idx = user[0] as any;

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
        if (res.status === 200) {
          dispatch(setDeptInfo(res.data));
          alert("表示中のデータをお気に入り登録しました。");
        }
      })
      .catch(console.error);
    console.log(dept);
  };
  const handleFavoriteNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setMainFavorite(newValue);
  };
  useEffect(() => {
    let newValue = Number(`${deptYear}${deptMonth}${deptDay}`);
    if (newValue === 0 || newValue.toString().length < 8) {
      newValue = Number(20070101);
    }
    setFormData((prevState) => ({
      ...prevState,
      sspan: Number(newValue),
    }));
  }, [deptYear, deptMonth, deptDay]);

  useEffect(() => {
    let newValue = Number(`${fdeptYear}${fdeptMonth}${fdeptDay}`);
    if (newValue === 0 || newValue.toString().length < 8) {
      newValue = Number(now);
    }
    setFormData((prevState) => ({
      ...prevState,
      fspan: Number(newValue),
    }));
  }, [fdeptDay, fdeptMonth, fdeptYear]);

  useEffect(() => {
    const idx = user[0] as any;
    console.log("effectcontrol", effectControl);
    if (effectControl === false) return;
    if (idx.user_name === "") return;
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
        setUserEffectControl(false);
      });
  }, [dispatch]);

  useEffect(() => {
    console.log(dept);
    const showSave = dept[0] as any;
    console.log("effectcontrol", effectControl);
    if (effectControl === false) return;
    console.log("動きます");
    console.log(
      showSave.kinds,
      showSave.sspan,
      showSave.fspan,
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
        setData(res.data);
        setEffectControl(false);
        dispatch(setDataState(res.data));
      })
      .catch(console.error);
  }, [dept]);

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
    <div>
      <Navber />
      <div
        style={{
          marginLeft: 100,
          padding: 16,
          display: "flex",
          gap: 24,
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1, minWidth: 0, marginTop: 8 }}>
          <h2>
            日本国債 金利ダッシュボード：
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
                stroke="#3B82F6"
                strokeWidth={2}
                name={getKindName((data_body[0] as any)?.kinds)}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0, fill: "#3B82F6" }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="indicator-main">
            <div className="indicator-card">
              <div className="indicator-header">
                <span className="indicator-title">最新金利（選択範囲）</span>
                <span
                  className={`indicator-mode ${(data_body[data_body.length - 1] as any)?.showmode}`}
                >
                  {(data_body[data_body.length - 1] as any)?.showmode || "---"}
                </span>
              </div>

              <div className="indicator-value-wrap">
                <span className="indicator-value">
                  {typeof (data_body[data_body.length - 1] as any)?.selected ===
                  "number"
                    ? (data_body[data_body.length - 1] as any).selected.toFixed(
                        3,
                      )
                    : (data_body[data_body.length - 1] as any)?.selected ||
                      "0.000"}
                </span>
                <span className="indicator-unit">%</span>
              </div>
              <div className="indicator-footer">
                <div className="indicator-chip">
                  <span className="indicator-chip-label">FROM</span>
                  <span className="indicator-chip-value">
                    {(data_body[data_body.length - 1] as any)?.sspanNum ||
                      "---"}
                  </span>
                </div>
                <div className="indicator-chip-arow">→</div>
                <div className="indicator-chip">
                  <span className="indicator-chip-label">TO</span>
                  <span className="indicator-chip-value">
                    {(data_body[data_body.length - 1] as any)?.fspanNum ||
                      "---"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          {!showModal && (
            <div className="main-settings-panel">
              <div className="form-group">
                <label className="form-label">今の画面をお気に入り登録</label>
                <div className="favorite-input-group">
                  <input
                    type="text"
                    className="form-input-text"
                    placeholder="お気に入りの名前を入力"
                    onChange={handleFavoriteNameChange}
                  />
                  <button
                    className="btn-save-favorite"
                    onClick={handleFavoriteSaveMain}
                  >
                    登録
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">種類</label>
                <div className="select-wrapper">
                  <select
                    className="form-select"
                    onChange={handleKindChange}
                    defaultValue={""}
                  >
                    <option value={""}>国債の種類を選択...</option>
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
              </div>
              <div className="form-group">
                <label className="form-label">開始日</label>
                <div className="date-select-grid">
                  <select
                    className="form-select"
                    onChange={handleSelectYear}
                    defaultValue={""}
                  >
                    <option value={""}>年</option>
                    {Array.from(
                      { length: 2026 - 2020 + 1 },
                      (_, i) => 2020 + i,
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}年
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select"
                    onChange={handleSelectMonth}
                    defaultValue={""}
                  >
                    <option value={""}>月</option>
                    {Array.from({ length: 12 }, (_, i) => 1 + i).map(
                      (month) => (
                        <option key={month} value={month}>
                          {month}月
                        </option>
                      ),
                    )}
                  </select>
                  <select
                    className="form-select"
                    onChange={handleSelectDay}
                    defaultValue={""}
                  >
                    <option value={""}>日</option>
                    {Array.from({ length: 31 }, (_, i) => 1 + i).map((day) => (
                      <option key={day} value={day}>
                        {day}日
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">終了日</label>
                <div className="date-select-grid">
                  <select
                    className="form-select"
                    onChange={handleSelectFyear}
                    defaultValue={""}
                  >
                    <option value={""}>年</option>
                    {Array.from(
                      { length: 2026 - 2020 + 1 },
                      (_, i) => 2020 + i,
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}年
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select"
                    onChange={handleSelecFmonth}
                    defaultValue={""}
                  >
                    <option value={""}>月</option>
                    {Array.from({ length: 12 }, (_, i) => 1 + i).map(
                      (month) => (
                        <option key={month} value={month}>
                          {month}月
                        </option>
                      ),
                    )}
                  </select>
                  <select
                    className="form-select"
                    onChange={handleSelectFday}
                    defaultValue={""}
                  >
                    <option value={""}>日</option>
                    {Array.from({ length: 31 }, (_, i) => 1 + i).map((day) => (
                      <option key={day} value={day}>
                        {day}日
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">表示モード</label>
                <div className="radio-group">
                  {SHOWMODE.map((mode) => (
                    <label key={mode} className="radio-label">
                      <input
                        type="radio"
                        name={mode}
                        value={mode}
                        checked={formData.showmode === mode}
                        onChange={handleRadioChange}
                        className="form-radio"
                      />
                      <span className="radio-text">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="btn-request" onClick={handleShowButton}>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  "グラフを更新（リクエスト）"
                )}
              </button>
            </div>
          )}
          <div>
            <ShowFavoriteChange />
          </div>
          <div>
            <button className="btn-app" onClick={handleShowModal}>
              {!showModal ? `お気に入り登録モーダル表示` : `登録モーダル非表示`}
            </button>
            {showModal && <FavoriteModal />}
          </div>
          <div className="form-label-footer">
            <label>
              ＊未入力項目はデフォルト値が入ります（10年国債　20070101~現在　Daily）
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
