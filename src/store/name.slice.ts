import { createSlice } from "@reduxjs/toolkit";

export type NameState = {
  value: string;
};

const nameSlice = createSlice({
  name: "name",
  initialState: "",
  reducers: {
    updateName: (_state, action) => action.payload,
  },
  selectors: {
    getName: (state) => state,
  },
});

export const { updateName } = nameSlice.actions;
export const { getName } = nameSlice.selectors;
export default nameSlice.reducer;
