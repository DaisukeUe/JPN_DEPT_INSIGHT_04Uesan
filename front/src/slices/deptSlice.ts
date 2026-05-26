import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SHOWDE_SAVE } from "../type";

const initialState: SHOWDE_SAVE[] = [
  {
    show_save: {
      dept_id: null,
      user_foreign_id: null,
      favorite: "",
      kinds: "",
      sspan: 0,
      fspan: 0,
      showmode: "",
    },
  },
];

const deptSlice = createSlice({
  name: "dept",
  initialState,
  reducers: {
    setDeptInfo: (_, action: PayloadAction<SHOWDE_SAVE[]>) => {
      return action.payload;
    },
    setClearDept: () => {
      return initialState;
    },
  },
});

export const { setDeptInfo, setClearDept } = deptSlice.actions;
export default deptSlice.reducer;
