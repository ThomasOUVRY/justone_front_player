import { createSlice } from "@reduxjs/toolkit";

export type JustOneRoundSlice = {
  currentRound: number;
};

const justOneRoundSlice = createSlice({
  name: "justOneGame",
  initialState: {
    currentRound: 1,
  } as JustOneRoundSlice,
  reducers: {
    updateCurrentRound: (state, action) => {
      state.currentRound = action.payload;
    },
  },
  selectors: {
    getCurrentRound: (state): number => state.currentRound,
  },
});

export const { updateCurrentRound } = justOneRoundSlice.actions;
export const { getCurrentRound } = justOneRoundSlice.selectors;
export default justOneRoundSlice.reducer;
