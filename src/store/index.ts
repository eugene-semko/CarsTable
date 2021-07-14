import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { dataSlice } from "./dataSlice";

const reducers = combineReducers({
  dataSlice: dataSlice.reducer,
});

export const store = configureStore({ reducer: reducers });
export type StateType = ReturnType<typeof reducers>;
