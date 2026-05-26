import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import deptRedeucer from "./slices/deptSlice";
import dataRedeuser from "./slices/dataSlice";
import loginReducer from "./slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
export const store = configureStore({
  reducer: {
    user: userReducer,
    dept: deptRedeucer,
    data_body: dataRedeuser,
    login: loginReducer,
  },
});

export const useAddDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
