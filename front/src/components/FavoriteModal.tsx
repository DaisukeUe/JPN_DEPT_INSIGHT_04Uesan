import React, { useEffect, useState } from "react";
import axios from "axios";
import { setDeptInfo } from "../slices/deptSlice";
import { useAppSelector, useAddDispatch } from "../store";
import type { SHOWDE_SAVE, FAVORITE_DEPT } from "../type";
import "./favoriteModal.css";

export const FavoriteModal = () => {
  const { user, dept } = useAppSelector((state) => state);
  const dispatch = useAddDispatch();
  const [deptYear, setDeptYear] = useState("");
  const [deptMonth, setDeptMonth] = useState("");
  const [deptDay, setDeptDay] = useState("");
  const [fdeptYear, fsetDeptYear] = useState("");
  const [fdeptMonth, fsetDeptMonth] = useState("");
  const [fdeptDay, fsetDeptDay] = useState("");

  const handleSelectYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setDeptYear(newValue);
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
  const handleFavoriteNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      favorite: newValue,
    }));
  };
  // ###########################
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const now = `${year}${month}${day}`;
  //############################
  const [formData, setFormData] = useState<FAVORITE_DEPT>({
    user_foreign_id: (user[0] as any).user_id,
    favorite: "サンプル１",
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

  const handleFavoriteSaveButton = () => {
    if (Number(formData["sspan"]) - Number(formData["fspan"]) >= 0) {
      alert("開始日が終了日の後になっています");
      return;
    }
    const judge = window.confirm("お気に入りを登録しますか？");
    if (!judge) return;
    const idx = user[0] as any;
    axios
      .post(`${import.meta.env.VITE_API_URL}/deptvalue`, {
        formData: formData,
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
          alert("お気に入り登録を完了しました。");
        }
      })
      .catch(console.error);
    console.log(dept);
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

  return (
    <div className="settings-panel">
      {/* お気に入りの名前入力 */}
      <div className="form-group">
        <label className="form-label">お気に入りの名前</label>
        <input
          type="text"
          className="form-input-text"
          placeholder="例: 10年国債_2024"
          onChange={handleFavoriteNameChange}
        />
      </div>

      {/* 種類選択 */}
      <div className="form-group">
        <label className="form-label">種類</label>
        <div className="select-wrapper">
          <select
            className="form-select"
            onChange={handleKindChange}
            defaultValue={""}
          >
            <option value={""}>選択してください</option>
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

      {/* 開始日のトリオ */}
      <div className="form-group">
        <label className="form-label">開始日</label>
        <div className="date-select-grid">
          <select
            className="form-select"
            onChange={handleSelectYear}
            defaultValue={""}
          >
            <option value={""}>年</option>
            {Array.from({ length: 2026 - 2020 + 1 }, (_, i) => 2020 + i).map(
              (year) => (
                <option key={year} value={year}>
                  {year}年
                </option>
              ),
            )}
          </select>
          <select
            className="form-select"
            onChange={handleSelectMonth}
            defaultValue={""}
          >
            <option value={""}>月</option>
            {Array.from({ length: 12 }, (_, i) => 1 + i).map((month) => (
              <option key={month} value={month}>
                {month}月
              </option>
            ))}
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

      {/* 終了日のトリオ */}
      <div className="form-group">
        <label className="form-label">終了日</label>
        <div className="date-select-grid">
          <select
            className="form-select"
            onChange={handleSelectFyear}
            defaultValue={""}
          >
            <option value={""}>年</option>
            {Array.from({ length: 2026 - 2020 + 1 }, (_, i) => 2020 + i).map(
              (year) => (
                <option key={year} value={year}>
                  {year}年
                </option>
              ),
            )}
          </select>
          <select
            className="form-select"
            onChange={handleSelecFmonth}
            defaultValue={""}
          >
            <option value={""}>月</option>
            {Array.from({ length: 12 }, (_, i) => 1 + i).map((month) => (
              <option key={month} value={month}>
                {month}月
              </option>
            ))}
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

      {/* ラジオボタンエリア */}
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

      {/* 登録ボタン */}
      <button className="btn-submit" onClick={handleFavoriteSaveButton}>
        お気に入りに登録する
      </button>
    </div>
  );
};
