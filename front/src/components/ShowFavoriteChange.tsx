import { useAddDispatch, useAppSelector } from "../store";
import axios from "axios";
import type { DAILY_POINT, SHOWDE_SAVE } from "../type";
import { setDataState } from "../slices/dataSlice";
import { setDeptInfo } from "../slices/deptSlice";
import { useState } from "react";
import "./showFavoriteChange.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const ShowFavoriteChange = () => {
  const dispatch = useAddDispatch();
  const { dept, user } = useAppSelector((state) => state);
  const [getName, setGetName] = useState("");

  const handleFavoriteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = user[0] as any;
    const getObject = dept.find((dep: any) => dep.favorite === e.target.value);
    setGetName(e.target.value);
    console.log(getObject);
    const show_save = getObject as any;
    axios
      .get<DAILY_POINT[]>(`${import.meta.env.VITE_API_URL}/jgb-daily`, {
        params: {
          formData: {
            kinds: show_save.kinds,
            sspan: show_save.sspan,
            fspan: show_save.fspan,
            showmode: show_save.showmode,
          },
        },
      })
      .then((res) => {
        dispatch(setDataState(res.data));
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
  };

  const handleDeleteButton = () => {
    const judge = window.confirm("選択中のお気に入りを削除しますか？");
    if (!judge) return;
    const getObject = dept.find((dep: any) => dep.favorite === getName);
    console.log(getName);
    const idx = user[0] as any;
    const show_save = getObject as any;
    if (!show_save) {
      console.error("削除対象が見つかりません。");
    }
    axios
      .delete(`${import.meta.env.VITE_API_URL}/delete`, {
        data: {
          dept_id: show_save.dept_id,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("選択中のお気に入りを削除しました。");
        }
        console.log("削除成功", res.data);
      })
      .then(() => {
        axios
          .get<SHOWDE_SAVE[]>(`${import.meta.env.VITE_API_URL}/deptvalue`, {
            params: {
              user_id: idx.user_id,
            },
          })
          .then((res) => {
            dispatch(setDeptInfo(res.data));
          });
      })
      .catch((error) => console.error("削除失敗", error));
  };

  return (
    <div className="favorite-panel">
      <label className="favorite-label">お気に入りからリクエスト</label>

      <div className="favorite-controls">
        {/* セレクトボックス */}
        <div className="select-container">
          <select
            defaultValue={""}
            onChange={handleFavoriteChange}
            className="favorite-select"
          >
            <option value={""}>お気に入りを選択...</option>
            {dept.map((dep: any, index: any) => {
              // 「2yjpy.b」などの無骨な識別子を綺麗にトリミングまたは表示を整える
              const cleanKind =
                dep.kinds?.replace(".b", "").toUpperCase() || "";

              return (
                <option key={index} value={dep.favorite}>
                  {/* 全角スペースを区切り文字「 | 」に変更して視認性をアップ */}
                  {`${dep.favorite} [${cleanKind} | ${dep.sspan}〜${dep.fspan} | ${dep.showmode}]`}
                </option>
              );
            })}
          </select>
        </div>

        {/* 削除ボタン */}
        <button
          onClick={handleDeleteButton}
          className="btn-delete"
          title="選択したお気に入りを削除"
        >
          <IconButton
            aria-label="delete"
            color="error"
            size="small"
            sx={{ p: 0 }}
          >
            <DeleteIcon sx={{ fontSize: 20 }} />
          </IconButton>
          削除
        </button>
      </div>
    </div>
  );
};
