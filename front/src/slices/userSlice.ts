import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { USER } from "../type";

const initialState: USER[] = [
  {
    user: {
      user_id: null,
      user_name: "",
      password: "",
      solt: "",
    },
  },
];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<USER[]>) => {
      return action.payload;
    },
    setId: (state, action: PayloadAction<USER>) => {
      state[0] = action.payload;
    },
    setClearUser: (state) => {
      return initialState;
    },
  },
});
export const { setUser, setId, setClearUser } = userSlice.actions;
export default userSlice.reducer;
