import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DAILY_POINT } from "../type";

const initialState: DAILY_POINT[] = [
  {
    date: "",
    y2: 0,
    y5: 0,
    y10: 0,
    y30: 0,
  },
];

const dataSlice = createSlice({
  name: "data_body",
  initialState,
  reducers: {
    setDataState: (state, action: PayloadAction<DAILY_POINT[]>) => {
      return action.payload;
    },
    setClearDataState: () => {
      return initialState;
    },
  },
});
export const { setDataState, setClearDataState } = dataSlice.actions;
export default dataSlice.reducer;
