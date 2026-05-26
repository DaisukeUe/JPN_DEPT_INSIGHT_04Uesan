import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loginState: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.loginState = action.payload;
    },
  },
});

export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;
