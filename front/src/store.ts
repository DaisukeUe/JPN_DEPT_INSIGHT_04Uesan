import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import deptRedeucer from "./slices/deptSlice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
export const store = configureStore({
  reducer: {
    user: userReducer,
    dept: deptRedeucer,
  },
});

export const useAddDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
