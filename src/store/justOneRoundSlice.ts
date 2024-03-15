import { createSlice } from "@reduxjs/toolkit";

export type JustOneRoundSlice = {
  hint: string;
  isGuessing: boolean;
  roundRemainingDuration: number;
  roundIsEnded: boolean;
};

const justOneRoundSlice = createSlice({
  name: "justOneRound",
  initialState: {
    hint: "",
    isGuessing: false,
    roundIsEnded: false,
  } as JustOneRoundSlice,
  reducers: {
    updateHint: (state, action) => {
      state.hint = action.payload;
    },
    updateIsGuessing: (state, action) => {
      state.isGuessing = action.payload;
    },
    updateRoundDuration: (state, action) => {
      state.roundRemainingDuration = action.payload;
      if (state.roundRemainingDuration <= 0) {
        state.roundIsEnded = true;
      }
    },
    resetRound: (state) => {
      state.hint = "";
      state.isGuessing = false;
      state.roundIsEnded = false;
    },
    initRound: (state, action) => {
      state.hint = "";
      state.isGuessing = false;
      state.roundIsEnded = false;
      state.roundRemainingDuration = action.payload.roundDuration;
    },
  },
  selectors: {
    getHint: (state): string => state.hint,
    getIsGuessing: (state): boolean => state.isGuessing,
    getRoundRemainingDuration: (state): number => state.roundRemainingDuration,
    getJustOneRound: (state): JustOneRoundSlice => state,
    isRoundEnded: (state): boolean => state.roundIsEnded,
  },
});

export const {
  initRound,
  updateRoundDuration,
  updateHint,
  resetRound,
  updateIsGuessing,
} = justOneRoundSlice.actions;
export const {
  getRoundRemainingDuration,
  isRoundEnded,
  getJustOneRound,
  getHint,
  getIsGuessing,
} = justOneRoundSlice.selectors;
export default justOneRoundSlice.reducer;
