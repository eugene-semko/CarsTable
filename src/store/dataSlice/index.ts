import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  data: { cars: any[]; tariffs_list: string[] };
  status: string;
};
const initialState: initialStateType = {
  data: {
    cars: [],
    tariffs_list: [],
  },
  status: "null",
};
export const getData = createAsyncThunk("dataSlice/getData", async () => {
  return fetch(`https://city-mobil.ru/api/cars`).then((res) => res.json());
});
export const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  extraReducers: {
    [getData.pending.toString()]: (state) => {
      state.status = "loading";
    },
    [getData.fulfilled.toString()]: (state, { payload }) => {
      state.data = payload;
      console.log(payload);
      state.status = "success";
    },
    [getData.rejected.toString()]: (state) => {
      state.status = "failed";
    },
  },
  reducers: {},
});
