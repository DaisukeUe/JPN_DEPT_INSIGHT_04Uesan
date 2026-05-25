import { useAddDispatch, useAppSelector } from "../store";
import axios from "axios";
import type { DAILY_POINT } from "../type";
import { setDataState } from "../slices/dataSlice";
import { useState } from "react";

export const ShowFavoriteChange = () => {
  const dispatch = useAddDispatch();
  const { data_body, dept, user } = useAppSelector((state) => state);
  const [getName, setGetName] = useState("");
  const handleFavoriteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      .catch(console.error);
  };

  const handleDeleteButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const getObject = dept.find((dep: any) => dep.favorite === getName);
    console.log(getName);
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
        console.log("削除成功", res.data);
      })
      .catch((error) => console.error("削除失敗", error));
  };

  return (
    <div>
      お気に入りからリクエスト
      <select defaultValue={""} onChange={handleFavoriteChange}>
        <option value={""}></option>
        {dept.map((dep: any, index: any) => (
          <option key={index} value={dep.favorite}>
            {" "}
            {`${dep.favorite}　${dep.kinds}　${dep.sspan}　${dep.fspan}　${dep.showmode}`}
          </option>
        ))}
      </select>
      <button onClick={handleDeleteButton}>お気に入りから削除</button>
    </div>
  );
};
